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
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useStore } from "@/lib/store";
import useMutationcards from "@/hooks/use-mutations-cards";

// Allow user to create a new deck with chosen title
const AddCardDialog = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { addNewcard } = useMutationcards();
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    // error handling with toast
    if (!front || !back) {
      toast({
        variant: "destructive",
        title: "Sorry! front or back cannot be empty!",
        description: `Please enter the front and back for your card.`,
      });
      return;
    }

    await addNewcard(front, back);
    setFront("");
    setBack("");
  };

  const handleCancel = () => {
    setFront("");
    setBack("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Make a Post"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>
            {" "}
            {user
              ? "Give a front and back to your card here."
              : "Please login to create a deck/card"}{" "}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="title" className="text-right">
                Front
              </Label>
              <Input
                id="front"
                value={front}
                className="col-span-3"
                onChange={(e) => {
                  setFront(e.target.value);
                }}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="title" className="text-right">
                Back
              </Label>
              <Input
                id="back"
                value={back}
                className="col-span-3"
                onChange={(e) => {
                  setBack(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardDialog;
