"user client";
import React, { useEffect, useState } from "react";
import SortableTasks from "./SortableTasks";
import SortableProjects from "./SortableProjects";
import { DndContext, closestCenter } from "@dnd-kit/core";

import { getAllPorjects, getProjectTasks } from "@/app/bizlogic/lgtd";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";

const ProjectTasks = (props: any) => {
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
        setThisProjectId(2);
        setThisProjectId(newsetProjects[0].id);
        console.log(`thisprojectid = ${newsetProjects[0].id}`);
        console.log(newsetProjects);
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

  function handleDragEnd(event: any) {
    console.log("ProjectTasks_drag and called"); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
    const { active, over } = event;

    if (active.id !== over.id) {
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
    }
  }

  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        // collisionDetection={customCollisionDetectionAlgorithm}
      >
        {/* <div>
          {projects.map((proj, index) => {
            return <div key={index}>{proj.id}</div>;
          })}
        </div> */}
        <div className="grid grid-cols-4">
          <div>
            <SortableProjects
              projects={projects}
              setProjects={setProjects}
              thisProjectId={thisProjectId}
              setThisProjectId={setThisProjectId}
            />
          </div>
          <div className="col-span-3">
            <SortableTasks
              selectedProject={selectedProject}
              projects={projects}
              tasks={tasks}
              setTasks={() => setTasks}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default ProjectTasks;
