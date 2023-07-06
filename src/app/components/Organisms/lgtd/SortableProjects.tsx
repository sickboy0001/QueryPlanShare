import React, { Dispatch } from "react";
import { DndContext, closestCenter, closestCorners } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { typeproject } from "@/app/model/lgtd/projects.type";
import { ThisProject } from "./ThisProject";

type Props = {
  projects: typeproject[];
  setProjects: Dispatch<any>;
  thisProjectId: number;
  setThisProjectId: Dispatch<any>;
};

export default function SortableProjects(props: Props) {
  const { projects, setProjects, thisProjectId, setThisProjectId } = props;

  function handleDragEnd(event: any) {
    console.log("SortableProjects-drag and called"); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
    const { active, over } = event;
    // console.log(over); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);

    if (active != null && over != null && active.id !== over.id) {
      setProjects((preProjects: any[]) => {
        //順番の入手：連想配列内の特定の項目が対象の場合はfindIndexを利用する。
        const activeIndex = preProjects.findIndex(
          ({ id }: typeproject) => id === active.id
        );
        const overindex = preProjects.findIndex(
          ({ id }: typeproject) => id === over.id
        );
        return arrayMove(preProjects, activeIndex, overindex);
      });
    }
  }

  return (
    <div className="flex flex-col w-full ">
      <div className="text-lg font-extrabold text-center">
        <SortableContext items={projects}>
          {projects.map((project) => (
            <ThisProject
              key={project.id}
              project={project}
              thisProjectId={thisProjectId}
              setThisProjectId={setThisProjectId}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
