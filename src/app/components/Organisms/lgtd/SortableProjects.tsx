import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { typeproject } from "@/app/model/lgtd/projects.type";
import { SortableProject } from "./SortableProject";

type Props = {
  projects: typeproject[];
};

export default function SortableProjects(props: Props) {
  const [projects, setProjects] = useState(props.projects);

  function handleDragEnd(event: any) {
    // console.log("drag and called");// console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
    const { active, over } = event;

    if (active.id !== over.id) {
      setProjects((preProjects: any) => {
        // console.log(`pretasks`);
        // console.log({ pretasks });
        // const activeIndex = pretasks.indexOf(active.id);
        // const overIndex = pretasks.indexOf(over.id);

        //順番の入手：連想配列内の特定の項目が対象の場合はfindIndexを利用する。
        const activeIndex = preProjects.findIndex(
          ({ id }: typeproject) => id === active.id
        );
        const overindex = preProjects.findIndex(
          ({ id }: typeproject) => id === over.id
        );
        // console.log(`thisactiveIndex:${activeIndex}`);
        // console.log(`thisoverindex:${overindex}`);
        // console.log(arrayMove(pretasks, activeIndex, overindex));
        //配列の移動　activeIndex　移動元番号, overindex　移動先番号
        return arrayMove(preProjects, activeIndex, overindex);
      });
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col w-full ">
        <div className="text-lg font-extrabold text-center">
          <SortableContext
            items={projects}
            strategy={verticalListSortingStrategy}
          >
            {projects.map((task: { id: number }) => (
              <SortableProject key={task.id} project={task} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
