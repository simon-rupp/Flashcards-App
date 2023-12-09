import Aside from "@/components/aside";
import Cards from "@/components/card/cards";
import Deck from "@/components/deck/deck";
import Sidebar from "@/components/sidebar";
import useQueryDecks from "@/hooks/use-query-decks";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DeckView = () => {
    const {deckId} = useParams()
  const { deck, loadDeck } = useQueryDecks();
  const selectedDeckId = useStore((state) => state.selectedDeckId);

  useEffect(() => {
    if (deckId) {
        loadDeck(deckId);
    }
  }, [deckId]);
  
  return (
    <>
      <Sidebar />
      <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-xl">
        {deck && selectedDeckId && <Cards />}
      </div>
      <Aside />
    </>
  );
};

export default DeckView;
