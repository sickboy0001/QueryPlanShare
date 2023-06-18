"user client";
import React from "react";
import Project from "./project";
// import { sampleProjects } from "./SampleDatas";

const Projects = (props: any) => {
  // const projects = sampleProjects;

  return (
    <div>
      <h1>Projects</h1>
      <div className="grid grid-cols-4">
        <div className="col-start-1 col-end-1">
          {/* {projects.map((project, index) => (
            <Project key={index} project={project}></Project>
          ))} */}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Projects;
