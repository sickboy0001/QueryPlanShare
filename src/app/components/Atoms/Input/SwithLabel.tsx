"user client";
import React, { Fragment, useState } from "react";
import { Combobox, Listbox, Switch, Transition } from "@headlessui/react";
import { typeproject } from "@/app/model/lgtd/projects.type";
import ButtonPrimary from "../../Atoms/Button/ButtonPrimary";
import LabelInputTitle from "../../Atoms/Lable/LabelInputTitle";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

type Props = {
  checked: any;
  onChange: any;
  children: any;
};

const SwithLabel = (props: Props) => {
  const { checked, onChange, children } = props;

  return (
    <div>
      <div className="flex flex-row items-center">
        <Switch
          checked={checked}
          onChange={onChange}
          className={`${checked ? "bg-blue-900" : "bg-blue-200"}
                relative inline-flex h-[18px] w-[34px] z-0 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 `}
        >
          <span
            aria-hidden="true"
            className={`${checked ? "translate-x-4" : "translate-x-0"}
                    pointer-events-none inline-block  z-0 h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        {children}
      </div>
    </div>
  );
};

export default SwithLabel;
