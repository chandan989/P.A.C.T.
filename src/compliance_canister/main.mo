// Compliance Canister - ICP Smart Contract for Compliance Document Management
// This canister manages compliance documents, validation, and reports

import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Int "mo:base/Int";

actor ComplianceCanister {
  
  // Types
  public type ComplianceDocument = {
    id: Text;
    name: Text;
    jurisdiction: Text;
    documentType: Text;
    status: Text; // "compliant" | "non-compliant" | "expiring" | "expired"
    validationHash: ?Text; // Constellation DAG hash
    validatedAt: ?Time.Time;
    expiresAt: ?Time.Time;
    riskLevel: Text; // "low" | "medium" | "high"
    complianceScore: Nat; // 0-100
  };

  public type ComplianceReport = {
    id: Text;
    name: Text;
    jurisdiction: Text;
    generatedAt: Time.Time;
    adherence: Nat; // Percentage
    riskLevel: Text;
    constellationHash: ?Text;
    documentIds: [Text];
  };

  public type JurisdictionRequirement = {
    jurisdiction: Text;
    documentType: Text;
    requirements: [Text];
    mandatoryClauses: [Text];
    lastUpdated: Time.Time;
  };

  public type ComplianceStatus = {
    compliant: Nat;
    nonCompliant: Nat;
    expiring: Nat;
    expired: Nat;
    averageScore: Nat;
  };

  // Storage
  private stable var documentEntries: [(Text, ComplianceDocument)] = [];
  private stable var reportEntries: [(Text, ComplianceReport)] = [];
  private stable var requirementEntries: [(Text, JurisdictionRequirement)] = [];

  private var documentMap = Map.HashMap<Text, ComplianceDocument>(0, Text.equal, Text.hash);
  private var reportMap = Map.HashMap<Text, ComplianceReport>(0, Text.equal, Text.hash);
  private var requirementMap = Map.HashMap<Text, JurisdictionRequirement>(0, Text.equal, Text.hash);

  // System functions
  system func preupgrade() {
    documentEntries := Iter.toArray(documentMap.entries());
    reportEntries := Iter.toArray(reportMap.entries());
    requirementEntries := Iter.toArray(requirementMap.entries());
  };

  system func postupgrade() {
    documentMap := Map.fromIter<Text, ComplianceDocument>(
      documentEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    reportMap := Map.fromIter<Text, ComplianceReport>(
      reportEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    requirementMap := Map.fromIter<Text, JurisdictionRequirement>(
      requirementEntries.vals(),
      0,
      Text.equal,
      Text.hash
    );
    documentEntries := [];
    reportEntries := [];
    requirementEntries := [];

    // Initialize default requirements
    initDefaultRequirements();
  };

  func initDefaultRequirements() {
    let californiaKey = "California-Employment Contract";
    if (Option.isNull(requirementMap.get(californiaKey))) {
      requirementMap.put(californiaKey, {
        jurisdiction = "California";
        documentType = "Employment Contract";
        requirements = ["Mandatory arbitration disclosure", "Non-compete limitations", "Wage disclosure"];
        mandatoryClauses = ["At-will employment statement", "Confidentiality clause"];
        lastUpdated = Time.now();
      });
    };

    let delawareKey = "Delaware-Corporate";
    if (Option.isNull(requirementMap.get(delawareKey))) {
      requirementMap.put(delawareKey, {
        jurisdiction = "Delaware";
        documentType = "Corporate";
        requirements = ["Board resolution format", "Shareholder rights", "Governance structure"];
        mandatoryClauses = ["Corporate bylaws reference", "Delaware law application"];
        lastUpdated = Time.now();
      });
    };

    let newYorkKey = "New York-NDA";
    if (Option.isNull(requirementMap.get(newYorkKey))) {
      requirementMap.put(newYorkKey, {
        jurisdiction = "New York";
        documentType = "NDA";
        requirements = ["Data privacy compliance", "Confidentiality scope", "Duration limits"];
        mandatoryClauses = ["NY state law jurisdiction", "Confidential information definition"];
        lastUpdated = Time.now();
      });
    };
  };

  // Store compliance document
  public shared(msg) func storeComplianceDocument(
    documentId: Text,
    document: {
      name: Text;
      jurisdiction: Text;
      documentType: Text;
      status: Text;
      validationHash: ?Text;
      validatedAt: ?Time.Time;
      expiresAt: ?Time.Time;
      riskLevel: Text;
      complianceScore: Nat;
    }
  ): async Bool {
    let complianceDoc: ComplianceDocument = {
      id = documentId;
      name = document.name;
      jurisdiction = document.jurisdiction;
      documentType = document.documentType;
      status = document.status;
      validationHash = document.validationHash;
      validatedAt = document.validatedAt;
      expiresAt = document.expiresAt;
      riskLevel = document.riskLevel;
      complianceScore = document.complianceScore;
    };

    documentMap.put(documentId, complianceDoc);
    true
  };

  // Update document status (for expiration checking)
  public shared(msg) func updateDocumentStatus(
    documentId: Text,
    status: Text
  ): async Bool {
    switch (documentMap.get(documentId)) {
      case null { return false; };
      case (?doc) {
        let updated: ComplianceDocument = {
          id = doc.id;
          name = doc.name;
          jurisdiction = doc.jurisdiction;
          documentType = doc.documentType;
          status = status;
          validationHash = doc.validationHash;
          validatedAt = doc.validatedAt;
          expiresAt = doc.expiresAt;
          riskLevel = doc.riskLevel;
          complianceScore = doc.complianceScore;
        };
        documentMap.put(documentId, updated);
        true
      };
    }
  };

  // Generate compliance report
  public shared(msg) func generateReport(
    jurisdiction: Text,
    documentIds: [Text],
    constellationHash: ?Text
  ): async Text {
    let reportId = "REPORT-" # Principal.toText(msg.caller) # "-" # Int.toText(Time.now());

    // Calculate adherence from documents
    var totalScore: Nat = 0;
    var count: Nat = 0;

    for (id in documentIds.vals()) {
      switch (documentMap.get(id)) {
        case null {};
        case (?doc) {
          if (doc.jurisdiction == jurisdiction) {
            totalScore := totalScore + doc.complianceScore;
            count := count + 1;
          };
        };
      };
    };

    let adherence = if (count > 0) {
      totalScore / count
    } else {
      0
    };

    let riskLevel = if (adherence >= 80) {
      "low"
    } else if (adherence >= 60) {
      "medium"
    } else {
      "high"
    };

    let report: ComplianceReport = {
      id = reportId;
      name = jurisdiction # " Compliance Report";
      jurisdiction = jurisdiction;
      generatedAt = Time.now();
      adherence = adherence;
      riskLevel = riskLevel;
      constellationHash = constellationHash;
      documentIds = documentIds;
    };

    reportMap.put(reportId, report);
    reportId
  };

  // Get compliance status for jurisdiction
  public query func getComplianceStatus(jurisdiction: Text): async ComplianceStatus {
    var compliant: Nat = 0;
    var nonCompliant: Nat = 0;
    var expiring: Nat = 0;
    var expired: Nat = 0;
    var totalScore: Nat = 0;
    var count: Nat = 0;

    for ((id, doc) in documentMap.entries()) {
      if (doc.jurisdiction == jurisdiction) {
        if (doc.status == "compliant") {
          compliant := compliant + 1;
        } else if (doc.status == "non-compliant") {
          nonCompliant := nonCompliant + 1;
        } else if (doc.status == "expiring") {
          expiring := expiring + 1;
        } else if (doc.status == "expired") {
          expired := expired + 1;
        };

        totalScore := totalScore + doc.complianceScore;
        count := count + 1;
      };
    };

    let averageScore = if (count > 0) {
      totalScore / count
    } else {
      0
    };

    {
      compliant = compliant;
      nonCompliant = nonCompliant;
      expiring = expiring;
      expired = expired;
      averageScore = averageScore;
    }
  };

  // Get all documents
  public query func getAllDocuments(): async [ComplianceDocument] {
    Iter.toArray(documentMap.vals())
  };

  // Get documents for jurisdiction
  public query func getDocumentsForJurisdiction(jurisdiction: Text): async [ComplianceDocument] {
    var result: [ComplianceDocument] = [];
    for ((id, doc) in documentMap.entries()) {
      if (doc.jurisdiction == jurisdiction) {
        result := Array.append<ComplianceDocument>(result, [doc]);
      };
    };
    result
  };

  // Get expiring documents (within 30 days)
  public query func getExpiringDocuments(): async [ComplianceDocument] {
    let now = Time.now();
    let thirtyDaysInNanos = 30 * 24 * 60 * 60 * 1_000_000_000;

    var result: [ComplianceDocument] = [];
    for ((id, doc) in documentMap.entries()) {
      switch (doc.expiresAt) {
        case null {};
        case (?expiresAt) {
          let timeUntilExpiry = Int.abs(Int.sub(expiresAt, now));
          if (timeUntilExpiry <= thirtyDaysInNanos and timeUntilExpiry > 0) {
            result := Array.append<ComplianceDocument>(result, [doc]);
          };
        };
      };
    };
    result
  };

  // Get report by ID
  public query func getReport(reportId: Text): async ?ComplianceReport {
    reportMap.get(reportId)
  };

  // Get all reports
  public query func getAllReports(): async [ComplianceReport] {
    Iter.toArray(reportMap.vals())
  };

  // Get jurisdiction requirement
  public query func getJurisdictionRequirement(
    jurisdiction: Text,
    documentType: Text
  ): async ?JurisdictionRequirement {
    let key = jurisdiction # "-" # documentType;
    requirementMap.get(key)
  };

  // Add or update jurisdiction requirement
  public shared(msg) func setJurisdictionRequirement(req: JurisdictionRequirement): async Bool {
    let key = req.jurisdiction # "-" # req.documentType;
    requirementMap.put(key, req);
    true
  };
};
