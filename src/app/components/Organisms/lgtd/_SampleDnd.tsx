import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import SampleScrollableList from "./_SampleScrollableList";
import SampleDraggable from "./_SampleDraggable";
// import SampleItem from "./_SampleItem";

/* The implementation details of <Item> and <ScrollableList> are not
 * relevant for this example and are therefore omitted. */

function SampleDnd() {
  const [items] = useState(["1", "2", "3", "4", "5"]);
  const [activeId, setActiveId] = useState(null);

  // console.log(items);

  function Droppable() {
    const { setNodeRef } = useDroppable({
      id: "droppable",
      data: {
        accepts: ["type1", "type2"],
      },
    });

    /* ... */
  }

  function Draggable() {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: "draggable",
      data: {
        type: "type1",
      },
    });

    /* ... */
  }

  return (
    <div className="flex">
      <div>drag</div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SampleScrollableList>
          {/* {items.map((id) => (
            <SampleDraggable key={id} id={id}>
              <SampleItem>Item{id}</SampleItem>
            </SampleDraggable>
          ))} */}
        </SampleScrollableList>

        <DragOverlay>
          {/* {activeId ? <SampleItem>Item{activeId}</SampleItem> : null} */}
        </DragOverlay>
      </DndContext>
      <div>drop</div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SampleScrollableList>
          {items.map((id) => (
            <SampleDraggable key={id} id={id}>
              {/* <SampleItem>dropItem{id}</SampleItem> */}
            </SampleDraggable>
          ))}
        </SampleScrollableList>

        <DragOverlay>
          {/* {activeId ? <SampleItem>drop{activeId}</SampleItem> : null} */}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function handleDragStart(event: any) {
    // console.log(event.avtive.id);s
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    console.log(event);
    console.log(`dragid:${activeId} dropid:${active.id}`);
    setActiveId(null);
    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      console.log(over.id);
    }
  }
}

export default SampleDnd;
