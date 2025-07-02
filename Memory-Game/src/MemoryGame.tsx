import { useEffect, useState } from "react";
import _ from "lodash";
import "./MemoryGame.css";

interface Props {
  image: string[];
}

type Card = {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
};

function MemoryGame({ image }: Props) {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const images = [...image, ...image];
    const shuffled = _.shuffle(images);

    const iniCards = shuffled.map((pic, index) => ({
      id: index,
      image: pic,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(iniCards);
  }, [image]);

  const handleClick = (index: number) => {
    const clickedCard = cards[index];

    if (clickedCard.isFlipped || clickedCard.isMatched || flipped.length === 2)
      return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [id1, id2] = newFlipped;
      const flippedCard1 = newCards[id1];
      const flippedCard2 = newCards[id2];

      if (flippedCard1.image === flippedCard2.image) {
        flippedCard1.isMatched = true;
        flippedCard2.isMatched = true;

        setCards([...newCards]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          newCards[id1].isFlipped = false;
          newCards[id2].isFlipped = false;
          setCards([...newCards]);
          setFlipped([]);
        }, 1000);
      }
    }
  };
  return (
    <div className="memory-game">
      {cards.map((card, index) => (
        <div
          key={card.id}
          onClick={() => handleClick(index)}
          className="memory-card"
          style={
            card.isFlipped || card.isMatched
              ? { backgroundImage: `url(${card.image})` }
              : {}
          }
        ></div>
      ))}
    </div>
  );
}

export default MemoryGame;
