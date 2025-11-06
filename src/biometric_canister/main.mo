// Biometric Canister - ICP Smart Contract for Biometric Signature Storage
// This canister stores biometric hashes securely on ICP

import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Int "mo:base/Int";

actor BiometricCanister {
  
  // Types
  public type BiometricSignature = {
    id: Text;
    contractId: Text;
    partyId: Text;
    principal: Principal;
    biometricHash: Text;
    timestamp: Time.Time;
    verified: Bool;
  };

  // Storage
  private stable var signatureEntries: [(Text, BiometricSignature)] = [];
  private var signatureMap = Map.HashMap<Text, BiometricSignature>(0, Text.equal, Text.hash);
  private var contractSignaturesMap = Map.HashMap<Text, [Text]>(0, Text.equal, Text.hash);

  // System functions
  system func preupgrade() {
    signatureEntries := Iter.toArray(signatureMap.entries());
  };

  system func postupgrade() {
    signatureMap := Map.fromIter<Text, BiometricSignature>(
      signatureEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    signatureEntries := [];

    // Rebuild contract signatures map
    contractSignaturesMap := Map.HashMap<Text, [Text]>(0, Text.equal, Text.hash);
    for ((id, sig) in signatureMap.entries()) {
      let existing = Option.get(contractSignaturesMap.get(sig.contractId), []);
      contractSignaturesMap.put(sig.contractId, Array.append<Text>(existing, [id]));
    };
  };

  // Store biometric signature
  public shared(msg) func storeBiometricSignature(
    contractId: Text,
    partyId: Text,
    biometricHash: Text
  ): async Text {
    let signatureId = "BIO-" # Principal.toText(msg.caller) # "-" # Int.toText(Time.now());

    let signature: BiometricSignature = {
      id = signatureId;
      contractId = contractId;
      partyId = partyId;
      principal = msg.caller;
      biometricHash = biometricHash;
      timestamp = Time.now();
      verified = true;
    };

    signatureMap.put(signatureId, signature);

    // Update contract signatures list
    let existing = Option.get(contractSignaturesMap.get(contractId), []);
    contractSignaturesMap.put(contractId, Array.append<Text>(existing, [signatureId]));

    signatureId
  };

  // Get biometric signature by ID
  public query func getBiometricSignature(signatureId: Text): async ?BiometricSignature {
    signatureMap.get(signatureId)
  };

  // Get all signatures for a contract
  public query func getSignaturesForContract(contractId: Text): async [BiometricSignature] {
    let signatureIds = Option.get(contractSignaturesMap.get(contractId), []);
    var result: [BiometricSignature] = [];

    for (id in signatureIds.vals()) {
      switch (signatureMap.get(id)) {
        case null {};
        case (?sig) {
          result := Array.append<BiometricSignature>(result, [sig]);
        };
      };
    };

    result
  };

  // Verify biometric signature belongs to principal
  public query func verifyBiometricSignature(
    signatureId: Text,
    principal: Principal
  ): async Bool {
    switch (signatureMap.get(signatureId)) {
      case null { false };
      case (?sig) {
        sig.principal == principal and sig.verified
      };
    }
  };

  // Get signature for a party in a contract
  public query func getSignatureForParty(
    contractId: Text,
    partyId: Text
  ): async ?BiometricSignature {
    let signatureIds = Option.get(contractSignaturesMap.get(contractId), []);
    
    for (id in signatureIds.vals()) {
      switch (signatureMap.get(id)) {
        case null {};
        case (?sig) {
          if (sig.partyId == partyId) {
            return ?sig;
          };
        };
      };
    };
    
    null
  };
};
