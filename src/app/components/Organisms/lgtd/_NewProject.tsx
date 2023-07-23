import React, { Dispatch, useEffect, useRef, useState } from "react";
// import Button from "@/app/components/Atoms/Button/Button";
import { addNewProject } from "@/app/bizlogic/lgtd";
import TextAreaDirectInput from "@/app/components/Atoms/Input/TextAreaDirectInput";
import Button from "@/app/components/Atoms/Button/Button";
import InputText from "@/app/components/Atoms/Input/InputText";
import { typeproject } from "@/app/model/lgtd/projects.type";
const moment = require("moment");

// import { addGoodThing, getAllGoodThings } from "@/bizlogic/goodthings";

type Props = {
  projects: typeproject[];
  setProjects: Dispatch<any>;
};
export function NewProject(props: Props) {
  const { projects, setProjects } = props;
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

  async function addActionNewProject(): Promise<void> {
    // console.log("handleRegistMouseDown");
    // console.log(`${value}-${props.userId}-${props.date}`);
    if (value === "") return;
    const newValue = value;
    setValue("");
    //todo　データ登録　読み取り
    const result = await addNewProject("", newValue);

    //メモリ内の情報更新
    const newproject: typeproject = {
      id:
        Math.max.apply(
          0,
          projects.map(function (o) {
            return o.id;
          })
        ) + 1,
      user_id: "xxxxx",
      title: newValue,
      is_archive: false,
      is_public: false,
      description: "test",
      action_plan: "test",
      state: "",
      from_date: "",
      to_date: "",
      review: "",
      important: 1,
      created_at: "",
      updated_at: "",
    };
    // console.log(projects);
    setProjects([...projects, newproject]);

    setIsNewThing(false);
  }

  function handleBlur(): void {
    console.log("handleBlur");
    addActionNewProject();
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
