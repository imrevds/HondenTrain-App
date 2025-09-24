import React from "react";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  progress?: number;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning";
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  progress,
  icon,
  variant = "default",
  className
}) => {
  const variants = {
    default: "bg-gradient-warm border-border/50",
    success: "bg-gradient-success border-success/30 text-success-foreground",
    warning: "bg-gradient-primary border-primary/30 text-primary-foreground"
  };

  return (
    <Card className={cn(
      "p-6 transition-all duration-300 hover:shadow-warm",
      variants[variant],
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
          <p className="text-2xl font-bold mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm opacity-70">{subtitle}</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {icon && (
            <div className="text-2xl opacity-80">
              {icon}
            </div>
          )}
          {progress !== undefined && (
            <ProgressRing progress={progress} size="sm" />
          )}
        </div>
      </div>
    </Card>
  );
};