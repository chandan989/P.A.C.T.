/**
 * Smart Legal Contract Automation
 * ICP-based smart contracts with Constellation evidence validation
 */

import { constellationClient } from './constellation';
import { icpClient } from './icp';

export interface ContractCondition {
  id: string;
  type: 'evidence_validation' | 'payment' | 'signature' | 'timestamp' | 'custom';
  evidenceId?: string; // Constellation evidence ID
  description: string;
  met: boolean;
  timestamp?: string;
}

export interface SmartContract {
  id: string;
  name: string;
  parties: string[];
  conditions: ContractCondition[];
  status: 'draft' | 'pending_signatures' | 'active' | 'executed' | 'disputed';
  createdAt: string;
  executedAt?: string;
  disputeLog?: DisputeEntry[];
  signatures: Signature[];
}

export interface Signature {
  partyId: string;
  signed: boolean;
  timestamp?: string;
  biometricHash?: string;
}

export interface DisputeEntry {
  id: string;
  timestamp: string;
  party: string;
  reason: string;
  evidenceRef?: string; // Constellation evidence ID
}

export interface ContractExecution {
  contractId: string;
  triggeredBy: string;
  conditionId: string;
  evidenceId?: string;
  timestamp: string;
  result: 'success' | 'failure' | 'pending';
}

export interface SettlementToken {
  contractId: string;
  recipient: string;
  amount: number;
  tokenAddress?: string;
  released: boolean;
  releasedAt?: string;
  transactionHash?: string;
}

export class SmartContractAutomation {
  private contracts: Map<string, SmartContract> = new Map();

  /**
   * Create a new smart contract
   */
  async createContract(
    name: string,
    parties: string[],
    conditions: Omit<ContractCondition, 'id' | 'met' | 'timestamp'>[]
  ): Promise<SmartContract> {
    const contract: SmartContract = {
      id: `CONTRACT-${Date.now()}`,
      name,
      parties,
      conditions: conditions.map((c, idx) => ({
        ...c,
        id: `COND-${idx + 1}`,
        met: false,
      })),
      status: 'draft',
      createdAt: new Date().toISOString(),
      signatures: parties.map(partyId => ({
        partyId,
        signed: false,
      })),
    };

    // Store on ICP
    await icpClient.storeEvidenceMetadata(contract.id, {
      type: 'smart_contract',
      name,
      parties,
      conditions: contract.conditions,
    });

    this.contracts.set(contract.id, contract);
    return contract;
  }

  /**
   * Add signature to contract (biometric on ICP)
   */
  async addSignature(contractId: string, partyId: string, biometricHash?: string): Promise<boolean> {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      throw new Error('Contract not found');
    }

    // Verify party has access on ICP
    const hasAccess = await icpClient.verifyAccess(contractId, partyId);
    if (!hasAccess && !contract.parties.includes(partyId)) {
      throw new Error('Party does not have access to this contract');
    }

    // Record signature on ICP (biometric signature stored on ICP)
    await icpClient.recordValidation(contractId, partyId);

    // Update contract signature
    const signature = contract.signatures.find(s => s.partyId === partyId);
    if (signature) {
      signature.signed = true;
      signature.timestamp = new Date().toISOString();
      signature.biometricHash = biometricHash;
    }

    // Check if all signed
    const allSigned = contract.signatures.every(s => s.signed);
    if (allSigned && contract.status === 'draft') {
      contract.status = 'pending_signatures';
    }

