"user client";
import React, { Dispatch, useEffect, useState } from "react";
import SortableTasks from "./SortableTasks";
import { NewTask } from "./NewTask";

type Props = {
  selectedProject: any;
  projects: any;
  tasks: any;
  setTasks: Dispatch<any>;
  setThisProjectId: Dispatch<any>;
};

const ListTasks = (props: Props) => {
  const { selectedProject, projects, tasks, setTasks, setThisProjectId } =
    props;

  function handleDragEnd(event: any) {
    console.log("ProjectTasks_drag and called"); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
    const { active, over } = event;

    if (active.id !== over.id) {
    }
  }

  return (
    <div>
      <SortableTasks
        selectedProject={selectedProject}
        projects={projects}
        tasks={tasks}
        setTasks={setTasks}
        setThisProjectId={setThisProjectId}
      />
      <NewTask
        userId={0}
        projectId={selectedProject}
        tasks={tasks}
        setTasks={setTasks}
      ></NewTask>
    </div>
  );
};

export default ListTasks;
