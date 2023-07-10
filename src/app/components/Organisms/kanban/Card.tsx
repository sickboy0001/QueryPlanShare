import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
export type CardType = {
  id: string;
  title: string;
};
const Card: FC<CardType> = React.memo(({ id, title }) => {
  // メモ化された(Card)コンポーネントを作成する
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  });

  const style = {
    margin: "10px",
    opacity: 1,
    color: "#333",
    background: "white",
    padding: "10px",
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div key={id} ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div id={id}>
        <p>{title}</p>
      </div>
    </div>
  );
});

export default Card;