    return true;
  }

  /**
   * Activate contract (after all signatures)
   */
  async activateContract(contractId: string): Promise<boolean> {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      return false;
    }

    const allSigned = contract.signatures.every(s => s.signed);
    if (allSigned) {
      contract.status = 'active';
      
      // Start monitoring conditions
      this.monitorContract(contractId);
      return true;
    }

    return false;
  }

  /**
   * Link evidence to contract condition
   */
  async linkEvidenceToCondition(
    contractId: string,
    conditionId: string,
    evidenceId: string
  ): Promise<boolean> {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      return false;
    }

    const condition = contract.conditions.find(c => c.id === conditionId);
    if (condition) {
      condition.evidenceId = evidenceId;
      condition.type = 'evidence_validation';

      // Update on ICP
      await icpClient.storeEvidenceMetadata(contractId, {
        type: 'smart_contract',
        conditions: contract.conditions,
      });

      // Check if condition is met
      await this.checkCondition(contractId, conditionId);
      return true;
    }

    return false;
  }

  /**
   * Check if condition is met (especially evidence-based conditions)
   */
  async checkCondition(contractId: string, conditionId: string): Promise<boolean> {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      return false;
    }

    const condition = contract.conditions.find(c => c.id === conditionId);
    if (!condition || condition.met) {
      return condition?.met || false;
    }

    // Check evidence-based conditions
    if (condition.type === 'evidence_validation' && condition.evidenceId) {
      const evidence = await constellationClient.getEvidence(condition.evidenceId);
      if (evidence && evidence.validatorStatus === 'validated') {
        // Condition met - update contract
        condition.met = true;
        condition.timestamp = new Date().toISOString();

        // Log to Constellation dispute log
        await this.logDispute(contractId, {
          timestamp: new Date().toISOString(),
          party: 'System',
          reason: `Condition ${conditionId} met via Constellation evidence ${condition.evidenceId}`,
          evidenceRef: condition.evidenceId,
        });

        // Check if contract can auto-execute
        await this.autoExecute(contractId);
        return true;
      }
    }

    // Check signature conditions
    if (condition.type === 'signature') {
      const allSigned = contract.signatures.every(s => s.signed);
      if (allSigned) {
        condition.met = true;
        condition.timestamp = new Date().toISOString();
        await this.autoExecute(contractId);
        return true;
      }
    }

    return false;
  }

  /**
   * Auto-execute contract when all conditions are met
   */
  async autoExecute(contractId: string): Promise<ContractExecution | null> {
    const contract = this.contracts.get(contractId);
    if (!contract || contract.status !== 'active') {
      return null;
    }

    // Check all conditions
    const allConditionsMet = contract.conditions.every(c => c.met);
    const allSigned = contract.signatures.every(s => s.signed);

    if (allConditionsMet && allSigned) {
      // Execute contract
      contract.status = 'executed';
      contract.executedAt = new Date().toISOString();

      // Log execution on Constellation
      const execution: ContractExecution = {
        contractId,
        triggeredBy: 'auto-execution',
        conditionId: 'all',
        timestamp: new Date().toISOString(),
        result: 'success',
      };

      await this.logDispute(contractId, {
        timestamp: execution.timestamp,
        party: 'System',
        reason: `Contract auto-executed - all conditions met`,
      });

      return execution;
    }

    return null;
  }

  /**
   * Monitor contract conditions (should be called periodically)
   */
  async monitorContract(contractId: string): Promise<ContractExecution | null> {
    const contract = this.contracts.get(contractId);
    if (!contract || contract.status !== 'active') {
      return null;
    }

    // Check each condition
    for (const condition of contract.conditions) {
      if (!condition.met) {
        await this.checkCondition(contractId, condition.id);
      }
    }

    // Try auto-execution
    return await this.autoExecute(contractId);
  }

  /**
   * Log dispute to Constellation
   */
  private async logDispute(contractId: string, entry: Omit<DisputeEntry, 'id'>): Promise<void> {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      return;
    }

    if (!contract.disputeLog) {
      contract.disputeLog = [];
    }

    const disputeEntry: DisputeEntry = {
      id: `DISPUTE-${Date.now()}`,
      ...entry,
    };

    contract.disputeLog.push(disputeEntry);

    // Store dispute log on Constellation DAG
    await constellationClient.storeEvidence(
      new File([JSON.stringify(disputeEntry)], `dispute-${disputeEntry.id}.json`, { type: 'application/json' }),
      [contractId],
      { type: 'dispute_log', contractId }
    );
  }

  /**
   * Get contract by ID
   */
  async getContract(contractId: string): Promise<SmartContract | null> {
    return this.contracts.get(contractId) || null;
  }

  /**
   * Get all contracts
   */
  async getAllContracts(): Promise<SmartContract[]> {
    return Array.from(this.contracts.values());
  }

  /**
   * Set settlement tokens for a contract
   */
  async setSettlementTokens(
    contractId: string,
    settlements: Array<{
      recipient: string;
      amount: number;
      tokenAddress?: string;
    }>
  ): Promise<boolean> {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      throw new Error('Contract not found');
    }

    // In production: Call ICP canister to set settlement tokens
    // For now: Store in contract metadata
    await icpClient.storeEvidenceMetadata(`settlement-${contractId}`, {
      type: 'settlement_tokens',
      contractId,
      settlements,
    });

    return true;
  }

  /**
   * Get settlement tokens for a contract
   */
  async getSettlementTokens(contractId: string): Promise<SettlementToken[]> {
    // In production: Call ICP canister to get settlement tokens
    // For now: Return empty array (tokens stored on ICP)
    return [];
  }
}

export const smartContractAutomation = new SmartContractAutomation();
