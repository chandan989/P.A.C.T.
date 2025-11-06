/**
 * Legal Compliance Dashboard
 * Real-time compliance status with Constellation-validated documents
 */

import { constellationClient } from './constellation';
import { icpClient } from './icp';
import { generateDefaultRequirements } from './jurisdictions';

export interface ComplianceDocument {
  id: string;
  name: string;
  jurisdiction: string;
  documentType: string;
  status: 'compliant' | 'non-compliant' | 'expiring' | 'expired';
  validationHash?: string; // Constellation DAG hash
  validatedAt?: string;
  expiresAt?: string;
  riskLevel: 'low' | 'medium' | 'high';
  complianceScore: number; // 0-100
}

export interface ComplianceReport {
  id: string;
  name: string;
  jurisdiction: string;
  generatedAt: string;
  adherence: number; // Percentage
  riskLevel: 'low' | 'medium' | 'high';
  documents: ComplianceDocument[];
  constellationHash?: string; // Audit trail hash
}

export interface JurisdictionRequirement {
  jurisdiction: string;
  documentType: string;
  requirements: string[];
  mandatoryClauses: string[];
  lastUpdated: string;
}

export class ComplianceManager {
  private documents: Map<string, ComplianceDocument> = new Map();
  private reports: ComplianceReport[] = [];
  private jurisdictions: JurisdictionRequirement[] = generateDefaultRequirements();

  /**
   * Validate document compliance on Constellation
   */
  async validateDocument(
    documentId: string,
    jurisdiction: string,
    documentType: string
  ): Promise<ComplianceDocument> {
    // Get jurisdiction requirements
    const req = this.jurisdictions.find(
      j => j.jurisdiction === jurisdiction && j.documentType === documentType
    );

    if (!req) {
      throw new Error(`No requirements found for ${jurisdiction} - ${documentType}`);
    }

    // In production: Check document content against requirements
    // For demo: Simulate validation
    const isCompliant = Math.random() > 0.3; // 70% compliance rate
    const complianceScore = isCompliant ? 85 + Math.floor(Math.random() * 15) : 30 + Math.floor(Math.random() * 50);

    // Store validation on Constellation DAG
    const validationFile = new File(
      [JSON.stringify({ documentId, jurisdiction, documentType, complianceScore, requirements: req })],
      `compliance-${documentId}.json`,
      { type: 'application/json' }
    );

    const evidence = await constellationClient.storeEvidence(
      validationFile,
      ['system', 'compliance-validator'],
      { type: 'compliance_validation', documentId, jurisdiction }
    );

    // Store metadata on ICP
    await icpClient.storeEvidenceMetadata(documentId, {
      type: 'compliance_document',
      jurisdiction,
      documentType,
      complianceScore,
      validationHash: evidence.hash,
    });

    const document: ComplianceDocument = {
      id: documentId,
      name: `Document ${documentId}`,
      jurisdiction,
      documentType,
      status: isCompliant ? 'compliant' : 'non-compliant',
      validationHash: evidence.hash,
      validatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      riskLevel: complianceScore >= 80 ? 'low' : complianceScore >= 60 ? 'medium' : 'high',
      complianceScore,
    };

    this.documents.set(documentId, document);
    return document;
  }

  /**
   * Generate compliance report (stored on ICP, audit trail on Constellation)
   */
  async generateReport(
    jurisdiction: string,
    documentIds: string[]
  ): Promise<ComplianceReport> {
    const documents = documentIds
      .map(id => this.documents.get(id))
      .filter((d): d is ComplianceDocument => d !== undefined);

    const adherence = documents.length > 0
      ? documents.reduce((sum, doc) => sum + doc.complianceScore, 0) / documents.length
      : 0;

    const riskLevel = adherence >= 80 ? 'low' : adherence >= 60 ? 'medium' : 'high';

    // Store report on Constellation for audit trail
    const reportFile = new File(
      [JSON.stringify({ jurisdiction, documents, adherence, generatedAt: new Date().toISOString() })],
      `compliance-report-${Date.now()}.json`,
      { type: 'application/json' }
    );

    const evidence = await constellationClient.storeEvidence(
      reportFile,
      ['system', 'compliance-generator'],
      { type: 'compliance_report', jurisdiction }
    );

    const report: ComplianceReport = {
      id: `REPORT-${Date.now()}`,
      name: `${jurisdiction} Compliance Report - ${new Date().toLocaleDateString()}`,
      jurisdiction,
      generatedAt: new Date().toISOString(),
      adherence: Math.round(adherence),
      riskLevel,
      documents,
      constellationHash: evidence.hash,
    };

    // Store on ICP
    await icpClient.storeEvidenceMetadata(report.id, {
      type: 'compliance_report',
      report,
    });

    this.reports.push(report);
    return report;
  }

  /**
   * Check for expiring documents and risk alerts
   */
  async checkExpiringDocuments(): Promise<ComplianceDocument[]> {
    const now = new Date();
    const expiring: ComplianceDocument[] = [];

    this.documents.forEach((doc) => {
      if (doc.expiresAt) {
        const expiresAt = new Date(doc.expiresAt);
        const daysUntilExpiry = (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

        if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
          doc.status = 'expiring';
          expiring.push(doc);
        } else if (daysUntilExpiry <= 0) {
          doc.status = 'expired';
          expiring.push(doc);
        }
      }
    });

    return expiring;
  }

  /**
   * Export audit trail from Constellation
   */
  async exportAuditTrail(reportId: string): Promise<string> {
    const report = this.reports.find(r => r.id === reportId);
    if (!report || !report.constellationHash) {
      throw new Error('Report not found or no Constellation hash');
    }

    // In production: Fetch full audit trail from Constellation DAG
    const auditTrail = {
      reportId: report.id,
      jurisdiction: report.jurisdiction,
      generatedAt: report.generatedAt,
      constellationHash: report.constellationHash,
      documents: report.documents.map(doc => ({
        id: doc.id,
        name: doc.name,
        validationHash: doc.validationHash,
        validatedAt: doc.validatedAt,
        complianceScore: doc.complianceScore,
      })),
    };

    return JSON.stringify(auditTrail, null, 2);
  }

  /**
   * Get all compliance documents
   */
  async getAllDocuments(): Promise<ComplianceDocument[]> {
    return Array.from(this.documents.values());
  }

  /**
   * Get all reports
   */
  async getAllReports(): Promise<ComplianceReport[]> {
    return this.reports;
  }

  /**
   * Get jurisdiction requirements
   */
  async getJurisdictionRequirements(
    jurisdiction: string,
    documentType: string
  ): Promise<JurisdictionRequirement | null> {
    return (
      this.jurisdictions.find(
        j => j.jurisdiction === jurisdiction && j.documentType === documentType
      ) || null
    );
  }

  /**
   * Get real-time compliance status for jurisdiction
   */
  async getComplianceStatus(jurisdiction: string): Promise<{
    compliant: number;
    nonCompliant: number;
    expiring: number;
    expired: number;
    averageScore: number;
  }> {
    const docs = Array.from(this.documents.values()).filter(
      d => d.jurisdiction === jurisdiction
    );

    return {
      compliant: docs.filter(d => d.status === 'compliant').length,
      nonCompliant: docs.filter(d => d.status === 'non-compliant').length,
      expiring: docs.filter(d => d.status === 'expiring').length,
      expired: docs.filter(d => d.status === 'expired').length,
      averageScore:
        docs.length > 0
          ? docs.reduce((sum, d) => sum + d.complianceScore, 0) / docs.length
          : 0,
    };
  }
}

export const complianceManager = new ComplianceManager();
