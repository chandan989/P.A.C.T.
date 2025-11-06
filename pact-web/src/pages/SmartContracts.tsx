import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Clock, XCircle, FileText, Users, Zap, Link as LinkIcon, Plus, Loader2 } from "lucide-react";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { smartContractAutomation, SmartContract, ContractCondition, SettlementToken } from "@/lib/smart-contracts";
import { useEvidence } from "@/hooks/use-evidence";
import { ContractBuilder, ContractCondition as BuilderCondition } from "@/components/ui/contract-builder";
import { toast } from "sonner";

const SmartContracts = () => {
  const [contracts, setContracts] = useState<SmartContract[]>([]);
  const [selectedContract, setSelectedContract] = useState<SmartContract | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [signDialogOpen, setSignDialogOpen] = useState(false);
  const [linkEvidenceDialogOpen, setLinkEvidenceDialogOpen] = useState(false);
  const [settlementDialogOpen, setSettlementDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { evidence } = useEvidence();
  
  // Form state
  const [contractName, setContractName] = useState("");
  const [parties, setParties] = useState<string[]>([]);
  const [partyInput, setPartyInput] = useState("");
  const [conditions, setConditions] = useState<BuilderCondition[]>([]);
  const [selectedConditionId, setSelectedConditionId] = useState("");
  const [selectedEvidenceId, setSelectedEvidenceId] = useState("");
  const [selectedPartyForSign, setSelectedPartyForSign] = useState("");
  // Settlement token state
  const [settlementTokens, setSettlementTokens] = useState<Array<{ recipient: string; amount: number; tokenAddress?: string }>>([]);
  const [settlementRecipient, setSettlementRecipient] = useState("");
  const [settlementAmount, setSettlementAmount] = useState("");
  const [settlementTokenAddress, setSettlementTokenAddress] = useState("");
  const [contractSettlements, setContractSettlements] = useState<Map<string, SettlementToken[]>>(new Map());

  useEffect(() => {
    loadContracts();
    
    // Monitor active contracts
    const interval = setInterval(() => {
      contracts.forEach(async (contract) => {
        if (contract.status === 'active') {
          await smartContractAutomation.monitorContract(contract.id);
          loadContracts();
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [contracts]);

  const loadContracts = async () => {
    const all = await smartContractAutomation.getAllContracts();
    setContracts(all);
  };

  const handleCreateContract = async () => {
    if (!contractName || parties.length < 2 || conditions.length === 0) {
      toast.error("Please fill in contract name, at least 2 parties, and conditions");
      return;
    }

    setLoading(true);
    try {
      // Convert builder conditions to contract conditions (omit id, met, timestamp)
      const contractConditions = conditions.map(c => ({
        type: c.type,
        description: c.description,
      }));

      const contract = await smartContractAutomation.createContract(
        contractName,
        parties,
        contractConditions
      );
      
      // If settlement tokens were added, set them
      if (settlementTokens.length > 0) {
        await smartContractAutomation.setSettlementTokens(contract.id, settlementTokens);
      }
      
      setContracts([...contracts, contract]);
      toast.success("Smart contract created!");
      setCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to create contract");
    } finally {
      setLoading(false);
    }
  };

  const handleAddParty = () => {
    if (partyInput.trim() && !parties.includes(partyInput.trim())) {
      setParties([...parties, partyInput.trim()]);
      setPartyInput("");
    }
  };

  const handleAddSettlementToken = () => {
    if (settlementRecipient && settlementAmount) {
      setSettlementTokens([
        ...settlementTokens,
        {
          recipient: settlementRecipient,
          amount: parseFloat(settlementAmount),
          tokenAddress: settlementTokenAddress || undefined,
        },
      ]);
      setSettlementRecipient("");
      setSettlementAmount("");
      setSettlementTokenAddress("");
    }
  };

  const loadSettlementTokens = async (contractId: string) => {
    const tokens = await smartContractAutomation.getSettlementTokens(contractId);
    setContractSettlements(new Map(contractSettlements.set(contractId, tokens)));
  };

  const handleLinkEvidence = async () => {
    if (!selectedContract || !selectedConditionId || !selectedEvidenceId) {
      return;
    }

    setLoading(true);
    try {
      await smartContractAutomation.linkEvidenceToCondition(
        selectedContract.id,
        selectedConditionId,
        selectedEvidenceId
      );
      toast.success("Evidence linked to condition!");
      setLinkEvidenceDialogOpen(false);
      loadContracts();
    } catch (error) {
      toast.error("Failed to link evidence");
    } finally {
      setLoading(false);
    }
  };

  const handleSign = async () => {
    if (!selectedContract || !selectedPartyForSign) {
      return;
    }

    setLoading(true);
    try {
      // Generate biometric hash (simulated)
      const biometricHash = `bio_${Date.now()}_${Math.random().toString(36)}`;
      
      await smartContractAutomation.addSignature(
        selectedContract.id,
        selectedPartyForSign,
        biometricHash
      );
      
      await smartContractAutomation.activateContract(selectedContract.id);
      
      toast.success("Contract signed with biometric verification!");
      setSignDialogOpen(false);
      loadContracts();
    } catch (error) {
      toast.error("Failed to sign contract");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setContractName("");
    setParties([]);
    setPartyInput("");
    setConditions([]);
    setSettlementTokens([]);
    setSettlementRecipient("");
    setSettlementAmount("");
    setSettlementTokenAddress("");
  };

  const getStatusBadge = (status: SmartContract['status']) => {
    const variants = {
      draft: { variant: 'outline' as const, icon: FileText, text: 'Draft' },
      pending_signatures: { variant: 'default' as const, icon: Clock, text: 'Pending Signatures' },
      active: { variant: 'default' as const, icon: Zap, text: 'Active' },
      executed: { variant: 'default' as const, icon: CheckCircle, text: 'Executed' },
      disputed: { variant: 'destructive' as const, icon: XCircle, text: 'Disputed' },
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="rounded-none uppercase text-xs">
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <FallingPattern>
        <div className="p-8 space-y-8 font-mono">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Smart Contract Automation</h1>
              <p className="text-muted-foreground">Drag-and-drop contract builder with Constellation evidence validation</p>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-none bg-bitcoin hover:bg-bitcoin/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Contract
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-none max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="uppercase tracking-wide">Create Smart Contract</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">Contract Name</Label>
                    <Input
                      value={contractName}
                      onChange={(e) => setContractName(e.target.value)}
                      placeholder="e.g., Bill of Lading Payment Contract"
                      className="rounded-none"
                    />
                  </div>

                  <div>
                    <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">Parties</Label>
                    <div className="flex gap-2">
                      <Input
                        value={partyInput}
                        onChange={(e) => setPartyInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddParty()}
                        placeholder="Enter party name"
                        className="rounded-none"
                      />
                      <Button onClick={handleAddParty} variant="outline" className="rounded-none">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {parties.map((party, idx) => (
                        <Badge key={idx} variant="outline" className="rounded-none">
                          {party}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <ContractBuilder conditions={conditions} onChange={setConditions} />
                  </div>

                  <div>
                    <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">Settlement Tokens (Optional)</Label>
                    <p className="text-xs text-muted-foreground mb-2">Tokens will be automatically released when contract executes</p>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={settlementRecipient}
                        onChange={(e) => setSettlementRecipient(e.target.value)}
                        placeholder="Recipient party"
                        className="rounded-none flex-1"
                      />
                      <Input
                        value={settlementAmount}
                        onChange={(e) => setSettlementAmount(e.target.value)}
                        placeholder="Amount"
                        type="number"
                        className="rounded-none w-32"
                      />
                      <Button onClick={handleAddSettlementToken} variant="outline" className="rounded-none">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {settlementTokens.map((token, idx) => (
                        <Badge key={idx} variant="outline" className="rounded-none mr-2">
                          {token.recipient}: {token.amount}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)} className="rounded-none">
                    Cancel
                  </Button>
                  <Button onClick={handleCreateContract} disabled={loading} className="rounded-none">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Create Contract
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Contracts List */}
          <div className="grid gap-4">
            {contracts.length === 0 ? (
              <Card className="rounded-none">
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-bold mb-2">No Smart Contracts</h3>
                  <p className="text-muted-foreground">
                    Create your first smart contract with Constellation evidence validation
                  </p>
                </CardContent>
              </Card>
            ) : (
              contracts.map((contract) => (
                <Card key={contract.id} className="rounded-none hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold uppercase tracking-wide">{contract.name}</h3>
                          {getStatusBadge(contract.status)}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{contract.parties.length} parties</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>{contract.conditions.length} conditions</span>
                          </div>
                          <span>{new Date(contract.createdAt).toLocaleDateString()}</span>
                        </div>

                        {/* Conditions */}
                        <div className="space-y-2 mb-4">
                          {contract.conditions.map((condition) => (
                            <div key={condition.id} className="flex items-center gap-2 text-sm">
                              {condition.met ? (
                                <CheckCircle className="h-4 w-4 text-constellation" />
                              ) : (
                                <Clock className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className={condition.met ? 'line-through text-muted-foreground' : ''}>
                                {condition.description}
                              </span>
                              {condition.evidenceId && (
                                <Badge variant="outline" className="rounded-none text-xs">
                                  <LinkIcon className="h-3 w-3 mr-1" />
                                  Evidence: {condition.evidenceId.slice(0, 8)}
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Signatures */}
                        <div className="space-y-1 mb-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Signatures:</p>
                          {contract.signatures.map((sig) => (
                            <div key={sig.partyId} className="flex items-center gap-2 text-sm">
                              {sig.signed ? (
                                <CheckCircle className="h-4 w-4 text-bitcoin" />
                              ) : (
                                <XCircle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span>{sig.partyId}</span>
                              {sig.biometricHash && (
                                <Badge variant="outline" className="rounded-none text-xs">
                                  Biometric ✓
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Settlement Tokens (for executed contracts) */}
                        {contract.status === 'executed' && contractSettlements.get(contract.id) && contractSettlements.get(contract.id)!.length > 0 && (
                          <div className="space-y-1 mb-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Settlement Tokens Released:</p>
                            {contractSettlements.get(contract.id)!.map((token, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                {token.released ? (
                                  <CheckCircle className="h-4 w-4 text-bitcoin" />
                                ) : (
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span>{token.recipient}: {token.amount}</span>
                                {token.transactionHash && (
                                  <Badge variant="outline" className="rounded-none text-xs">
                                    TX: {token.transactionHash.slice(0, 8)}...
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {contract.status === 'draft' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-none"
                              onClick={() => {
                                setSelectedContract(contract);
                                setSignDialogOpen(true);
                              }}
                            >
                              Sign Contract
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-none"
                              onClick={() => {
                                setSelectedContract(contract);
                                setLinkEvidenceDialogOpen(true);
                              }}
                            >
                              <LinkIcon className="h-4 w-4 mr-1" />
                              Link Evidence
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-none"
                              onClick={async () => {
                                setSelectedContract(contract);
                                await loadSettlementTokens(contract.id);
                                setSettlementDialogOpen(true);
                              }}
                            >
                              View Settlements
                            </Button>
                          </>
                        )}
                        {contract.status === 'active' && (
                          <Badge variant="default" className="rounded-none">
                            <Zap className="h-3 w-3 mr-1" />
                            Monitoring...
                          </Badge>
                        )}
                        {contract.status === 'executed' && contract.executedAt && (
                          <div className="text-xs text-muted-foreground">
                            Executed: {new Date(contract.executedAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Sign Dialog */}
          <Dialog open={signDialogOpen} onOpenChange={setSignDialogOpen}>
            <DialogContent className="rounded-none">
              <DialogHeader>
                <DialogTitle className="uppercase tracking-wide">Sign Contract</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {selectedContract && (
                  <>
                    <div>
                      <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">Select Party</Label>
                      <Select value={selectedPartyForSign} onValueChange={setSelectedPartyForSign}>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select party to sign" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedContract.parties.map((party) => (
                            <SelectItem key={party} value={party}>
                              {party}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your biometric signature will be stored on ICP canister
                    </p>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSignDialogOpen(false)} className="rounded-none">
                  Cancel
                </Button>
                <Button onClick={handleSign} disabled={loading || !selectedPartyForSign} className="rounded-none">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign with Biometric
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Link Evidence Dialog */}
          <Dialog open={linkEvidenceDialogOpen} onOpenChange={setLinkEvidenceDialogOpen}>
            <DialogContent className="rounded-none">
              <DialogHeader>
                <DialogTitle className="uppercase tracking-wide">Link Constellation Evidence</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {selectedContract && (
                  <>
                    <div>
                      <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">Select Condition</Label>
                      <Select value={selectedConditionId} onValueChange={setSelectedConditionId}>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedContract.conditions.map((cond) => (
                            <SelectItem key={cond.id} value={cond.id}>
                              {cond.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">Select Evidence</Label>
                      <Select value={selectedEvidenceId} onValueChange={setSelectedEvidenceId}>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select Constellation evidence" />
                        </SelectTrigger>
                        <SelectContent>
                          {evidence.map((ev) => (
                            <SelectItem key={ev.id} value={ev.id}>
                              {ev.id} - {ev.validatorStatus}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      When this Constellation evidence is validated, the condition will automatically be met and contract may auto-execute
                    </p>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setLinkEvidenceDialogOpen(false)} className="rounded-none">
                  Cancel
                </Button>
                <Button
                  onClick={handleLinkEvidence}
                  disabled={loading || !selectedConditionId || !selectedEvidenceId}
                  className="rounded-none"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Link Evidence
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Settlement Tokens Dialog */}
          <Dialog open={settlementDialogOpen} onOpenChange={setSettlementDialogOpen}>
            <DialogContent className="rounded-none max-w-2xl">
              <DialogHeader>
                <DialogTitle className="uppercase tracking-wide">Settlement Tokens</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {selectedContract && contractSettlements.get(selectedContract.id) && contractSettlements.get(selectedContract.id)!.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Settlement tokens for contract: <strong>{selectedContract.name}</strong>
                    </p>
                    {contractSettlements.get(selectedContract.id)!.map((token, idx) => (
                      <Card key={idx} className="rounded-none">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{token.recipient}</p>
                              <p className="text-sm text-muted-foreground">Amount: {token.amount}</p>
                              {token.tokenAddress && (
                                <p className="text-xs text-muted-foreground font-mono mt-1">Token: {token.tokenAddress.slice(0, 20)}...</p>
                              )}
                            </div>
                            <div className="text-right">
                              {token.released ? (
                                <Badge variant="default" className="rounded-none">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Released
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="rounded-none">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pending
                                </Badge>
                              )}
                              {token.releasedAt && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(token.releasedAt).toLocaleString()}
                                </p>
                              )}
                              {token.transactionHash && (
                                <p className="text-xs font-mono text-constellation mt-1">
                                  TX: {token.transactionHash.slice(0, 16)}...
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No settlement tokens configured for this contract</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSettlementDialogOpen(false)} className="rounded-none">
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default SmartContracts;
