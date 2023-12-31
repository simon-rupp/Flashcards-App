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
import useMutationcards from "@/hooks/use-mutations-cards";
import { Textarea } from "@/components/ui/textarea";

// Dialog pop up when user wants to edit a deck - allows user to update the title of the deck
const EditCardDialog = ({
  prevFront,
  prevBack,
  cardId,
  whenOpen,
  onClose,
}: {
  prevFront: string;
  prevBack: string;
  cardId: string;
  whenOpen: boolean;
  onClose: () => void;
}) => {
  const [front, setFront] = useState(prevFront);
  const [back, setBack] = useState(prevBack);  
  const { modifyCard } = useMutationcards();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!front || !back) {
      toast({
        variant: "destructive",
        title: "Sorry! front or back cannot be empty!",
        description: `Please enter the front and back for your card.`,
      });
      setFront(prevFront);
      setBack(prevBack);
      return;
    }

    await modifyCard(cardId, front, back);
  };

  const handleCancel = () => {
    setFront(prevFront);
    setBack(prevBack);
    onClose();
  };

  return whenOpen ? (
    <Dialog open={whenOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Card</DialogTitle>
          <DialogDescription>
            Edit your card here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-1">
          <div className="grid items-center grid-cols-4 gap-4">
            <Textarea
              id="front"
              value={front}
              className="col-span-4"
              onChange={(e) => {
                setFront(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid gap-4 py-1">
          <div className="grid items-center grid-cols-4 gap-4">
            <Textarea
              id="back"
              value={back}
              className="col-span-4"
              onChange={(e) => {
                setBack(e.target.value);
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

export default EditCardDialog;
