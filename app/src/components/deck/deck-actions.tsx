import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks";
import EditDeckDialog from "./edit-deck-dialog";
import { useState } from "react";

// Allows user to delete or edit a deck
const DeckActions = ({ deckId, title }: { deckId: string; title: string }) => {
  const { deleteDeckById } = useMutationDecks();

  // state for whether the edit dialog is open or not
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // can switch between open and closed
  const changeEditDialog = () => {
    setIsEditDialogOpen(!isEditDialogOpen);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <DotsVerticalIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={changeEditDialog}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => deleteDeckById(deckId)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      <EditDeckDialog
        prevTitle={title}
        deckId={deckId}
        whenOpen={isEditDialogOpen}
        onClose={changeEditDialog}
      />
    </DropdownMenu>
  );
};

export default DeckActions;
