// Deck type
export type Deck = {
  id: string;
  title: string;
  image?: string;
  numberOfCards: number;
};

export type User = {
  id: number;
  username: string;
  displayName: string;
  avatar?: string;
};

export type Card = {
  id: string;
  front: string;
  back: string;
  deckId: string;
};

export type DeckWithUserData = Deck & { user: User };
