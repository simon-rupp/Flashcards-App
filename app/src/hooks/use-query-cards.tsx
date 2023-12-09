import { useToast } from "@/components/ui/use-toast";
import { fetchCards } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function useQuerycards() {
  const { toast } = useToast();
  const cards = useStore((state) => state.cards);
  const setcards = useStore((state) => state.setCards);
  const clearcards = useStore((state) => state.clearCards);
  const selectedDeckId = useStore((state) => state.selectedDeckId);

  const loadcards = async () => {
    try {
      const fetchedcards = await fetchCards(selectedDeckId as string);
      setcards(fetchedcards);
    } catch (error) {
            clearcards();
      toast({
        variant: "destructive",
        title: "Failed to fetch cards",
        description:
          (error as Error).message ||
          "There was an error loading the cards. Please try again later.",
      });
    }
  };

    useEffect(() => {
    if (selectedDeckId) {
      loadcards();
    } else {
      clearcards();
    }
  }, [selectedDeckId]);

  return { cards };
}

export default useQuerycards;
