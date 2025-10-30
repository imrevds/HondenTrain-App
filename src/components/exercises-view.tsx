import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, BookOpen, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Exercise {
  id: string;
  title: string;
  difficulty: "Makkelijk" | "Gemiddeld" | "Gevorderd";
  duration: string;
  description: string;
  steps: string[];
  tips: string[];
}

const exercises: Exercise[] = [
  {
    id: "sit",
    title: "Zitten",
    difficulty: "Makkelijk",
    duration: "5-10 min",
    description: "Leer je hond om op commando te gaan zitten - een van de basiscommando's die elke hond moet kennen.",
    steps: [
      "Neem een beloning in je hand en laat je hond eraan ruiken",
      "Beweeg de beloning langzaam van de neus van je hond naar zijn achterhoofd",
      "Als je hond zijn hoofd omhoog beweegt, zal zijn achterwerk automatisch zakken",
      "Zodra zijn achterwerk de grond raakt, zeg 'Zit' en geef direct de beloning",
      "Herhaal dit 5-10 keer per sessie, meerdere keren per dag",
      "Begin geleidelijk het handgebaar te verminderen en alleen het commando 'Zit' te gebruiken",
    ],
    tips: [
      "Wees geduldig - sommige honden hebben meer tijd nodig dan andere",
      "Hou trainingssessies kort (5-10 minuten) om de focus te behouden",
      "Oefen op verschillende plekken om generalisatie te bevorderen",
      "Gebruik alleen positieve versterking, geen dwang",
    ],
  },
  {
    id: "stay",
    title: "Blijven",
    difficulty: "Gemiddeld",
    duration: "10-15 min",
    description: "Leer je hond om op zijn plek te blijven tot je toestemming geeft om te bewegen.",
    steps: [
      "Begin met je hond in 'zit' of 'down' positie",
      "Houd je hand omhoog met de palm naar voren en zeg 'Blijf'",
      "Doe één stap achteruit en wacht 2 seconden",
      "Als je hond blijft zitten, ga terug en beloon direct",
      "Vergroot geleidelijk de afstand en duur",
      "Voeg het 'Oké' of 'Kom' commando toe om het blijven te beëindigen",
    ],
    tips: [
      "Begin met hele korte afstanden en tijden (1-2 seconden)",
      "Beloon TIJDENS het blijven, niet alleen na afloop",
      "Als je hond beweegt, ga dan terug naar een makkelijker stap",
      "Oefen met afleidingen zodra de basis goed zit",
    ],
  },
  {
    id: "come",
    title: "Komen",
    difficulty: "Gemiddeld",
    duration: "10-15 min",
    description: "Een levensreddend commando - leer je hond om altijd naar je toe te komen wanneer je roept.",
    steps: [
      "Begin in een afleidingsvrije omgeving",
      "Laat iemand je hond vasthouden of bind hem kort vast",
      "Loop 2-3 meter weg en draai je om naar je hond",
      "Zeg op vrolijke toon 'Kom!' en kniel eventueel",
      "Wanneer je hond naar je toe komt, beloon direct met enthousiasme",
      "Herhaal en vergroot geleidelijk de afstand",
      "Oefen later met langere lijnen en meer afleidingen",
    ],
    tips: [
      "Maak 'Kom' altijd positief - nooit straffen na komen",
      "Gebruik een vrolijke, uitnodigende stem",
      "Ren soms weg van je hond om de achtervolging leuk te maken",
      "Oefen dagelijks, zelfs als je hond het al goed kan",
    ],
  },
  {
    id: "down",
    title: "Liggen",
    difficulty: "Makkelijk",
    duration: "5-10 min",
    description: "Leer je hond om op commando te gaan liggen - nuttig voor kalmte en controle.",
    steps: [
      "Begin met je hond in zit positie",
      "Houd een beloning voor zijn neus",
      "Beweeg je hand langzaam naar beneden en dan naar voren",
      "Je hond zal zijn neus volgen en gaan liggen",
      "Zodra zijn ellebogen de grond raken, zeg 'Lig' en beloon",
      "Herhaal 5-10 keer per sessie",
    ],
    tips: [
      "Sommige honden vinden liggen kwetsbaar - wees extra geduldig",
      "Dwing je hond nooit naar beneden",
      "Oefen op zachte ondergronden in het begin",
      "Combineer later met 'blijven' voor langere rust momenten",
    ],
  },
  {
    id: "loose-leash",
    title: "Loslijnig Lopen",
    difficulty: "Gevorderd",
    duration: "15-20 min",
    description: "Leer je hond om rustig naast je te lopen zonder aan de riem te trekken.",
    steps: [
      "Begin in een rustige omgeving met weinig afleiding",
      "Houd beloningen klaar in je hand aan de kant waar je hond loopt",
      "Begin te lopen en beloon je hond elke 2-3 seconden als de riem los is",
      "Zodra de riem strak komt, STOP direct met lopen",
      "Wacht tot je hond weer aandacht geeft of terug komt, dan belonen",
      "Ga verder lopen en herhaal",
      "Vergroot geleidelijk de tijd tussen beloningen",
    ],
    tips: [
      "Consistentie is essentieel - ALTIJD stoppen bij trekken",
      "Gebruik een kortere riem (1,5m) voor betere controle",
      "Wissel regelmatig van richting om aandacht te houden",
      "Oefen eerst thuis in de tuin voordat je de straat opgaat",
    ],
  },
  {
    id: "leave-it",
    title: "Laat Maar",
    difficulty: "Gemiddeld",
    duration: "10-15 min",
    description: "Leer je hond om objecten te negeren - belangrijk voor veiligheid.",
    steps: [
      "Maak een vuist met een beloning erin",
      "Laat je hond eraan snuffelen maar open je hand niet",
      "Wacht tot je hond stopt met snuffelen en wegkijkt",
      "Zodra hij wegkijkt, zeg 'Braaf!' en geef een andere beloning",
      "Herhaal tot je hond direct wegkijkt van je vuist",
      "Oefen met de beloning op de open hand",
      "Ga over naar objecten op de grond",
    ],
    tips: [
      "Beloon ALTIJD met een andere treat, niet degene die je laat liggen",
      "Begin makkelijk en maak het geleidelijk moeilijker",
      "Oefen met verschillende objecten en situaties",
      "Dit commando kan levens redden - besteed er tijd aan",
    ],
  },
];

