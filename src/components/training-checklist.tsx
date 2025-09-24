import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TrainingItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TrainingChecklistProps {
  items: TrainingItem[];
  onItemToggle: (id: string) => void;
}

export const TrainingChecklist: React.FC<TrainingChecklistProps> = ({ 
  items, 
  onItemToggle 
}) => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card 
          key={item.id} 
          className={cn(
            "p-4 transition-all duration-300 hover:shadow-warm cursor-pointer border-2",
            item.completed 
              ? "bg-gradient-success border-success/30 shadow-success" 
              : "bg-card border-border hover:border-primary/30"
          )}
          onClick={() => onItemToggle(item.id)}
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 relative">
              <Checkbox
                checked={item.completed}
                className="data-[state=checked]:bg-success data-[state=checked]:border-success"
              />
              {item.completed && (
                <Check 
                  className="absolute inset-0 w-4 h-4 text-success-foreground animate-check" 
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold transition-all duration-200",
                item.completed 
                  ? "text-success-foreground line-through" 
                  : "text-foreground"
              )}>
                {item.title}
              </h3>
              <p className={cn(
                "text-sm mt-1 transition-all duration-200",
                item.completed 
                  ? "text-success-foreground/70" 
                  : "text-muted-foreground"
              )}>
                {item.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};