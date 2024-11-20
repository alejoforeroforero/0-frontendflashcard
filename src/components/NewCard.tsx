import { useRef, type FormEvent } from "react";
import { useInfoDispatch } from "@/store/Hooks";
import { createCard } from "@/store/card-actions";
import { getCards } from "@/store/card-actions";

const NewCard = () => {
  const dispatch = useInfoDispatch();
  const front = useRef<HTMLInputElement>(null);
  const back = useRef<HTMLInputElement>(null);

  const handleOnSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const frontValue = front.current!.value;
    const backValue = back.current!.value;

    if (frontValue !== "" && backValue !== "") {
      const cardObj = {
        'card': {
          front: frontValue,
          back: backValue,
        },
        'onAfterCreate':()=>{
            dispatch(getCards());
        }
      };

      dispatch(createCard(cardObj));

      e.currentTarget.reset();
    } else {
      alert("entra algo");
    }
  };

  return (
    <form onSubmit={handleOnSave}>
      <p>
        <label htmlFor="front">Front</label>
        <input id="front" type="text" ref={front} />
      </p>
      <p>
        <label htmlFor="back">Back</label>
        <input id="back" type="text" ref={back} />
      </p>
      <button>Save</button>
    </form>
  );
};

export default NewCard;
