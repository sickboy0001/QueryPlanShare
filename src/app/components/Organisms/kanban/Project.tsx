import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { typetask } from "@/app/model/lgtd/projects.type";
import Task from "./Task";

export type ProjectType = {
  id: string;
  title: string;
  tasks: typetask[];
};

const Project: FC<ProjectType> = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    // ソートを行うためのContextです。
    // strategyは4つほど存在しますが、今回は縦・横移動可能なリストを作るためrectSortingStrategyを採用
    <SortableContext id={id} items={tasks} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        style={{
          width: "200px",
          background: "rgba(245,247,249,1.00)",
          marginRight: "10px",
        }}
      >
        <p
          style={{
            padding: "5px 20px",
            textAlign: "left",
            fontWeight: "500",
            color: "#575757",
          }}
        >
          {title}
        </p>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id.toString()} title={task.title}></Task>
        ))}
      </div>
    </SortableContext>
  );
};

export default Project;
