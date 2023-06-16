import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LabelItemName from "../../Atoms/Lable/LabelItemName";
import LabelItemSmall from "../../Atoms/Lable/LabelItemSmall";
import LabelItemSub from "../../Atoms/Lable/LabelItemSmall";
import { Bars4Icon } from "@heroicons/react/24/outline";
import { ButtonOverMouse } from "../../Atoms/Button/ButtonOverMouse";
import EditModalButton from "../../Molecules/EditModalButton";
import FormEditTask from "./FormEditTask";
import { typetask } from "@/app/model/lgtd/projects.type";

type Props = {
  task: typetask;
};
export function SortableTask(props: Props) {
  const { task } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
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
        <EditModalButton title={task.title}>
          <FormEditTask task={task} />
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
