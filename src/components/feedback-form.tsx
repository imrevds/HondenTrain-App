import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Send } from "lucide-react";

export const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Vul je feedback in",
        description: "Het feedback veld mag niet leeg zijn.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Bedankt voor je feedback! 🐕",
        description: "We waarderen je input en zullen ernaar kijken.",
      });
      
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Deel je Feedback
        </h2>
        <p className="text-muted-foreground">
          Vertel ons hoe we de app kunnen verbeteren voor jou en je hond
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Stuur ons een bericht</CardTitle>
          <CardDescription>
            We lezen elke feedback en gebruiken het om de app te verbeteren
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Naam (optioneel)</Label>
              <Input
                id="name"
                placeholder="Je naam"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (optioneel)</Label>
              <Input
                id="email"
                type="email"
                placeholder="je@email.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Jouw Feedback *</Label>
              <Textarea
                id="message"
                placeholder="Vertel ons wat je denkt over de app, wat beter kan, of wat je graag zou willen zien..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Verzenden..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Verstuur Feedback
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
