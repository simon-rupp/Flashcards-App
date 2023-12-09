import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex justify-center gap-3 p-4 border-b-2 border-slate-400">
      <Button variant={"link"} disabled={location.pathname == "/" ? false : true}>Decks</Button>
      <Button variant={"link"} disabled={location.pathname == "/" ? true : false}>
        Cards
      </Button>
    </div>
  );
};

export default Header;
