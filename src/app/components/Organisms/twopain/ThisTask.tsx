import { Dispatch, useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowsUpDownIcon,
  ArrowRightCircleIcon,
  CheckCircleIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/outline";

import { typeproject, typetask } from "@/app/model/lgtd/projects.type";

import { registTaskArchive, registTaskDone } from "@/app/bizlogic/lgtd";

// import EditTask from "./EditTask";
import EditModalButton from "@/app/components/Molecules/EditModalButton";

import InputText from "@/app/components/Atoms/Input/InputText";
import LabelItemName from "@/app/components/Atoms/Lable/LabelItemName";
import LabelItemSmall from "@/app/components/Atoms/Lable/LabelItemSmall";
import LabelItemSub from "@/app/components/Atoms/Lable/LabelItemSmall";
import { ButtonOverMouse } from "@/app/components/Atoms/Button/ButtonOverMouse";

type Props = {
  task: typetask;
  thisProjectId: number;
  setThisTasks: Dispatch<any>;
  children: any;
};
//orginal SortableTask
export function ThisTask(props: Props) {
  const { task, thisProjectId, children, setThisTasks } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isWriteThing, setIsWriteThing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(task.title);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: thisProjectId.toString() + "_" + task.id.toString() });

  const sortableTaskStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onSubmit = () => {
    // console.log(`onsbumit:${task.id}`);
  };

  const handleEditStart = () => {
    // console.log(`handleEditStart:${title}`);
    setIsWriteThing(true);
  };

  useEffect(() => {
    if (isWriteThing && textareaRef.current !== null) {
      // console.log("setfocus");
      setTitle(title); //値を入れる。
      textareaRef.current!.focus();
    }
  }, [isWriteThing]);

  async function handleRegistMouseDown(): Promise<void> {
    // console.log("handleRegistMouseDown");
    console.log(`handleRegistMouseDown:${title} `);

    if (title === "") return;

    setTitle(title);
    setIsWriteThing(false);
  }

  function handleBlur(): void {
    // console.log("handleBlur");
    handleRegistMouseDown();
    setIsWriteThing(false);
  }

  const clickTaskArchive = (id: number) => {
    console.log(`clickTaskArchive${id}`);
    registTaskArchive(id, true);
    setThisTasks(thisProjectId);
  };
  const clickTaskDone = (id: number) => {
    console.log(`clickTaskDone${id}`);
    registTaskDone(id, true);
    setThisTasks(thisProjectId);
  };

  // console.log(props);
  return (
    <div
      className="border rounded-lg  border-gray-500 m-1 relative group"
      ref={setNodeRef}
      style={sortableTaskStyle}
    >
      <ButtonOverMouse>
        <EditModalButton
          onSubmit={() => onSubmit()}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          clickArchive={() => clickTaskArchive(task.id)}
          clickDone={() => clickTaskDone(task.id)}
        >
          {children}
        </EditModalButton>
      </ButtonOverMouse>
      <div className="flex">
        <div className="flex-none " {...attributes} {...listeners}>
          <svg
            className="inline-block w-5 h-5 mr-1"
            viewBox="0 0 20 20"
            width="24"
          >
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
          </svg>
        </div>
        <div className="flex">
          <div className="grow pt-1 " onClick={() => clickTaskDone(task.id)}>
            {task.state === "done" ? (
              <CheckCircleIcon className="h-8 w-8 " />
            ) : task.state === "doing" ? (
              <ArrowRightCircleIcon className="h-8 w-8 " />
            ) : (
              <PauseCircleIcon className="h-8 w-8 " />
            )}
          </div>

          <div className="grow  ">
            {!isWriteThing ? (
              <LabelItemName>
                <div className="text-left " onClick={handleEditStart}>
                  {title}
                </div>
              </LabelItemName>
            ) : (
              <div>
                <InputText
                  setValue={setTitle}
                  handleBlur={handleBlur}
                  value={title}
                  textareaRef={textareaRef}
                ></InputText>
              </div>
            )}
          </div>
        </div>
        {/* <div className="flex justify-end">
          <LabelItemSmall>{task.state}</LabelItemSmall>

        </div> */}
      </div>
      <div className="flex text-left">
        <LabelItemSub>{task.detail}</LabelItemSub>
      </div>
    </div>
  );
}
