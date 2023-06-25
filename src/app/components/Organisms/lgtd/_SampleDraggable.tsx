import React from "react";
import { useDraggable } from "@dnd-kit/core";

function SampleDraggable(props: any) {
  const Element = props.element || "div";
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <Element ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </Element>
  );
}
export default SampleDraggable;
