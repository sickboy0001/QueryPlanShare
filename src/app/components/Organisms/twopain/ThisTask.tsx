import { Dispatch, useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

import { typeproject, typetask } from "@/app/model/lgtd/projects.type";

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
  children: any;
};
//orginal SortableTask
export function ThisTask(props: Props) {
  const { task, thisProjectId, children } = props;

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
        >
          {children}
          {/* <EditTask
            task={task}
            setTasks={setTasks}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            projects={projects}
            setThisProjectId={setThisProjectId}
          /> */}
        </EditModalButton>
      </ButtonOverMouse>
      <div className="flex">
        <div className="flex-none " {...attributes} {...listeners}>
          {/* <ArrowsUpDownIcon className="inline-block w-5 h-5 mr-1" /> */}

          <svg
            className="inline-block w-5 h-5 mr-1"
            viewBox="0 0 20 20"
            width="24"
          >
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
          </svg>
        </div>
        <div className="flex   w-full">
          {/* <ThisTaskToProject key={task.id} id={task.id}>
            <ArrowSmallLeftIcon className="inline-block w-5 h-5 mr-1" />
          </ThisTaskToProject> */}

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
        <div className="flex justify-end">
          <LabelItemSmall>{task.state}</LabelItemSmall>
          {/* <LabelItemSmall>{task.import}</LabelItemSmall> */}
        </div>
      </div>
      <div className="flex text-left">
        <LabelItemSub>{task.detail}</LabelItemSub>
      </div>
    </div>
  );
}
