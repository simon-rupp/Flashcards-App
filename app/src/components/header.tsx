import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex justify-center gap-3 p-4 border-b-2 border-slate-400">
      <Button variant={"link"}>Decks</Button>
      <Button variant={"link"} disabled={true}>
        Cards
      </Button>
    </div>
  );
};

export default Header;
