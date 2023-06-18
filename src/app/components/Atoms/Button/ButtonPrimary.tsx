import React from "react";

type Props = {
  children: string;
  handleClick?: () => Promise<void> | void;
  onClick?: () => Promise<void> | void;
};
function Button(props: Props) {
  const { children, onClick } = props;

  // const inputClass = className === null ? classNames("w-full") : className;

  return (
    <button
      type="submit"
      className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
