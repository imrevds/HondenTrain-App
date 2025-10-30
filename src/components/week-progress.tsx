import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface WeekProgressProps {
  completedDays: string[]; // Array of date strings (YYYY-MM-DD)
}

export const WeekProgress: React.FC<WeekProgressProps> = ({ completedDays }) => {
  const today = new Date();
  const weekDays = [];
  
  // Get last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    weekDays.push(date);
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('nl-NL', { weekday: 'short' });
  };

  const getDayNumber = (date: Date) => {
    return date.getDate();
  };

  const isToday = (date: Date) => {
    return formatDate(date) === formatDate(today);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">
        Week Voortgang
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date) => {
          const dateString = formatDate(date);
          const isCompleted = completedDays.includes(dateString);
          const isTodayDate = isToday(date);
          
          return (
            <div key={dateString} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground font-medium">
                {getDayName(date)}
              </span>
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                  isCompleted
                    ? "bg-gradient-success border-2 border-success shadow-success"
                    : isTodayDate
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted border-2 border-border"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-success-foreground" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      isTodayDate ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {getDayNumber(date)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
