import React from "react";
import classNames from "classnames";

const moment = require("moment");

type Props = {
  date: Date;
};

function LabelDate(props: Props) {
  const { date } = props;
  const labelClass = classNames(
    "border",
    "border-gray-100",
    "shadow-lg",
    "m-0.5",

    {
      "bg-green-50": date.getDate() !== new Date().getDate(),
      "bg-green-200": date.getDate() === new Date().getDate(),
    },
    "font-semibold",
    "text-center",
    {
      "text-red-500": date.getDay() === 0,
      "text-blue-500": date.getDay() === 6,
    }
  );

  return <div className={labelClass}>{moment(date).format("YYYY/MM/DD")}</div>;
}

export default LabelDate;
