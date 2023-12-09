import useQueryCards from "@/hooks/use-query-cards";
import Card from "./card";

const Cards = () => {
  const { cards } = useQueryCards();

  if (cards.length === 0) {
    return (
      <div className="p-4 text-center border-b border-slate-400">
        No cards yet.
      </div>
    );
  }

  return (
    <div>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </div>
  );
};

export default Cards;
