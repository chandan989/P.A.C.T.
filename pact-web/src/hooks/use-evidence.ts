import { useState, useCallback, useEffect } from 'react';
import { constellationClient, ConstellationEvidence } from '@/lib/constellation';
import { icpClient } from '@/lib/icp';
import { toast } from 'sonner';

export function useEvidence() {
  const [evidence, setEvidence] = useState<ConstellationEvidence[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize with demo data
  useEffect(() => {
    const demoEvidence: ConstellationEvidence[] = [
      {
        id: 'EVD-20250115-001',
        hash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
        transactionId: 'tx_constellation_demo_001',
        timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
        witnesses: ['Alice Johnson', 'Bob Smith', 'Carol Williams'],
        validatorStatus: 'validated',
        chainOfCustody: [
          {
            timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
            action: 'Uploaded to Constellation DAG',
            actor: 'System',
            details: 'Contract_Signed.pdf',
          },
          {
            timestamp: new Date(Date.now() - 2 * 86400000 + 3600000).toISOString(),
            action: 'Witness validation recorded',
            actor: 'Alice Johnson',
          },
        ],
      },
      {
        id: 'EVD-20250114-002',
        hash: 'f1e2d3c4b5a6789012345678901234567890abcdef1234567890abcdef123456',
        transactionId: 'tx_constellation_demo_002',
        timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
        witnesses: ['Charlie Brown', 'Diana Prince'],
        validatorStatus: 'pending',
        chainOfCustody: [
          {
            timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
            action: 'Uploaded to Constellation DAG',
            actor: 'System',
            details: 'Meeting_Recording.mp4',
          },
        ],
      },
    ];
    setEvidence(demoEvidence);
  }, []);

  const uploadEvidence = useCallback(async (file: File, witnesses: string[], metadata?: any) => {
    setLoading(true);
    try {
      // 1. Upload to Constellation DAG
      const constellationEvidence = await constellationClient.storeEvidence(file, witnesses, metadata);
      
      // 2. Store metadata on ICP
      await icpClient.storeEvidenceMetadata(constellationEvidence.id, {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        ...metadata,
      });

      // 3. Set access control on ICP
      await icpClient.setAccessControl({
        evidenceId: constellationEvidence.id,
        allowedUsers: witnesses,
        requiredWitnesses: witnesses.length,
      });

      setEvidence(prev => [constellationEvidence, ...prev]);
      toast.success('Evidence uploaded successfully!');
      
      return constellationEvidence;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload evidence');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const validateAsWitness = useCallback(async (evidenceId: string, witnessId: string) => {
    setLoading(true);
    try {
      // Validate on Constellation
      await constellationClient.validateEvidence(evidenceId, witnessId);
      
      // Record on ICP
      await icpClient.recordValidation(evidenceId, witnessId);
      
      // Update local state
      setEvidence(prev => prev.map(e =>
        e.id === evidenceId
          ? {
              ...e,
              validatorStatus: 'validated' as const,
              chainOfCustody: [
                ...e.chainOfCustody,
                {
                  timestamp: new Date().toISOString(),
                  action: 'Witness validation recorded',
                  actor: witnessId,
                },
              ],
            }
          : e
      ));

      toast.success('Validation recorded!');
    } catch (error) {
      console.error('Validation error:', error);
      toast.error('Failed to record validation');
    } finally {
      setLoading(false);
    }
  }, []);

  const generateCertificate = useCallback(async (evidenceId: string) => {
    setLoading(true);
    try {
      const certificate = await constellationClient.generateCertificate(evidenceId);
      
      // Download certificate
      const blob = new Blob([certificate], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `evidence-certificate-${evidenceId}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success('Certificate downloaded!');
    } catch (error) {
      console.error('Certificate error:', error);
      toast.error('Failed to generate certificate');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    evidence,
    loading,
    uploadEvidence,
    validateAsWitness,
    generateCertificate,
  };
}

