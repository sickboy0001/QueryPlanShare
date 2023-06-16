import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SampleSortableItem";
export default function SampleDnd2() {
  const containers = ["Java", "Python", "TypeScript"];

  const [languages, setLanguages] = useState(containers);

  function handleDragEnd(event: any) {
    console.log("drag and called");
    const { active, over } = event;
    console.log(`active:${active.id}`);
    console.log(`over:${over.id}`);

    if (active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);

        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col w-full ">
        <div className="text-lg font-extrabold text-center">
          <h1> bets programing languages!</h1>
          <SortableContext
            items={languages}
            strategy={verticalListSortingStrategy}
          >
            {languages.map((language) => (
              <SortableItem key={language} id={language} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
