import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";

export function Sample2Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  const onSelectProject = (id: number) => {
    props.setThisProjectId(id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onSelectProject(props.id)}
    >
      {props.children}
    </div>
  );
}
