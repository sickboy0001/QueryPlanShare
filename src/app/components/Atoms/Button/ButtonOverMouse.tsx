import React from "react";

export function ButtonOverMouse(props: any) {
  return (
    <span className="rounded px-1 py-1 absolute -right-1 -bottom-1 opacity-0 group-hover:opacity-100 cursor-pointer">
      {props.children}
    </span>
  );
}
