import type { Deck } from "@/lib/types";
import DeckActions from "./deck-actions";

// Display a deck with a title and number of cards and allow for deck actions
const Deck = ({ deck }: { deck: Deck }) => {
  const { id, title, numberOfCards } = deck;

  return (
    <div className="border-b border-slate-400 flex justify-center items-center pb-5 pt-5">
      <div className="h-56 w-96 relative">
        <div className="absolute w-full h-full bg-white rounded-lg drop-shadow-lg z-30 flex p-4">
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-bold">{title}</p>
              <p className="text-sm">{numberOfCards} cards</p>
            </div>
            <div className="absolute top-0 right-0 p-2">
              <DeckActions deckId={id} title={title} />
            </div>
          </div>
        </div>
        <div className="absolute w-full h-full bg-white rounded-lg drop-shadow-lg z-20 left-1 top-1"></div>
        <div className="absolute w-full h-full bg-white rounded-lg drop-shadow-lg z-10 left-2 top-2"></div>
      </div>
    </div>
  );
};

export default Deck;
