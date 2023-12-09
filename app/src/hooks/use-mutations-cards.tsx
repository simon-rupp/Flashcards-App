import { createCard } from "@/lib/api";
import { deleteCard } from "@/lib/api";
import { updateCard } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationcards() {
  const { toast } = useToast();
  const addcard = useStore((state) => state.addCard);
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const removeCard = useStore((state) => state.removeCard);
    const editCard = useStore((state) => state.editCard);


  const deleteCardById = async (cardId: string) => {
    try {
      await deleteCard(selectedDeckId as string, cardId);
      removeCard(cardId);
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

  const addNewcard = async (front: string, back: string) => {
    try {
      const newcard = await createCard(selectedDeckId as string, front, back);
      addcard(newcard);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the card",
        description:
          (error as Error).message ||
          "There was an error creating the card. Please try again later.",
      });
    }
  };

  const modifyCard = async (cardId: string, front: string, back: string) => {
    try {
      const newCard = await updateCard(selectedDeckId as string, cardId, front, back);
      editCard(cardId, newCard);
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

  return { addNewcard, deleteCardById, modifyCard };
}

export default useMutationcards;
