import React from "react";
import classNames from "classnames";

export function ButtonToThing(props: any) {
  const deleteButtonClassName = classNames(
    "whitespace-nowrap",
    "rounded",
    "shadow-lg",
    "bg-red-500 ",
    "hover:bg-red-400",
    "shadow-red-500/50",
    "text-white",
    "px-1",
    "py-1",
    "absolute",
    "-right-2",
    "bottom-0",
    "-translate-x-1/2",
    "opacity-0",
    "group-hover:opacity-100",
    "transition",
    "cursor-pointer"
  );
  return (
    <span
      className={deleteButtonClassName}
      onClick={() => {
        props.handleClick();
      }}
    >
      {props.children}
    </span>
  );
}
