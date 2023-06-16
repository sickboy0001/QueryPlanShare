import classNames from "classnames";
import React from "react";
type Props = {
  children: any;
  htmlFor?: string;
};
function LabelInputTitle(props: Props) {
  const { children, htmlFor } = props;

  return (
    <label className="text-sm font-bold py-1 px-3" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default LabelInputTitle;
