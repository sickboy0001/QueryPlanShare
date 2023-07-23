import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function ThisTaskToProject(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  // const style = transform
  //   ? {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //     }
  //   : undefined;

  return (
    <div className="flex-none ">
      <button ref={setNodeRef} {...listeners} {...attributes}>
        {props.children}
      </button>
    </div>
  );
}
