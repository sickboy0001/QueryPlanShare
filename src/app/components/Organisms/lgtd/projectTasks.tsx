"user client";
import React from "react";
import Project from "./project";
import { sampleProjects } from "./SampleDatas";
import { sampleTasks } from "./SampleDatas";
import SortableTasks from "./SortableTasks";
import SortableProjects from "./SortableProjects";

const ProjectTasks = (props: any) => {
  const projects = sampleProjects;
  const tasks = sampleTasks;
  return (
    <div>
      <div className="grid grid-cols-4">
        <div>
          <SortableProjects projects={projects} />
        </div>
        <div className="col-span-3">
          <SortableTasks tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default ProjectTasks;
