import React, { Dispatch } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
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

  // console.log("props.projects");
  // console.log(props.projects);
  // console.log("projects");
  // console.log(projects);

  function handleDragEnd(event: any) {
    console.log("SortableProjects-drag and called"); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
    const { active, over } = event;

    if (active.id !== over.id) {
      setProjects((preProjects: any[]) => {
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
    </DndContext>
  );
}
