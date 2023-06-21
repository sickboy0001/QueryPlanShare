"user client";
import React, { Dispatch, useEffect, useState } from "react";

import SortableProjects from "./SortableProjects";

import { NewProject } from "./NewProject";

import SortableTasks from "./SortableTasks";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { getAllPorjects, getProjectTasks } from "@/app/bizlogic/lgtd";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";

type Props = {
  projects: any;
  setProjects: Dispatch<any>;
  thisProjectId: number;
  setThisProjectId: Dispatch<any>;
};

const ListProjects = (props: Props) => {
  const { projects, setProjects, thisProjectId, setThisProjectId } = props;

  // const [userId, setUserId] = useState("");
  // const [thisProjectId, setThisProjectId] = useState(-1);
  // const [projects, setProjects] = useState<typeproject[]>([]);
  // const [tasks, setTasks] = useState<typetask[]>([]);
  // const [selectedProject, setSelectedProject] = useState<
  //   typeproject | undefined
  // >(undefined);

  // useEffect(() => {
  //   const getpProjects = async () => {
  //     const this_userid = "";
  //     // user.id
  //     //   ? user.id
  //     //   : guest_user_id
  //     //   ? guest_user_id
  //     //   : ""; //guest_user_id === undefined ? "" : guest_user_id;
  //     const newsetProjects: typeproject[] = await getAllPorjects(this_userid);
  //     setUserId(this_userid);
  //     setProjects(newsetProjects);

  //     if (thisProjectId < 0) {
  //       setThisProjectId(2);
  //       setThisProjectId(newsetProjects[0].id);
  //       console.log(`thisprojectid = ${newsetProjects[0].id}`);
  //       console.log(newsetProjects);
  //     }
  //   };
  //   getpProjects();
  // }, [userId]);

  // useEffect(() => {
  //   const setThisTasks = async () => {
  //     const this_userid = "";
  //     // user.id
  //     //   ? user.id
  //     //   : guest_user_id
  //     //   ? guest_user_id
  //     //   : ""; //guest_user_id === undefined ? "" : guest_user_id;
  //     if (thisProjectId >= 0) {
  //       const newTasks: typetask[] = await getProjectTasks(
  //         this_userid,
  //         thisProjectId
  //       );
  //       setTasks(newTasks);

  //       const thisproject = projects.filter(
  //         (project) => project.id === thisProjectId
  //       )[0];
  //       setSelectedProject(thisproject);
  //     }
  //   };
  //   setThisTasks();
  // }, [thisProjectId]);

  // }

  return (
    <div>
      {/* <div>
          {projects.map((proj, index) => {
            return <div key={index}>{proj.id}</div>;
          })}
        </div> */}
      <SortableProjects
        projects={projects}
        setProjects={setProjects}
        thisProjectId={thisProjectId}
        setThisProjectId={setThisProjectId}
      />
      <NewProject
        projects={projects}
        setProjects={setProjects}
        // userId={userId}
        // date={date}
        // setGoodThings={setGoodThings}
      ></NewProject>
    </div>
  );
};

export default ListProjects;
