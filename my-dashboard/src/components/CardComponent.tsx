// Card.tsx
import { cardType } from "../constants";
import { CardTypeKey } from "../types";
import "./CardComponent.css";

function Card({
  cardKey,
  total,
  onClick,
}: {
  cardKey: CardTypeKey;
  total: number;
  onClick: (cardKey: CardTypeKey) => void;
}) {
  return (
    <div key={cardKey} onClick={() => onClick(cardKey)}>
      <h3>{cardType[cardKey]}</h3>
      <h2>{total}</h2>
    </div>
  );
}

export default Card;
