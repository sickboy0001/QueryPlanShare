import React, { Dispatch, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Button from "@/app/components/Atoms/Button/Button";
import { addGoodThing, getAllGoodThings } from "@/app/bizlogic/goodthings";
import TextAreaDirectInput from "@/app/components/Atoms/Input/TextAreaDirectInput";
const moment = require("moment");

// import { addGoodThing, getAllGoodThings } from "@/bizlogic/goodthings";

type Props = {
  userId: Number;
  date: Date;
  setGoodThings: Dispatch<any>;
};
export function NewThing(props: Props) {
  const { userId, date, setGoodThings } = props;
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

  async function handleRegistMouseDown(): Promise<void> {
    // console.log("handleRegistMouseDown");
    // console.log(`${value}-${props.userId}-${props.date}`);

    if (value === "") return;
    const newValue = value;
    setValue("");

    const dateInLocalTimezone =
      date === null
        ? new Date()
        : new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    const datetimestr = moment(dateInLocalTimezone).format("YYYY-MM-DD");
    const result = await addGoodThing(userId, dateInLocalTimezone, newValue);
    let goodthings = await getAllGoodThings(userId);
    setGoodThings(goodthings);
    setIsNewThing(false);
  }

  function handleBlur(): void {
    console.log("handleBlur");
    handleRegistMouseDown();
    setIsNewThing(false);
  }
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.nativeEvent.isComposing || e.key !== "Enter") return;
  //   if (e.key == "Enter" && e.shiftKey === true) handleRegistMouseDown();
  // };

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
        <TextAreaDirectInput
          setValue={setValue}
          handleBlur={handleBlur}
          value={value}
          textareaRef={textareaRef}
        ></TextAreaDirectInput>
      )}
    </div>
  );
}
