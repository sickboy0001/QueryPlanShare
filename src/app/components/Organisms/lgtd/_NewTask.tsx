import React, { Dispatch, useEffect, useRef, useState } from "react";
// import Button from "@/app/components/Atoms/Button/Button";
import { addGoodThing, getAllGoodThings } from "@/app/bizlogic/goodthings";
import TextAreaDirectInput from "@/app/components/Atoms/Input/TextAreaDirectInput";
import Button from "@/app/components/Atoms/Button/Button";
import InputText from "@/app/components/Atoms/Input/InputText";
import { typetask } from "@/app/model/lgtd/projects.type";
import { addNewTask } from "@/app/bizlogic/lgtd";
const moment = require("moment");

// import { addGoodThing, getAllGoodThings } from "@/bizlogic/goodthings";

type Props = {
  userId: number;
  projectId?: number;
  tasks: typetask[];
  setTasks: Dispatch<any>;
};
export function NewTask(props: Props) {
  const { userId, projectId, tasks, setTasks } = props;
  const [isNewThing, setIsNewThing] = useState(Boolean);
  const [value, setValue] = useState("");
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
    // console.log("handleRegistMouseDown");
    // console.log(`${value}-${props.userId}-${props.date}`);
    if (value === "") return;
    const newValue = value;
    setValue("");

    // //todo　データ登録　読み取り
    // const result = await addNewTask("", newValue, projectId ? projectId : 1);

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
    //   project_id: projectId ? projectId : 1,
    //   title: newValue,
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
    // // console.log(projects);
    // setTasks([...tasks, newpTask]);

    // setIsNewThing(false);
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
          setValue={setValue}
          handleBlur={handleBlur}
          value={value}
          textareaRef={textareaRef}
        ></InputText>
      )}
    </div>
  );
}
