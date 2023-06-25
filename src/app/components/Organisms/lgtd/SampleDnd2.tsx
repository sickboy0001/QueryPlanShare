import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Sample2Draggable } from "./Sample2Draggable";
import { Sample2Droppable } from "./Sample2Droppable";

function SampleDnd2() {
  const draggableContents = ["Drag-Me-A", "Drag-Me-B", "Drag-Me-C"];
  const parentContainers = ["1", "2", "3", "5", "6", "7"];
  const [parent, setParent] = useState(null);

  function handleDragEnd(event: { over: any; active: any }) {
    const { over, active } = event;
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    console.log("over");
    console.log(over);
    console.log("active");
    console.log(active);
  }

  return (
    <div className="flex">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="p-1 border-2 rounded">
          <div className="font-extrabold ">parentContainers</div>
          {parentContainers.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <div key={id}>
              <Sample2Droppable id={id}>Drop here {id}</Sample2Droppable>
            </div>
          ))}
        </div>
        <div className="p-1 border-2 rounded">
          <div className="font-extrabold">Containers</div>
          {draggableContents.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <div key={id}>
              <Sample2Draggable id={id}>{id}</Sample2Draggable>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default SampleDnd2;
