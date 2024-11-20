import { useEffect } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/Hooks";
import { getCards } from "@/store/card-actions";
import CardList from "@/components/CardList";
import NewCard from "@/components/NewCard";

const HomePage = () => {
  const dispatch = useInfoDispatch();
  const cards = useInfoSelector((state) => state.cards.info);

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  return (
    <>
      <div className="new-card">
        <NewCard />
      </div>
      <div>
        <CardList cards={cards} />
      </div>
    </>
  );
};

export default HomePage;