export const ExercisesView = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const getDifficultyColor = (difficulty: Exercise["difficulty"]) => {
    switch (difficulty) {
      case "Makkelijk":
        return "bg-success/10 text-success border-success/20";
      case "Gemiddeld":
        return "bg-warning/10 text-warning border-warning/20";
      case "Gevorderd":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Basis Oefeningen
          </h2>
          <p className="text-muted-foreground">
            Klik op een oefening voor een gedetailleerd stappenplan
          </p>
        </div>

        <div className="grid gap-4">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] border-2"
              onClick={() => setSelectedExercise(exercise)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 mb-2">
                      {exercise.title}
                      {exercise.difficulty === "Makkelijk" && (
                        <Star className="w-4 h-4 text-success fill-success" />
                      )}
                    </CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge variant="outline" className={getDifficultyColor(exercise.difficulty)}>
                    {exercise.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    ⏱️ {exercise.duration}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedExercise && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedExercise.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedExercise.description}
                </DialogDescription>
                <div className="flex gap-2 pt-2">
                  <Badge variant="outline" className={getDifficultyColor(selectedExercise.difficulty)}>
                    {selectedExercise.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    ⏱️ {selectedExercise.duration}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-primary">📋</span>
                    Stappenplan
                  </h3>
                  <ol className="space-y-3">
                    {selectedExercise.steps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-sm leading-relaxed pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-primary">💡</span>
                    Tips voor Succes
                  </h3>
                  <ul className="space-y-2">
                    {selectedExercise.tips.map((tip, index) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button onClick={() => setSelectedExercise(null)} className="w-full">
                Sluiten
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
