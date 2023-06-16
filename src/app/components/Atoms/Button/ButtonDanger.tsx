import React from "react";

type Props = {
  children: string;
};
function ButtonDanger(props: Props) {
  const { children } = props;

  // const inputClass = className === null ? classNames("w-full") : className;

  return (
    <button
      type="submit"
      className="font-bold bg-red-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
    >
      {children}
    </button>
  );
}

export default ButtonDanger;
