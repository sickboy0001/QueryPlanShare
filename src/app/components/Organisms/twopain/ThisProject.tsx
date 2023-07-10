import { Dispatch, useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BookmarkSlashIcon, LockOpenIcon } from "@heroicons/react/24/outline";

import { typeproject } from "@/app/model/lgtd/projects.type";

import EditModalButton from "@/app/components/Molecules/EditModalButton";

import LabelItemName from "@/app/components/Atoms/Lable/LabelItemName";
import LabelItemSmall from "@/app/components/Atoms/Lable/LabelItemSmall";
import LabelItemSub from "@/app/components/Atoms/Lable/LabelItemSmall";
import { ButtonOverMouse } from "@/app/components/Atoms/Button/ButtonOverMouse";
import InputText from "@/app/components/Atoms/Input/InputText";

type Props = {
  project: typeproject;
  setThisProjectId: Dispatch<any>;
  children: any;
};

export function ThisProject(props: Props) {
  const { project, setThisProjectId, children } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isWriteThing, setIsWriteThing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(project.title);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id.toString() });

  const sortableProjectStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onSelectProject = (id: number) => {
    setThisProjectId(id);
  };
  const onSubmit = () => {
    console.log(`onsbumit:${project.id}`);
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
      style={sortableProjectStyle}
      onClick={() => onSelectProject(project.id)}
    >
      <ButtonOverMouse>
        <EditModalButton
          onSubmit={() => onSubmit()}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          {children}
        </EditModalButton>
      </ButtonOverMouse>
      <div className="flex">
        <div className="flex  w-full">
          <div className="flex-none " {...attributes} {...listeners}>
            <svg
              className="inline-block w-5 h-5 mr-1"
              viewBox="0 0 20 20"
              width="24"
            >
              <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
            </svg>
          </div>
          <div className="grow">
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
        <div className="flex ">
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
      <div className="flex text-left">
        <LabelItemSub>{project.description}</LabelItemSub>
      </div>
    </div>
  );
}
