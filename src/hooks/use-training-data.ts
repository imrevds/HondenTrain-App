import { useState, useEffect } from "react";

interface TrainingItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TrainingStats {
  currentStreak: number;
  completedToday: number;
  totalItems: number;
  completionRate: number;
}

export const useTrainingData = () => {
  const [items, setItems] = useState<TrainingItem[]>([
    {
      id: "1",
      title: "Zit commando oefenen",
      description: "Oefen het 'zit' commando 5 keer met beloning",
      completed: false
    },
    {
      id: "2", 
      title: "Pootje geven",
      description: "Leer je hond om rustig pootje te geven",
      completed: false
    },
    {
      id: "3",
      title: "Aan de lijn lopen",
      description: "10 minuten oefenen zonder trekken aan de lijn",
      completed: false
    },
    {
      id: "4",
      title: "Afkomen wanneer geroepen",
      description: "Oefen het 'hier' commando in veilige omgeving",
      completed: false
    },
    {
      id: "5",
      title: "Rustig blijven bij bezoekers",
      description: "Oefen kalm gedrag wanneer er mensen aan de deur komen",
      completed: false
    }
  ]);

  const [stats, setStats] = useState<TrainingStats>({
    currentStreak: 3,
    completedToday: 0,
    totalItems: 5,
    completionRate: 0
  });

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const resetDaily = () => {
    setItems(prev => prev.map(item => ({ ...item, completed: false })));
  };

  // Update stats when items change
  useEffect(() => {
    const completedCount = items.filter(item => item.completed).length;
    const completionRate = (completedCount / items.length) * 100;
    
    setStats(prev => ({
      ...prev,
      completedToday: completedCount,
      totalItems: items.length,
      completionRate
    }));
  }, [items]);

  return {
    items,
    stats,
    toggleItem,
    resetDaily
  };
};