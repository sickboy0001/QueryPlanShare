import React from "react";

type Props = {
  children: any;
};

function LabelItemName(props: Props) {
  const { children } = props;

  return (
    <div className="p-1 font-bold text-lg text-bold text-gray-900">
      {children}
    </div>
  );
}

export default LabelItemName;
