import { Deck, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  decks: Deck[];
  user: User | null;
};

type Action = {
  setDecks: (decks: Deck[]) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: Deck) => void;
  editDeck: (id: string, deck: Deck) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
};

// define the initial state
const initialState: State = {
  decks: [],
  user: null,
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
  })),
);
