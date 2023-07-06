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
  handleDragEndTask: Dispatch<any>;
};

const ListTasks = (props: Props) => {
  const {
    selectedProject,
    projects,
    tasks,
    setTasks,
    setThisProjectId,
    handleDragEndTask,
  } = props;

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
