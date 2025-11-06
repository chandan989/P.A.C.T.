// Smart Contracts Canister - ICP Smart Contract for Legal Contract Automation
// This canister manages smart legal contracts, signatures, and execution

import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import Int "mo:base/Int";

actor SmartContractsCanister {
  
  // Types
  public type ContractCondition = {
    id: Text;
    conditionType: Text; // "evidence_validation" | "payment" | "signature" | "timestamp" | "custom"
    evidenceId: ?Text;
    description: Text;
    met: Bool;
    timestamp: ?Time.Time;
  };

  public type Signature = {
    partyId: Text;
    signed: Bool;
    timestamp: ?Time.Time;
    biometricHash: ?Text;
  };

  public type SmartContract = {
    id: Text;
    name: Text;
    parties: [Text];
    conditions: [ContractCondition];
    status: Text; // "draft" | "pending_signatures" | "active" | "executed" | "disputed"
    createdAt: Time.Time;
    executedAt: ?Time.Time;
    signatures: [Signature];
  };

  public type DisputeEntry = {
    id: Text;
    timestamp: Time.Time;
    party: Text;
    reason: Text;
    evidenceRef: ?Text;
  };

  public type ContractExecution = {
    contractId: Text;
    triggeredBy: Text;
    conditionId: Text;
    evidenceId: ?Text;
    timestamp: Time.Time;
    result: Text; // "success" | "failure" | "pending"
  };

  public type SettlementToken = {
    contractId: Text;
    recipient: Text;
    amount: Nat;
    tokenAddress: ?Text; // Optional token contract address
    released: Bool;
    releasedAt: ?Time.Time;
    transactionHash: ?Text;
  };

  // Storage
  private stable var contractEntries: [(Text, SmartContract)] = [];
  private stable var disputeEntries: [(Text, [DisputeEntry])] = [];
  private stable var executionEntries: [(Text, [ContractExecution])] = [];
  private stable var settlementEntries: [(Text, [SettlementToken])] = [];

  private var contractMap = Map.HashMap<Text, SmartContract>(0, Text.equal, Text.hash);
  private var disputeMap = Map.HashMap<Text, [DisputeEntry]>(0, Text.equal, Text.hash);
  private var executionMap = Map.HashMap<Text, [ContractExecution]>(0, Text.equal, Text.hash);
  private var settlementMap = Map.HashMap<Text, [SettlementToken]>(0, Text.equal, Text.hash);

  // System functions
  system func preupgrade() {
    contractEntries := Iter.toArray(contractMap.entries());
    disputeEntries := Iter.toArray(disputeMap.entries());
    executionEntries := Iter.toArray(executionMap.entries());
    settlementEntries := Iter.toArray(settlementMap.entries());
  };

  system func postupgrade() {
    contractMap := Map.fromIter<Text, SmartContract>(
      contractEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    disputeMap := Map.fromIter<Text, [DisputeEntry]>(
      disputeEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    executionMap := Map.fromIter<Text, [ContractExecution]>(
      executionEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    settlementMap := Map.fromIter<Text, [SettlementToken]>(
      settlementEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    contractEntries := [];
    disputeEntries := [];
    executionEntries := [];
    settlementEntries := [];
  };

  // Create a new smart contract
  public shared(msg) func createContract(
    name: Text,
    parties: [Text],
    conditions: [{
      conditionType: Text;
      description: Text;
    }]
  ): async Text {
    let contractId = "CONTRACT-" # Principal.toText(msg.caller) # "-" # Int.toText(Time.now());

    let contractConditions: [ContractCondition] = Array.mapEntries<{
      conditionType: Text;
      description: Text;
    }, ContractCondition>(
      conditions,
      func(c, idx): ContractCondition {
        {
          id = "COND-" # Nat.toText(idx + 1);
          conditionType = c.conditionType;
          evidenceId = null;
          description = c.description;
          met = false;
          timestamp = null;
        }
      }
    );

    let signatures: [Signature] = Array.map<Text, Signature>(
      parties,
      func(partyId): Signature {
        {
          partyId = partyId;
          signed = false;
          timestamp = null;
          biometricHash = null;
        }
      }
    );

    let contract: SmartContract = {
      id = contractId;
      name = name;
      parties = parties;
      conditions = contractConditions;
      status = "draft";
      createdAt = Time.now();
      executedAt = null;
      signatures = signatures;
    };

    contractMap.put(contractId, contract);
    contractId
  };

  // Add signature to contract (with biometric hash)
  public shared(msg) func addSignature(
    contractId: Text,
    partyId: Text,
    biometricHash: ?Text
  ): async Bool {
    switch (contractMap.get(contractId)) {
      case null { return false; };
      case (?contract) {
        // Check if party is in the contract
        let foundParty = Array.find<Text>(
          contract.parties,
          func(p: Text): Bool { p == partyId }
        );
        let isParty = Option.isSome(foundParty);

        if (not isParty) {
          return false;
        };

        // Update signature
        let updatedSignatures = Array.map<Signature, Signature>(
          contract.signatures,
          func(sig: Signature): Signature {
            if (sig.partyId == partyId) {
              {
                partyId = sig.partyId;
                signed = true;
                timestamp = ?Time.now();
                biometricHash = biometricHash;
              }
            } else {
              sig
            }
          }
        );

        // Check if all signed
        let allSigned = Array.foldLeft<Signature, Bool>(
          updatedSignatures,
          true,
          func(acc: Bool, sig: Signature): Bool { acc and sig.signed }
        );

        let newStatus = if (allSigned and contract.status == "draft") {
          "pending_signatures"
        } else {
          contract.status
        };

        let updatedContract: SmartContract = {
          id = contract.id;
          name = contract.name;
          parties = contract.parties;
          conditions = contract.conditions;
          status = newStatus;
          createdAt = contract.createdAt;
          executedAt = contract.executedAt;
          signatures = updatedSignatures;
        };

        contractMap.put(contractId, updatedContract);
        true
      };
    }
  };

  // Activate contract (after all signatures)
  public shared(msg) func activateContract(contractId: Text): async Bool {
    switch (contractMap.get(contractId)) {
      case null { return false; };
      case (?contract) {
        let allSigned = Array.foldLeft<Signature, Bool>(
          contract.signatures,
          true,
          func(acc: Bool, sig: Signature): Bool { acc and sig.signed }
        );

        if (allSigned) {
          let updatedContract: SmartContract = {
            id = contract.id;
            name = contract.name;
            parties = contract.parties;
            conditions = contract.conditions;
            status = "active";
            createdAt = contract.createdAt;
            executedAt = contract.executedAt;
            signatures = contract.signatures;
          };

          contractMap.put(contractId, updatedContract);
          true
        } else {
          false
        }
      };
    }
  };

  // Link evidence to condition
  public shared(msg) func linkEvidenceToCondition(
    contractId: Text,
    conditionId: Text,
    evidenceId: Text
  ): async Bool {
    switch (contractMap.get(contractId)) {
      case null { return false; };
      case (?contract) {
        let updatedConditions = Array.map<ContractCondition, ContractCondition>(
          contract.conditions,
          func(cond: ContractCondition): ContractCondition {
            if (cond.id == conditionId) {
              {
                id = cond.id;
                conditionType = "evidence_validation";
                evidenceId = ?evidenceId;
                description = cond.description;
                met = cond.met;
                timestamp = cond.timestamp;
              }
            } else {
              cond
            }
          }
        );

        let updatedContract: SmartContract = {
          id = contract.id;
          name = contract.name;
          parties = contract.parties;
          conditions = updatedConditions;
          status = contract.status;
          createdAt = contract.createdAt;
          executedAt = contract.executedAt;
          signatures = contract.signatures;
        };

        contractMap.put(contractId, updatedContract);
        true
      };
    }
  };

  // Mark condition as met
  public shared(msg) func markConditionMet(
    contractId: Text,
    conditionId: Text
  ): async Bool {
    switch (contractMap.get(contractId)) {
      case null { return false; };
      case (?contract) {
        let updatedConditions = Array.map<ContractCondition, ContractCondition>(
          contract.conditions,
          func(cond: ContractCondition): ContractCondition {
            if (cond.id == conditionId and not cond.met) {
              {
                id = cond.id;
                conditionType = cond.conditionType;
                evidenceId = cond.evidenceId;
                description = cond.description;
                met = true;
                timestamp = ?Time.now();
              }
            } else {
              cond
            }
          }
        );

        // Check if all conditions met and can auto-execute
        let allConditionsMet = Array.foldLeft<ContractCondition, Bool>(
          updatedConditions,
          true,
          func(acc: Bool, cond: ContractCondition): Bool { acc and cond.met }
        );

        let allSigned = Array.foldLeft<Signature, Bool>(
          contract.signatures,
          true,
          func(acc: Bool, sig: Signature): Bool { acc and sig.signed }
        );

        let newStatus = if (allConditionsMet and allSigned and contract.status == "active") {
          "executed"
        } else {
          contract.status
        };

        let executedAt = if (newStatus == "executed") {
          ?Time.now()
        } else {
          contract.executedAt
        };

        let updatedContract: SmartContract = {
          id = contract.id;
          name = contract.name;
          parties = contract.parties;
          conditions = updatedConditions;
          status = newStatus;
          createdAt = contract.createdAt;
          executedAt = executedAt;
          signatures = contract.signatures;
        };

        contractMap.put(contractId, updatedContract);

        // Record execution and release settlement tokens
        if (newStatus == "executed") {
          let execution: ContractExecution = {
            contractId = contractId;
            triggeredBy = "auto-execution";
            conditionId = "all";
            evidenceId = null;
            timestamp = Time.now();
            result = "success";
          };

          let executions = Option.get(executionMap.get(contractId), []);
          executionMap.put(contractId, Array.append<ContractExecution>(executions, [execution]));

          // Auto-release settlement tokens to parties
          await releaseSettlementTokens(contractId);
        };

        true
      };
    }
  };

  // Log dispute entry
  public shared(msg) func logDispute(
    contractId: Text,
    party: Text,
    reason: Text,
    evidenceRef: ?Text
  ): async Bool {
    let dispute: DisputeEntry = {
      id = "DISPUTE-" # Int.toText(Time.now());
      timestamp = Time.now();
      party = party;
      reason = reason;
      evidenceRef = evidenceRef;
    };

    let disputes = Option.get(disputeMap.get(contractId), []);
    disputeMap.put(contractId, Array.append<DisputeEntry>(disputes, [dispute]));

    // Update contract status to disputed
    switch (contractMap.get(contractId)) {
      case null {};
      case (?contract) {
        if (contract.status != "executed") {
          let updatedContract: SmartContract = {
            id = contract.id;
            name = contract.name;
            parties = contract.parties;
            conditions = contract.conditions;
            status = "disputed";
            createdAt = contract.createdAt;
            executedAt = contract.executedAt;
            signatures = contract.signatures;
          };
          contractMap.put(contractId, updatedContract);
        };
      };
    };

    true
  };

  // Get contract by ID
  public query func getContract(contractId: Text): async ?SmartContract {
    contractMap.get(contractId)
  };

  // Get all contracts for a principal
  public query func getAllContracts(): async [SmartContract] {
    Iter.toArray(contractMap.vals())
  };

  // Get disputes for a contract
  public query func getDisputes(contractId: Text): async [DisputeEntry] {
    Option.get(disputeMap.get(contractId), [])
  };

  // Get executions for a contract
  public query func getExecutions(contractId: Text): async [ContractExecution] {
    Option.get(executionMap.get(contractId), [])
  };

  // Set settlement tokens for a contract (call before execution)
  public shared(msg) func setSettlementTokens(
    contractId: Text,
    settlements: [{
      recipient: Text;
      amount: Nat;
      tokenAddress: ?Text;
    }]
  ): async Bool {
    switch (contractMap.get(contractId)) {
      case null { return false; };
      case (?contract) {
        // Only contract parties can set settlements
        let foundParty = Array.find<Text>(
          contract.parties,
          func(p: Text): Bool { p == Principal.toText(msg.caller) }
        );
        let isParty = Option.isSome(foundParty);
        if (not isParty) {
          return false;
        };

        let tokens: [SettlementToken] = Array.map<{
          recipient: Text;
          amount: Nat;
          tokenAddress: ?Text;
        }, SettlementToken>(
          settlements,
          func(s): SettlementToken {
            {
              contractId = contractId;
              recipient = s.recipient;
              amount = s.amount;
              tokenAddress = s.tokenAddress;
              released = false;
              releasedAt = null;
              transactionHash = null;
            }
          }
        );

        settlementMap.put(contractId, tokens);
        true
      };
    }
  };

  // Release settlement tokens (called automatically on execution)
  private func releaseSettlementTokens(contractId: Text): async () {
    let settlements = Option.get(settlementMap.get(contractId), []);
    
    if (settlements.size() == 0) {
      return;
    };

    let now = Time.now();
    let updatedSettlements = Array.map<SettlementToken, SettlementToken>(
      settlements,
      func(token: SettlementToken): SettlementToken {
        if (not token.released) {
          // In production: Call token transfer function here
          // For now: Mark as released
          {
            contractId = token.contractId;
            recipient = token.recipient;
            amount = token.amount;
            tokenAddress = token.tokenAddress;
            released = true;
            releasedAt = ?now;
            transactionHash = ?("TX-" # contractId # "-" # Int.toText(now));
          }
        } else {
          token
        }
      }
    );

    settlementMap.put(contractId, updatedSettlements);
  };

  // Get settlement tokens for a contract
  public query func getSettlementTokens(contractId: Text): async [SettlementToken] {
    Option.get(settlementMap.get(contractId), [])
  };
};
