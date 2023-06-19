import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LabelItemName from "@/app/components/Atoms/Lable/LabelItemName";
import LabelItemSmall from "@/app/components/Atoms/Lable/LabelItemSmall";
import LabelItemSub from "@/app/components/Atoms/Lable/LabelItemSmall";
import { Bars4Icon } from "@heroicons/react/24/outline";
import { ButtonOverMouse } from "@/app/components/Atoms/Button/ButtonOverMouse";
import EditModalButton from "@/app/components/Molecules/EditModalButton";
import EditTask from "./EditTask";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";
import { Dispatch, useState } from "react";

type Props = {
  task: typetask;
  projects: typeproject[];
  setThisProjectId: Dispatch<any>;
};
export function SortableTask(props: Props) {
  let [isOpen, setIsOpen] = useState(false);
  const { task, projects, setThisProjectId } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onSubmit = () => {
    console.log(`onsbumit:${task.id}`);
  };

  // console.log(props);
  return (
    <div
      className="border rounded-lg  border-gray-500 m-1 relative group"
      ref={setNodeRef}
      style={style}
    >
      <ButtonOverMouse>
        <EditModalButton
          onSubmit={() => onSubmit()}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <EditTask
            task={task}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            projects={projects}
            setThisProjectId={setThisProjectId}
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
              {task.title}
            </div>
          </LabelItemName>
        </div>
        <div className="flex justify-end ">
          <LabelItemSmall>{task.state}</LabelItemSmall>
          {/* <LabelItemSmall>{task.import}</LabelItemSmall> */}
        </div>
      </div>
      <div className="flex">
        <LabelItemSub>{task.detail}</LabelItemSub>
      </div>
    </div>
  );
}
