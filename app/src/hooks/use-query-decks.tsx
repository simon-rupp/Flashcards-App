import { fetchDecks } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getAuthenticatedUser } from "@/lib/auth";

function useQueryDeck() {
  const { toast } = useToast();
  const decks = useStore((state) => state.decks);
  const setDecks = useStore((state) => state.setDecks);

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

  useEffect(() => {
    loadDecks();
  }, []);

  return {
    decks,
  };
}

export default useQueryDeck;
