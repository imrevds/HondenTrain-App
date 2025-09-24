import React from "react";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number; // 0-100
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { width: 40, height: 40, strokeWidth: 3 },
  md: { width: 60, height: 60, strokeWidth: 4 },
  lg: { width: 80, height: 80, strokeWidth: 5 }
};

export const ProgressRing: React.FC<ProgressRingProps> = ({ 
  progress, 
  size = "md", 
  className 
}) => {
  const { width, height, strokeWidth } = sizes[size];
  const radius = (width - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative", className)}>
      <svg
        width={width}
        height={height}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-foreground">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};