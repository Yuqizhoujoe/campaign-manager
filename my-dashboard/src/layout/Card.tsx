import "./Card.css";

// types
import { CardTypeKey, CardData } from "../types";

import Card from "../components/CardComponent";
/*
    a list of Title and Total
    Revenue 
    total 
*/
function CardContainer({
  data,
  onSelect,
}: {
  data: CardData | null;
  onSelect: (cardType: CardTypeKey) => void;
}) {
  const renderCards = () => {
    if (!data) return null;
    return (
      <div className="cards">
        {Object.entries(data).map(([key, value]) => {
          return (
            <div className="card" key={key}>
              <Card
                total={value}
                cardKey={key as CardTypeKey}
                onClick={() => onSelect(key as CardTypeKey)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return <div className="card-container">{renderCards()}</div>;
}

export default CardContainer;
