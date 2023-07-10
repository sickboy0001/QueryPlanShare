import React, { Dispatch, useEffect, useRef, useState } from "react";
// import Button from "@/app/components/Atoms/Button/Button";
import { addGoodThing, getAllGoodThings } from "@/app/bizlogic/goodthings";
import TextAreaDirectInput from "@/app/components/Atoms/Input/TextAreaDirectInput";
import Button from "@/app/components/Atoms/Button/Button";
import InputText from "@/app/components/Atoms/Input/InputText";
import { typetask } from "@/app/model/lgtd/projects.type";
import { addNewTask, getProjectTasks } from "@/app/bizlogic/lgtd";

const moment = require("moment");

// import { addGoodThing, getAllGoodThings } from "@/bizlogic/goodthings";

type Props = {
  userId: string;
  projectId?: number;
  setTasks: Dispatch<any>;
  setSelectedProject: Dispatch<any>;
};
export function NewTask(props: Props) {
  const { userId, projectId, setTasks, setSelectedProject } = props;
  const [isNewThing, setIsNewThing] = useState(Boolean);
  const [title, setTitle] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isNewThing && textareaRef.current !== null) {
      // console.log("setfocus");
      textareaRef.current!.focus();
    }
  }, [isNewThing]);

  function handleNewClick(): void {
    // event.preventDefault();
    // console.log("handleNewClick");
    setIsNewThing(true);
  }
  function handleMouseDown(): void {
    // console.log("handleMouseDown");
    setIsNewThing(false);
  }

  async function addActionNewTask(): Promise<void> {
    if (title === "") return;
    const newTitle = title;
    const newProjectId = projectId ? projectId : 1;
    setTitle("");
    setIsNewThing(false);

    //todo　データ登録　読み取り
    const result = await addNewTask(userId, newProjectId, newTitle);

    const newTasks = await getProjectTasks(userId, newProjectId);
    setTasks(newTasks);

    // //メモリ内の情報更新
    // const newpTask: typetask = {
    //   id:
    //     Math.max.apply(
    //       0,
    //       tasks.map(function (o) {
    //         return o.id;
    //       })
    //     ) + 1,
    //   user_id: "",
    //   project_id: newProjectId,
    //   title: newTitle,
    //   is_public: false,
    //   is_archive: false,
    //   action_plan: "",
    //   detail: "",
    //   start_date: "",
    //   due_date: "",
    //   state: "",
    //   type: "",
    //   review: "",
    // };
    // console.log(newpTask);
  }

  function handleBlur(): void {
    console.log("handleBlur");
    addActionNewTask();
    setIsNewThing(false);
  }

  return (
    <div>
      {!isNewThing ? (
        <div className="w-full text-black bg-teal-100 hover:bg-teal-200 font-extrabold rounded-2xl">
          <Button
            handleClick={() => handleNewClick()}
            handleMouseDown={() => handleMouseDown()}
          >
            New
          </Button>
        </div>
      ) : (
        <InputText
          setValue={setTitle}
          handleBlur={handleBlur}
          value={title}
          textareaRef={textareaRef}
        ></InputText>
      )}
    </div>
  );
}
