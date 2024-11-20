import { Card as CardT } from "@/App";
import { useInfoDispatch } from "@/store/Hooks";
import { toogleActive } from "@/store/card-slice";
import { deleteCard } from "@/store/card-actions";
import { getCards } from "@/store/card-actions";

type CardProp = {
  card: CardT;
};

const Card = ({ card }: CardProp) => {
  const dispatch = useInfoDispatch();

  const handleOnClick = (id: number) => {
    dispatch(toogleActive(id));
  };

  const onDelete = (id: number) => {
    const cardObj = {
      id: id,
      onAfterDelete: () => {
        dispatch(getCards());
      },
    };

    dispatch(deleteCard(cardObj));
  };

  return (
    <article className={card.active ? "active" : ""}>
      <div onClick={() => handleOnClick(card.id)}>
        {!card.active && <p>{card.front}</p>}
        {card.active && <p>{card.back}</p>}
      </div>
      <button onClick={() => onDelete(card.id)}>Delete</button>
    </article>
  );
};

export default Card;
