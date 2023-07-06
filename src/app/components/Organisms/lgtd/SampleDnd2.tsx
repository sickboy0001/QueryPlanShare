import React, { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Sample2Draggable } from "./Sample2Draggable";
import { Sample2Droppable } from "./Sample2Droppable";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";
import { getAllPorjects, getProjectTasks } from "@/app/bizlogic/lgtd";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

export default function SampleDnd2() {
  const draggableContents = ["Drag-Me-A", "Drag-Me-B", "Drag-Me-C"];
  const parentContainers = ["1", "2", "3", "5", "6", "7"];
  const [parent, setParent] = useState(null);

  const [userId, setUserId] = useState("");
  const [thisProjectId, setThisProjectId] = useState(-1);
  const [projects, setProjects] = useState<typeproject[]>([]);
  const [tasks, setTasks] = useState<typetask[]>([]);
  const [selectedProject, setSelectedProject] = useState<
    typeproject | undefined
  >(undefined);

  useEffect(() => {
    const getpProjects = async () => {
      const this_userid = "";
      // user.id
      //   ? user.id
      //   : guest_user_id
      //   ? guest_user_id
      //   : ""; //guest_user_id === undefined ? "" : guest_user_id;
      const newsetProjects: typeproject[] = await getAllPorjects(this_userid);
      setUserId(this_userid);
      setProjects(newsetProjects);

      if (thisProjectId < 0) {
        // setThisProjectId(2);
        setThisProjectId(newsetProjects[0].id);
        // console.log(`thisprojectid = ${newsetProjects[0].id}`);
        // console.log(newsetProjects);
      }
    };
    getpProjects();
  }, [userId]);

  useEffect(() => {
    const setThisTasks = async () => {
      const this_userid = "";
      // user.id
      //   ? user.id
      //   : guest_user_id
      //   ? guest_user_id
      //   : ""; //guest_user_id === undefined ? "" : guest_user_id;
      if (thisProjectId >= 0) {
        const newTasks: typetask[] = await getProjectTasks(
          this_userid,
          thisProjectId
        );
        setTasks(newTasks);

        const thisproject = projects.filter(
          (project) => project.id === thisProjectId
        )[0];
        setSelectedProject(thisproject);
      }
    };
    setThisTasks();
  }, [thisProjectId]);

  function handleDragEnd(event: { over: any; active: any }) {
    const { over, active } = event;
    console.log(over, active);
    // if (active.id !== over.id) {
    //   setProjects((preProjects: any) => {
    //     //順番の入手：連想配列内の特定の項目が対象の場合はfindIndexを利用する。
    //     const activeIndex = preProjects.findIndex(
    //       ({ id }: typeproject) => id === active.id
    //     );
    //     const overindex = preProjects.findIndex(
    //       ({ id }: typeproject) => id === over.id
    //     );
    //     //配列の移動　activeIndex　移動元番号, overindex　移動先番号
    //     return arrayMove(preProjects, activeIndex, overindex);
    //   });
    // }
  }
  return (
    <div className="flex">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="p-1 border-2 rounded">
          <div className="font-extrabold ">parentContainers</div>
          <SortableContext items={projects} strategy={rectSortingStrategy}>
            {projects.map((project) => (
              <div>
                <Sample2Draggable id={project.id}>
                  <Sample2Droppable id={project.id}>
                    {project.title}
                  </Sample2Droppable>
                </Sample2Draggable>
              </div>
            ))}
          </SortableContext>
        </div>
        <div className="p-1 border-2 rounded">
          <div className="font-extrabold">Containers</div>
          <SortableContext items={tasks} strategy={rectSortingStrategy}>
            {tasks.map((task) => (
              <div>
                <Sample2Draggable id={task.id}>{task.title}</Sample2Draggable>
              </div>
            ))}
          </SortableContext>
        </div>
        <div className="p-1 border-2 rounded">
          <div className="font-extrabold">Containers</div>
        </div>
      </DndContext>
    </div>
  );
}
