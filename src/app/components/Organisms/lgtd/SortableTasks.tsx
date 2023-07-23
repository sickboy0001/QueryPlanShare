import React, { Dispatch } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";
import LabelItemName from "../../Atoms/Lable/LabelItemName";
import { ThisTask } from "./_ThisTask";

type Props = {
  selectedProject: typeproject | undefined;
  projects: typeproject[];
  tasks: typetask[];
  setTasks: Dispatch<any>;
  setThisProjectId: Dispatch<any>;
};

export default function SoratableTasks(props: Props) {
  const { selectedProject, projects, tasks, setTasks, setThisProjectId } =
    props;

  // console.log(selectedProject);
  return (
    // <DndContext onDragEnd={handleDragEndTask}>
    <div>
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
          <SortableContext items={tasks}>
            {/* strategy={rectSortingStrategy} */}
            {tasks.map((task) => (
              <ThisTask
                key={task.id}
                task={task}
                setTasks={setTasks}
                projects={projects}
                setThisProjectId={setThisProjectId}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
    // </DndContext>
  );
}
