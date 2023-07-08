import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    // backgroundColor: isOver ? "#87CEEB" : undefined,
    border: isOver ? "solid 1px " : undefined,
    borderRadius: "10px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
