import { Card as CardType } from "../../lib/types";
import CardActions from "./card-actions";
import { useState } from "react";

const Card = ({ card }: { card: CardType }) => {
    const { id, front, back } = card;

    const [isFlipped, setIsFlipped] = useState(false);
  
   const handleClick = () => {
        setIsFlipped(!isFlipped);
   }
  
    return (

    <div className={`border-b border-slate-400 flex justify-center items-center pb-5 pt-5`} 
    onClick={handleClick}
    style={{
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.5s',
    }}>
      <div className="h-56 w-96 relative">
        
        <div className="absolute w-full h-full bg-white rounded-lg drop-shadow-lg z-30 flex p-4 justify-center items-center border-black border-2"
        style={{
            filter: isFlipped ? "invert(100%)" : "invert(0%)",
        }}>
            <div className="absolute top-0 right-0 p-2">
              <CardActions cardId={id} front={front} back={back} />
            </div>
              <p className="font-bold"
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                textAlign: "center",

              }}>{isFlipped ? back : front}</p>      
        </div>
        </div>
    </div>
    )
};

export default Card;