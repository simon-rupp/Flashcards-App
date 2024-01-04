import type { Card, Deck, DeckWithUserData, User } from "./types";
import {
  getAuthenticatedUser,
  getAuthenticatedUserToken,
  storeAuthenticatedUserToken,
  removeAuthenticatedUserToken,
} from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

const handleError = (response: Response, message?: string) => {
  if (response.status === 401) {
    removeAuthenticatedUserToken();
    throw new Error("Your session has expired. Please login again.");
  }

  throw new Error(
    `Error: ${response.status} - ${message || response.statusText}`,
  );
};

// Register a new user
export const register = async (
  username: string,
  password: string,
  displayName: string,
  avatar?: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, displayName, avatar }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

// Login, store the token, and return the user
export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  const { access_token } = responseJson.data;

  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();
  return user;
};

// Logout and clear the token
export const logout = async (): Promise<void> => {
  removeAuthenticatedUserToken();
};

// Fetch all decks
export const fetchDecks = async (): Promise<DeckWithUserData[]> => {
  const response = await fetch(`${API_URL}/decks?withUserData=true`, {
    headers: {
      Authorization: `Bearer ${getAuthenticatedUserToken()}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

// Delete deck by id
export const deleteDeck = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

// Create new deck
export const createDeck = async (title: string): Promise<Deck> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return {
    ...responseJson.data,
    user: user,
  };
};

// Update title of deck by id
export const updateDeck = async (id: string, title: string): Promise<Deck> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

// Fetch all cards for a deck
export const fetchCards = async (deckId: string): Promise<Card[]> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(
    `${API_URL}/decks/${deckId}/cards`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

// Create a new card
export const createCard = async (
  deckId: string,
  front: string,
  back: string,
): Promise<Card> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ front, back }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return {
    ...responseJson.data,
    user,
  };
};

export const fetchDeckById = async (id: string): Promise<Deck> => {
  const response = await fetch(`${API_URL}/decks/${id}?withUserData=true`, {
    headers: {
      Authorization: `Bearer ${getAuthenticatedUserToken()}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
}

export const deleteCard = async (deckId: string, cardId: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

// update card
export const updateCard = async (deckId: string, cardId: string, front: string, back: string): Promise<Card> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ front, back }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};
