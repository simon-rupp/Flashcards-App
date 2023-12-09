import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { DotsVerticalIcon } from "@radix-ui/react-icons";
  import useMutationCards from "@/hooks/use-mutations-cards";
  import EditCardDialog from "./edit-card-dialog";
  import { useState } from "react";
  
  // Allows user to delete or edit a deck
  const CardActions = ({ cardId, front, back }: { cardId: string; front: string, back: string }) => {
    const { deleteCardById } = useMutationCards();
  
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
            onClick={() => deleteCardById(cardId)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
        <EditCardDialog
          prevFront={front}
          prevBack={back}
          cardId={cardId}
          whenOpen={isEditDialogOpen}
          onClose={changeEditDialog}
        />
      </DropdownMenu>
    );
  };
  
  export default CardActions;
  