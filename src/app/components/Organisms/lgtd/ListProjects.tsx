"user client";
import React, { Dispatch, useEffect, useState } from "react";
import SortableProjects from "./SortableProjects";
import { NewProject } from "./_NewProject";

type Props = {
  projects: any;
  setProjects: Dispatch<any>;
  thisProjectId: number;
  setThisProjectId: Dispatch<any>;
};

const ListProjects = (props: Props) => {
  const { projects, setProjects, thisProjectId, setThisProjectId } = props;

  return (
    <div>
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
