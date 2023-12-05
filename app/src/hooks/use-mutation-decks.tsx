import { createDeck, deleteDeck, updateDeck } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationDecks() {
  const { toast } = useToast();
  const removeDeck = useStore((state) => state.removeDeck);
  const addDeck = useStore((state) => state.addDeck);
  const editDeck = useStore((state) => state.editDeck);

  const deleteDeckById = async (deckId: string) => {
    try {
      await deleteDeck(deckId);
      removeDeck(deckId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the deck",
        description:
          (error as Error).message ||
          "There was an error deleting the deck. Please try again later.",
      });
    }
  };

  const addNewDeck = async (title: string) => {
    try {
      const newDeck = await createDeck(title);
      addDeck(newDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the deck",
        description:
          (error as Error).message ||
          "There was an error creating the deck. Please try again later.",
      });
    }
  };

  const editTitleOfDeck = async (deckId: string, title: string) => {
    try {
      const newDeck = await updateDeck(deckId, title);
      editDeck(deckId, newDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit the deck",
        description:
          (error as Error).message ||
          "There was an error editing the deck. Please try again later.",
      });
    }
  };

  return { deleteDeckById, addNewDeck, editTitleOfDeck };
}

export default useMutationDecks;
