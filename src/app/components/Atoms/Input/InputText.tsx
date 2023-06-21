import classNames from "classnames";
import React from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
  handleBlur: () => void;
  textareaRef: any;
};

function InputText(props: Props) {
  const { value, setValue, handleBlur, textareaRef } = props;
  const textAreaClass = classNames(
    "block",
    "p-1",
    "m-0.5",
    "w-full",
    "rounded-lg",
    "text-base",
    "border",
    "bg-gray-50",
    "text-gray-900",
    "focus:ring-blue-500",
    "focus:border-blue-500"
  );

  return (
    <input
      id="textarea_message"
      className={textAreaClass}
      placeholder=""
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={() => handleBlur()}
      ref={textareaRef}
    />
  );
}

export default InputText;
