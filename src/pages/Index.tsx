import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingChecklist } from "@/components/training-checklist";
import { StatsCard } from "@/components/stats-card";
import { FeedbackForm } from "@/components/feedback-form";
import { ExercisesView } from "@/components/exercises-view";
import { WeekProgress } from "@/components/week-progress";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useTrainingData } from "@/hooks/use-training-data";
import { Heart, Flame, Target, RotateCcw } from "lucide-react";
import dogHero from "@/assets/dog-hero.png";

const Index = () => {
  const { items, stats, completedDays, toggleItem, resetDaily } = useTrainingData();

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={dogHero} 
                alt="Friendly dog" 
                className="w-16 h-16 rounded-full bg-white/10 p-2"
              />
              <div>
                <h1 className="text-3xl font-bold">Hondentraining Tracker</h1>
                <p className="opacity-90">Consistentie is de sleutel tot succes</p>
              </div>
            </div>
            <ProgressRing 
              progress={stats.completionRate} 
              size="lg" 
              className="text-primary-foreground"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <Tabs defaultValue="training" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="exercises">Oefeningen</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="training" className="space-y-6">
            <WeekProgress completedDays={completedDays} />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard
                title="Huidige Streak"
                value={stats.currentStreak}
                subtitle="dagen op rij"
                icon={<Flame className="text-primary" />}
                variant="warning"
              />
              <StatsCard
                title="Vandaag Voltooid"
                value={`${stats.completedToday}/${stats.totalItems}`}
                subtitle="training items"
                progress={stats.completionRate}
                icon={<Target />}
                variant={stats.completionRate === 100 ? "success" : "default"}
              />
              <StatsCard
                title="Motivatie"
                value="Hoog! 🐕"
                subtitle="blijf volhouden"
                icon={<Heart className="text-primary" />}
              />
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">
                    Dagelijkse Checklist
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Voltooi alle taken voor een productieve trainingsdag
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetDaily}
                  className="hover:bg-destructive hover:text-destructive-foreground"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <TrainingChecklist 
                items={items}
                onItemToggle={toggleItem}
              />

              {stats.completionRate === 100 && (
                <div className="text-center p-8 bg-gradient-success rounded-2xl shadow-success animate-fadeIn">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-success-foreground mb-2">
                    Geweldig gedaan!
                  </h3>
                  <p className="text-success-foreground/80">
                    Je hebt alle training taken voor vandaag voltooid. Jouw hond wordt steeds beter getraind!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="exercises">
            <ExercisesView />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
