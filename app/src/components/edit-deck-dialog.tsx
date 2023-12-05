import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMutationDecks from "@/hooks/use-mutation-decks";

// Dialog pop up when user wants to edit a deck - allows user to update the title of the deck
const EditDeckDialog = ({
  prevTitle,
  deckId,
  whenOpen,
  onClose,
}: {
  prevTitle: string;
  deckId: string;
  whenOpen: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState(prevTitle);
  const { editTitleOfDeck } = useMutationDecks();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "Sorry! Title cannot be empty!",
        description: `Please enter the title for your deck.`,
      });
      return;
    }

    await editTitleOfDeck(deckId, title);
  };

  const handleCancel = () => {
    setTitle(prevTitle);
    onClose();
  };

  return whenOpen ? (
    <Dialog open={whenOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Deck</DialogTitle>
          <DialogDescription>
            Edit the title to your deck here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null;
};

export default EditDeckDialog;
