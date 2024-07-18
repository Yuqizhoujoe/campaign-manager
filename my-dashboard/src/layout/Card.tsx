import "./Card.css";

// types
import { CardTypeKey } from "../types";

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
  data: { [key in CardTypeKey]: number };
  onSelect: (cardType: CardTypeKey) => void;
}) {
  const renderCards = () => {
    return (
      <div className="cards">
        {Object.keys(data).map((key) => {
          return (
            <div className="card" key={key}>
              <Card
                total={data[key as CardTypeKey]}
                cardKey={key as CardTypeKey}
                onClick={onSelect}
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
