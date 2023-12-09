import MainView from "./views/main-view";
import DeckView from "./views/deck-view";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useStore } from "./lib/store";
import {
  getAuthenticatedUserToken,
  isTokenExpired,
  removeAuthenticatedUserToken,
} from "./lib/auth";
import { useToast } from "./components/ui/use-toast";
import { useEffect } from "react";
import ErrorPage from "./views/error-page";

function App() {
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/decks/:deckId",
      element: <DeckView />,
      errorElement: <ErrorPage />,
    }
  ]);

  useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        removeAuthenticatedUserToken();
        clearUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <RouterProvider router={router}/>
      <Toaster />
    </div>
  );
}

export default App;
