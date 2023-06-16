import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";
import { typetask } from "@/app/model/lgtd/projects.type";

type Props = {
  tasks: typetask[];
};
export default function SoratableTasks(props: Props) {
  // const {tasks}=props;

  const containers = ["Java", "Python", "TypeScript"];
  const [tasks, setTasks] = useState(props.tasks);

  function handleDragEnd(event: any) {
    // console.log("drag and called");// console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
    const { active, over } = event;

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

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col w-full ">
        <div className="text-lg font-extrabold text-center">
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
