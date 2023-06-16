import classNames from "classnames";
import React from "react";

const moment = require("moment");

function LabelLogin(props: any) {
  var thisClassName =
    props.className === undefined
      ? classNames(
          "mb-1",
          "text-xs",
          "sm:text-sm",
          "tracking-wide",
          "text-gray-600"
        )
      : props.className;

  return (
    <label className={thisClassName} htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
}

export default LabelLogin;
