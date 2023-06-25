"user client";
import React, { Dispatch, useEffect, useState } from "react";

import SortableProjects from "./SortableProjects";

import { NewProject } from "./NewProject";

import SortableTasks from "./SortableTasks";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { getAllPorjects, getProjectTasks } from "@/app/bizlogic/lgtd";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";

const SampleScrollableList = (props: any) => {
  return <div>{props.children}</div>;
};

export default SampleScrollableList;
