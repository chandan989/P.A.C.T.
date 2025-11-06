import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical, Plus, X, FileText, CheckCircle, Calendar, Link as LinkIcon } from "lucide-react";

export interface ContractCondition {
  id: string;
  type: 'evidence_validation' | 'payment' | 'signature' | 'timestamp' | 'custom';
  description: string;
  evidenceId?: string;
}

interface ContractBuilderProps {
  conditions: ContractCondition[];
  onChange: (conditions: ContractCondition[]) => void;
}

function ConditionItem({ condition, onUpdate, onDelete }: {
  condition: ContractCondition;
  onUpdate: (id: string, updates: Partial<ContractCondition>) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: condition.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'evidence_validation':
        return <FileText className="h-4 w-4" />;
      case 'payment':
        return <CheckCircle className="h-4 w-4" />;
      case 'signature':
        return <CheckCircle className="h-4 w-4" />;
      case 'timestamp':
        return <Calendar className="h-4 w-4" />;
      default:
        return <LinkIcon className="h-4 w-4" />;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2">
      <Card className="rounded-none border-2">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <button
              {...attributes}
              {...listeners}
              className="mt-1 cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </button>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                {getTypeIcon(condition.type)}
                <Select
                  value={condition.type}
                  onValueChange={(value: any) => onUpdate(condition.id, { type: value })}
                >
                  <SelectTrigger className="w-48 rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="evidence_validation">Evidence Validation</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="signature">Signature</SelectItem>
                    <SelectItem value="timestamp">Timestamp</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(condition.id)}
                  className="ml-auto rounded-none"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <Label className="text-xs uppercase tracking-wide mb-1 block">Description</Label>
                <Input
                  value={condition.description}
                  onChange={(e) => onUpdate(condition.id, { description: e.target.value })}
                  placeholder="Describe the condition..."
                  className="rounded-none"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ContractBuilder({ conditions, onChange }: ContractBuilderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = conditions.findIndex((c) => c.id === active.id);
      const newIndex = conditions.findIndex((c) => c.id === over.id);

      onChange(arrayMove(conditions, oldIndex, newIndex));
    }
  };

  const handleAddCondition = () => {
    const newCondition: ContractCondition = {
      id: `cond-${Date.now()}-${Math.random()}`,
      type: 'evidence_validation',
      description: 'New condition',
    };
    onChange([...conditions, newCondition]);
  };

  const handleUpdate = (id: string, updates: Partial<ContractCondition>) => {
    onChange(
      conditions.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const handleDelete = (id: string) => {
    onChange(conditions.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm uppercase tracking-wide font-semibold">
          Contract Conditions (Drag to reorder)
        </Label>
        <Button
          onClick={handleAddCondition}
          size="sm"
          className="rounded-none"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Condition
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={conditions.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2 min-h-[200px] border-2 border-dashed border-muted p-4 rounded-none">
            {conditions.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p className="text-sm">No conditions added yet.</p>
                <p className="text-xs mt-1">Click "Add Condition" to start building your contract.</p>
              </div>
            ) : (
              conditions.map((condition) => (
                <ConditionItem
                  key={condition.id}
                  condition={condition}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

