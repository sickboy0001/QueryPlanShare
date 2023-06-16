import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LabelItemName from "../../Atoms/Lable/LabelItemName";
import LabelItemSmall from "../../Atoms/Lable/LabelItemSmall";
import LabelItemSub from "../../Atoms/Lable/LabelItemSmall";
import {
  Bars4Icon,
  BookmarkSlashIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { ButtonOverMouse } from "../../Atoms/Button/ButtonOverMouse";
import EditModalButton from "../../Molecules/EditModalButton";
import FormEditProject from "./FormEditProject";

export function SortableProject(props: any) {
  const { project } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  // console.log(props);
  return (
    <div
      className="border rounded-lg  border-gray-500 m-1 relative group"
      ref={setNodeRef}
      style={style}
    >
      <ButtonOverMouse>
        <EditModalButton title={project.title}>
          <FormEditProject project={project} />
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
            {project.is_archived ? (
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
