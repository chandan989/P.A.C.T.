// Evidence Canister - ICP Smart Contract for Evidence Storage and Access Control
// This canister manages evidence metadata, access control, and validation records

import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";

actor EvidenceCanister {
  
  // Types
  public type EvidenceMetadata = {
    id: Text;
    evidenceType: Text;
    name: ?Text;
    parties: [Text];
    conditions: ?[Condition];
    createdAt: Time.Time;
    constellationHash: ?Text;
    validatorStatus: Text; // "pending", "validating", "validated", "rejected"
  };

  public type Condition = {
    id: Text;
    conditionType: Text;
    description: Text;
    evidenceId: ?Text;
    met: Bool;
    timestamp: ?Time.Time;
  };

  public type AccessControl = {
    evidenceId: Text;
    owner: Principal;
    allowedPrincipals: [Principal];
    createdAt: Time.Time;
  };

  public type ValidationRecord = {
    evidenceId: Text;
    validator: Principal;
    timestamp: Time.Time;
    status: Text; // "validated", "rejected"
  };

  // Storage
  private stable var evidenceEntries: [(Text, EvidenceMetadata)] = [];
  private stable var accessEntries: [(Text, AccessControl)] = [];
  private stable var validationEntries: [(Text, [ValidationRecord])] = [];

  private var evidenceMap = Map.HashMap<Text, EvidenceMetadata>(0, Text.equal, Text.hash);
  private var accessMap = Map.HashMap<Text, AccessControl>(0, Text.equal, Text.hash);
  private var validationMap = Map.HashMap<Text, [ValidationRecord]>(0, Text.equal, Text.hash);

  // System functions
  system func preupgrade() {
    evidenceEntries := Iter.toArray(evidenceMap.entries());
    accessEntries := Iter.toArray(accessMap.entries());
    validationEntries := Iter.toArray(validationMap.entries());
  };

  system func postupgrade() {
    evidenceMap := Map.fromIter<Text, EvidenceMetadata>(
      evidenceEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    accessMap := Map.fromIter<Text, AccessControl>(
      accessEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    validationMap := Map.fromIter<Text, [ValidationRecord]>(
      validationEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    evidenceEntries := [];
    accessEntries := [];
    validationEntries := [];
  };

  // Store evidence metadata on ICP
  public shared(msg) func storeEvidenceMetadata(
    evidenceId: Text,
    metadata: {
      evidenceType: Text;
      name: ?Text;
      parties: ?[Text];
      conditions: ?[Condition];
      constellationHash: ?Text;
    }
  ): async Bool {
    let caller = msg.caller;

    let evidence: EvidenceMetadata = {
      id = evidenceId;
      evidenceType = metadata.evidenceType;
      name = metadata.name;
      parties = Option.get(metadata.parties, []);
      conditions = metadata.conditions;
      createdAt = Time.now();
      constellationHash = metadata.constellationHash;
      validatorStatus = "pending";
    };

    evidenceMap.put(evidenceId, evidence);

    // Initialize access control - owner is caller
    let access: AccessControl = {
      evidenceId = evidenceId;
      owner = caller;
      allowedPrincipals = [caller];
      createdAt = Time.now();
    };

    accessMap.put(evidenceId, access);

    true
  };

  // Set access control for evidence
  public shared(msg) func setAccessControl(
    evidenceId: Text,
    allowedPrincipals: [Principal]
  ): async Bool {
    switch (accessMap.get(evidenceId)) {
      case null { return false; };
      case (?access) {
        // Only owner can modify access
        if (access.owner != msg.caller) {
          return false;
        };

        let updatedAccess: AccessControl = {
          evidenceId = evidenceId;
          owner = access.owner;
          allowedPrincipals = allowedPrincipals;
          createdAt = access.createdAt;
        };

        accessMap.put(evidenceId, updatedAccess);
        true
      };
    }
  };

  // Verify if a principal has access to evidence
  public query func verifyAccess(
    evidenceId: Text,
    principal: Principal
  ): async Bool {
    switch (accessMap.get(evidenceId)) {
      case null { return false; };
      case (?access) {
        if (access.owner == principal) {
          return true;
        };

        let foundPrincipal = Array.find<Principal>(
          access.allowedPrincipals,
          func(p: Principal): Bool { p == principal }
        );

        return Option.isSome(foundPrincipal);
      };
    }
  };

  // Record validation (witness/validator validates evidence)
  public shared(msg) func recordValidation(
    evidenceId: Text,
    validator: Principal
  ): async Bool {
    // Check if validator has access
    let hasAccess = await verifyAccess(evidenceId, validator);
    if (not hasAccess) {
      return false;
    };

    // Get existing validations
    let validations = Option.get(validationMap.get(evidenceId), []);

    let validation: ValidationRecord = {
      evidenceId = evidenceId;
      validator = validator;
      timestamp = Time.now();
      status = "validated";
    };

    // Add new validation
    let updatedValidations = Array.append<ValidationRecord>(validations, [validation]);
    validationMap.put(evidenceId, updatedValidations);

    // Update evidence status if enough validations
    switch (evidenceMap.get(evidenceId)) {
      case null {};
      case (?evidence) {
        if (updatedValidations.size() >= 2) {
          let updatedEvidence: EvidenceMetadata = {
            id = evidence.id;
            evidenceType = evidence.evidenceType;
            name = evidence.name;
            parties = evidence.parties;
            conditions = evidence.conditions;
            createdAt = evidence.createdAt;
            constellationHash = evidence.constellationHash;
            validatorStatus = "validated";
          };
          evidenceMap.put(evidenceId, updatedEvidence);
        } else if (updatedValidations.size() == 1) {
          let updatedEvidence: EvidenceMetadata = {
            id = evidence.id;
            evidenceType = evidence.evidenceType;
            name = evidence.name;
            parties = evidence.parties;
            conditions = evidence.conditions;
            createdAt = evidence.createdAt;
            constellationHash = evidence.constellationHash;
            validatorStatus = "validating";
          };
          evidenceMap.put(evidenceId, updatedEvidence);
        };
      };
    };

    true
  };

  // Get evidence metadata
  public query func getEvidenceMetadata(evidenceId: Text): async ?EvidenceMetadata {
    evidenceMap.get(evidenceId)
  };

  // Get all evidence for a principal
  public query func getEvidenceForPrincipal(principal: Principal): async [EvidenceMetadata] {
    var result: [EvidenceMetadata] = [];

    for ((id, access) in accessMap.entries()) {
      if (access.owner == principal) {
        switch (evidenceMap.get(id)) {
          case null {};
          case (?evidence) {
            result := Array.append<EvidenceMetadata>(result, [evidence]);
          };
        };
      } else {
        let foundPrincipal = Array.find<Principal>(
          access.allowedPrincipals,
          func(p: Principal): Bool { p == principal }
        );
        if (Option.isSome(foundPrincipal)) {
          switch (evidenceMap.get(id)) {
            case null {};
            case (?evidence) {
              result := Array.append<EvidenceMetadata>(result, [evidence]);
            };
          };
        };
      };
    };

    result
  };

  // Get validations for evidence
  public query func getValidations(evidenceId: Text): async [ValidationRecord] {
    Option.get(validationMap.get(evidenceId), [])
  };
};

