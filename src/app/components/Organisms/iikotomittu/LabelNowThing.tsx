import React, { Dispatch, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  getAllGoodThings,
  updateThingGoodThing,
} from "@/app/bizlogic/goodthings";
import TextAreaDirectInput from "@/app/components/Atoms/Input/TextAreaDirectInput";
import LabelThing from "../../Atoms/Lable/LabelThing";
// import LabelThing from "../../Atoms/temp/__tempLabelThing";
// import { getAllGoodThings } from "@/bizlogic/goodthings";
// import { updateThingGoodThing } from "@/bizlogic/goodthings";

type Props = {
  userId: Text;
  id: number;
  children: any;
  setGoodThings: Dispatch<any>;
};

function LabelNowThing(props: Props) {
  const { userId, id, children, setGoodThings } = props;
  const [isWriteThing, setIsWriteThing] = useState<boolean>(false);
  const [value, setValue] = useState<any>(children);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditStart = () => {
    setIsWriteThing(true);
    console.log(`handleEditStart:${children}`);
  };

  useEffect(() => {
    if (isWriteThing && textareaRef.current !== null) {
      // console.log("setfocus");
      setValue(children);
      textareaRef.current!.focus();
    }
  }, [isWriteThing]);

  async function handleRegistMouseDown(): Promise<void> {
    // console.log("handleRegistMouseDown");
    console.log(`handleRegistMouseDown:${value} userid:${id}`);

    if (value === "") return;

    await updateThingGoodThing(id, value);
    let goodthings = await getAllGoodThings(userId);
    setGoodThings(goodthings);
    setValue("");
    setIsWriteThing(false);
  }

  function handleBlur(): void {
    console.log("handleBlur");
    handleRegistMouseDown();
    setIsWriteThing(false);
  }

  return (
    <>
      {!isWriteThing ? (
        <LabelThing
          onClick={() => {
            handleEditStart;
          }}
        >
          {children}
        </LabelThing>
      ) : (
        <div>
          <TextAreaDirectInput
            setValue={setValue}
            handleBlur={handleBlur}
            value={value}
            textareaRef={textareaRef}
          ></TextAreaDirectInput>
        </div>
      )}
    </>
  );
}

export default LabelNowThing;
