import React from "react";
import classNames from "classnames";

type Props = {
  Title: string;
  Description: string;
  children?: React.JSX.Element | null | undefined;
};

function Title(props: Props): React.JSX.Element {
  const { Title, Description, children } = props;
  const labelClass = classNames("text-3xl");

  return (
    <div className={labelClass}>
      {Title}
      {/* <div className="text-3xl">test</div> */}
      {children}
    </div>
  );
}

export default Title;
