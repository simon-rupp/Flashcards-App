import { fetchDecks } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getAuthenticatedUser } from "@/lib/auth";
import { Deck } from "@/lib/types";
import { useState } from "react";
import { fetchDeckById } from "@/lib/api";


function useQueryDecks() {
  const { toast } = useToast();
  const decks = useStore((state) => state.decks);
  const setDecks = useStore((state) => state.setDecks);
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);
  const [deck, setDeck] = useState<Deck | null>(null);

  const loadDecks = async () => {
    try {
      const fetchedDecks = await fetchDecks();

      const user = getAuthenticatedUser();

      // sort decks into those with same user id as authenticated user
      const filteredDecks = fetchedDecks.filter(
        (deck) => deck.user.id === user?.id,
      );

      setDecks(filteredDecks);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch decks",
        description:
          (error as Error).message ||
          "There was an error loading the decks. Please try again later.",
      });
    }
  };

  const loadDeck = async (id: string) => {
    let deck = null;
  
    try {
      deck = await fetchDeckById(id);
      setDeck(deck);
      setSelectedDeckId(id);
  
    } catch (error) {
      setDeck(null);
      clearSelectedDeckId();
      toast({
        variant: "destructive",
        title: "Failed to fetch deck",
        description:
          (error as Error).message ||
          "There was an error loading the deck. Please try again later.",
      });
    }
  };

  useEffect(() => {
    loadDecks();
  }, []);



  return {
    decks,
    deck,
    loadDeck,
  };
}

export default useQueryDecks;
