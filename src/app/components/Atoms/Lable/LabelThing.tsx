import React from "react";
import classNames from "classnames";

type Props = {
  children: any;
  onClick: () => void;
};

function LabelThing(props: Props) {
  const { children, onClick } = props;
  const labelClass = classNames(
    "block",
    "p-1",
    "m-0.5",
    "w-full",
    "rounded-lg",
    "text-base",
    "border",
    "bg-white",
    "text-gray-900",
    "border-gray-500",
    "shadow-md",
    "text-gray-600",
    "dark:text-gray-400"
  );

  return (
    <div className={labelClass} onClick={() => onClick()}>
      {children}
    </div>
  );
}

export default LabelThing;
