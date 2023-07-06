import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

function ParentComponent() {
  const [parentItems, setParentItems] = useState([
    "Parent Item 1",
    "Parent Item 2",
  ]);
  const [childItems, setChildItems] = useState([]);

  return (
    <div style={{ display: "flex" }}>
      <ParentPane
        items={parentItems}
        onDrop={(item) => handleParentDrop(item, setParentItems)}
      />
      <ChildPane
        items={childItems}
        onDrop={(item) => handleChildDrop(item, setChildItems)}
      />
    </div>
  );
}

function ParentPane({ items, onDrop }) {
  return (
    <div>
      <h2>Parent</h2>
      <DndContext
        sensors={useSensors(useSensor(MouseSensor))}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <ul>
            {items.map((item) => (
              <SortableItem key={item} id={item}>
                {item}
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function ChildPane({ items, onDrop }) {
  return (
    <div>
      <h2>Child</h2>
      <DndContext
        sensors={useSensors(useSensor(MouseSensor))}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <ul>
            {items.map((item) => (
              <SortableItem key={item} id={item}>
                {item}
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableItem({ id, children }) {
  const { isDragging, listeners, setNodeRef } = useSortable({
    id,
  });

  const style = {
    backgroundColor: isDragging ? "lightblue" : "transparent",
    cursor: "grab",
  };

  return (
    <li ref={setNodeRef} {...listeners} style={style}>
      {children}
    </li>
  );
}

function handleDragEnd(event) {
  // Handle logic when an item is dropped
  console.log("Item dropped:", event);
}

function handleParentDrop(item, setParentItems) {
  setParentItems((prevItems) => [...prevItems, item]);
}

function handleChildDrop(item, setChildItems) {
  setChildItems((prevItems) => [...prevItems, item]);
}

export default ParentComponent;
