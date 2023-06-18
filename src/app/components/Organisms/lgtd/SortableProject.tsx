import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LabelItemName from "@/app/components/Atoms/Lable/LabelItemName";
import LabelItemSmall from "@/app/components/Atoms/Lable/LabelItemSmall";
import LabelItemSub from "@/app/components/Atoms/Lable/LabelItemSmall";
import {
  Bars4Icon,
  BookmarkSlashIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { ButtonOverMouse } from "@/app/components/Atoms/Button/ButtonOverMouse";
import EditModalButton from "@/app/components/Molecules/EditModalButton";
import EditProject from "./EditProject";
import { Dispatch, useState } from "react";
import { typeproject } from "@/app/model/lgtd/projects.type";

type Props = {
  project: typeproject;
  thisProjectId: number;
  setThisProjectId: Dispatch<any>;
};

export function SortableProject(props: Props) {
  const { project, thisProjectId, setThisProjectId } = props;
  let [isOpen, setIsOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onSelectProject = (id: number) => {
    setThisProjectId(id);
  };
  const onSubmit = () => {
    console.log(`onsbumit:${project.id}`);
  };

  // console.log(props);
  return (
    <div
      className="border rounded-lg  border-gray-500 m-1 relative group"
      ref={setNodeRef}
      style={style}
      onClick={() => onSelectProject(project.id)}
    >
      <ButtonOverMouse>
        <EditModalButton
          onSubmit={() => onSubmit()}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <EditProject
            project={project}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </EditModalButton>
      </ButtonOverMouse>

      <div className="flex">
        <div className="flex  w-full">
          <LabelItemName>
            <div className="flex flex-row items-center">
              <div className="flex " {...attributes} {...listeners}>
                <Bars4Icon className="inline-block w-5 h-5 mr-1" />
              </div>
              {project.title}
            </div>
          </LabelItemName>
        </div>
        <div className="flex justify-end ">
          <LabelItemSmall>{project.state}</LabelItemSmall>
          <LabelItemSmall>{project.important}</LabelItemSmall>
          <LabelItemSmall>
            {project.is_public ? (
              <div>
                <title>public</title>
                <LockOpenIcon className="inline-block w-5 h-5 mr-1" />
              </div>
            ) : (
              ""
            )}
          </LabelItemSmall>
          <LabelItemSmall>
            {project.is_archive ? (
              <div>
                <title>archive</title>
                <BookmarkSlashIcon className="inline-block w-5 h-5 mr-1" />
              </div>
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
  );
}
