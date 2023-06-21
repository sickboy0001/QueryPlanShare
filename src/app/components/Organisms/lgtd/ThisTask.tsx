import { Dispatch, useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Bars4Icon } from "@heroicons/react/24/outline";

import { typeproject, typetask } from "@/app/model/lgtd/projects.type";

import EditTask from "./EditTask";

import EditModalButton from "@/app/components/Molecules/EditModalButton";

import InputText from "@/app/components/Atoms/Input/InputText";
import LabelItemName from "@/app/components/Atoms/Lable/LabelItemName";
import LabelItemSmall from "@/app/components/Atoms/Lable/LabelItemSmall";
import LabelItemSub from "@/app/components/Atoms/Lable/LabelItemSmall";
import { ButtonOverMouse } from "@/app/components/Atoms/Button/ButtonOverMouse";

type Props = {
  task: typetask;
  projects: typeproject[];
  setThisProjectId: Dispatch<any>;
};
//orginal SortableTask
export function ThisTask(props: Props) {
  const { task, projects, setThisProjectId } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isWriteThing, setIsWriteThing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(task.title);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
  const sortableTaskStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onSubmit = () => {
    console.log(`onsbumit:${task.id}`);
  };

  const handleEditStart = () => {
    console.log(`handleEditStart:${title}`);
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

    //update data

    // await updateThingGoodThing(id, value);
    // let goodthings = await getAllGoodThings(userId);
    // setGoodThings(goodthings);

    setTitle(title);
    setIsWriteThing(false);
  }

  function handleBlur(): void {
    console.log("handleBlur");
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
        <div className="flex  w-full bg-red-300">
          <LabelItemName>
            <div className="flex flex-row items-center w-full ">
              <div className="flex-none " {...attributes} {...listeners}>
                <Bars4Icon className="inline-block w-5 h-5 mr-1" />
              </div>
              <div className="flex-auto w-full bg-red-200">
                {!isWriteThing ? (
                  <div onClick={handleEditStart}>{title}</div>
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
          </LabelItemName>
        </div>
        <div className="flex justify-end">
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
