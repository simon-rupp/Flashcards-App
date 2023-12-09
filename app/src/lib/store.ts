import { Deck, User, Card } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  decks: Deck[];
  user: User | null;
  cards: Card[];
  selectedDeckId: string | null;
};

type Action = {
  setDecks: (decks: Deck[]) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: Deck) => void;
  editDeck: (id: string, deck: Deck) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  setCards: (cards: Card[]) => void;
  removeCard: (id: string) => void;
  addCard: (card: Card) => void;
  editCard: (id: string, card: Card) => void;
  clearCards: () => void;
  setSelectedDeckId: (id: string) => void;
  clearSelectedDeckId: () => void;
};

// define the initial state
const initialState: State = {
  decks: [],
  user: null,
  cards: [],
  selectedDeckId: null,
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setDecks: (decks) => set({ decks }),

    // remove deck by id
    removeDeck: (id) => {
      const newDecks = get().decks.filter((deck) => deck.id !== id);
      set({ decks: newDecks });
    },

    // add deck
    addDeck: (deck) => {
      set({ decks: [deck, ...get().decks] });
    },

    // edit deck by id
    editDeck: (id, deck) => {
      const index = get().decks.findIndex((deck) => deck.id === id);
      const decks = [...get().decks];
      decks[index].title = deck.title;
      set({ decks: decks });
    },

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),

    setCards: (cards) => set({ cards }),

    removeCard: (id) => {
      const newCards = get().cards.filter((card) => card.id !== id);
      set({ cards: newCards });
    },

    addCard: (card) => {
      set({ cards: [card, ...get().cards],
      decks: get().decks.map((deck) => {
        if (deck.id === card.deckId) {
          return {
            ...deck,
            numberOfCards: deck.numberOfCards += 1,
          };
        }
        return deck;
      }
      )});
    },

    editCard: (id, card) => {
      const index = get().cards.findIndex((card) => card.id === id);
      const cards = [...get().cards];
      cards[index].front = card.front;
      cards[index].back = card.back;
      set({ cards: cards });
    },

    clearCards: () => set({ cards: [] }),

    setSelectedDeckId: (id) => set({ selectedDeckId: id }),

    clearSelectedDeckId: () => set({ selectedDeckId: null }),
  })),
);
