import React from "react";

type Props = {
  children: any;
};

function LabelItemSub(props: Props) {
  const { children } = props;

  return <div className="p-1  text-gray-900">{children}</div>;
}

export default LabelItemSub;
