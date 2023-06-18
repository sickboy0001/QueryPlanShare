import React, { Dispatch, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";
import SubTitle from "@/app/components/Atoms/Lable/Title";
import LabelItemName from "../../Atoms/Lable/LabelItemName";

type Props = {
  selectedProject: typeproject | undefined;
  projects: typeproject[];
  tasks: typetask[];
  setTasks: Dispatch<any>;
};

export default function SoratableTasks(props: Props) {
  const { selectedProject, projects, tasks, setTasks } = props;

  function handleDragEnd(event: any) {
    const { active, over } = event;

    console.log(
      `tasks drag and called active.id ${active.id} over.id ${over.id}`
    ); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
    if (active.id !== over.id) {
      setTasks((pretasks: any) => {
        // console.log(`pretasks`);
        // console.log({ pretasks });
        // const activeIndex = pretasks.indexOf(active.id);
        // const overIndex = pretasks.indexOf(over.id);

        //順番の入手：連想配列内の特定の項目が対象の場合はfindIndexを利用する。
        const activeIndex = pretasks.findIndex(
          ({ id }: typetask) => id === active.id
        );
        const overindex = pretasks.findIndex(
          ({ id }: typetask) => id === over.id
        );
        // console.log(`thisactiveIndex:${activeIndex}`);
        // console.log(`thisoverindex:${overindex}`);
        // console.log(arrayMove(pretasks, activeIndex, overindex));

        //配列の移動　activeIndex　移動元番号, overindex　移動先番号
        return arrayMove(pretasks, activeIndex, overindex);
      });
    }
  }

  // console.log(selectedProject);
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      // modifiers={[restrictToVerticalAxis]}
    >
      {selectedProject !== undefined ? (
        <div>
          <LabelItemName>
            {selectedProject.title} [{selectedProject.id.toString()}]
          </LabelItemName>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col w-full ">
        <div className="text-lg font-extrabold text-center">
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <SortableTask key={task.id} task={task} projects={projects} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
