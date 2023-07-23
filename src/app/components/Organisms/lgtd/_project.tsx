"user client";
import React, { Fragment, useState } from "react";
import LabelItemName from "../../Atoms/Lable/LabelItemName";
import LabelItemSub from "../../Atoms/Lable/LabelItemSub";
import LabelItemSmall from "../../Atoms/Lable/LabelItemSmall";
import { LockOpenIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { typeproject } from "@/app/model/lgtd/projects.type";
import { ButtonOverMouse } from "../../Atoms/Button/ButtonOverMouse";
// import { ButtonToThing } from "@/app/components/Atoms/Button/ButtonToThing";

type Props = {
  project: typeproject;
};

const Project = (props: any) => {
  const { project } = props;

  return (
    <div key={project.title}>
      <div className="relative group border rounded-lg  border-gray-500 m-1 ">
        <ButtonOverMouse>
          {/* <EditModalButton title={project.title}>
            <EditProject project={project} />
          </EditModalButton> */}
        </ButtonOverMouse>

        <div className="flex">
          <div className="flex  w-full">
            <LabelItemName>{project.title}</LabelItemName>
          </div>
          <div className="flex justify-end ">
            <LabelItemSmall>{project.state}</LabelItemSmall>
            <LabelItemSmall>{project.important}</LabelItemSmall>
            <LabelItemSmall>
              {project.is_public ? (
                <LockOpenIcon className="inline-block w-5 h-5 mr-1" />
              ) : (
                ""
              )}
            </LabelItemSmall>
            <LabelItemSmall>
              {project.is_archived ? (
                <BookmarkSlashIcon className="inline-block w-5 h-5 mr-1" />
              ) : (
                ""
              )}
            </LabelItemSmall>
          </div>
        </div>
        <div className="flex">
          <LabelItemSub>{project.description}</LabelItemSub>
        </div>
      </div>
    </div>
  );
};

export default Project;
