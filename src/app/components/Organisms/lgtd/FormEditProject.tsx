"user client";
import React, { Fragment, useState } from "react";
import { typeproject } from "@/app/model/lgtd/projects.type";
import ButtonPrimary from "../../Atoms/Button/ButtonPrimary";
import LabelInputTitle from "../../Atoms/Lable/LabelInputTitle";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import SwithLabel from "../../Atoms/Input/SwithLabel";
import ListBox from "../../Atoms/Input/LIstBox";
import RatingStar from "../../Atoms/icon/RaingStart";

type Props = {
  project: typeproject;
};

const importants = [
  { name: "★☆☆☆☆" },
  { name: "★★☆☆☆" },
  { name: "★★★☆☆" },
  { name: "★★★★☆" },
  { name: "★★★★★" },
];

const FormEditProject = (props: Props) => {
  const { project } = props;
  const [archiveEnabled, setArchiveEnabled] = useState(false);
  const [publicEnabled, setPublicEnabled] = useState(false);
  const [selectedImportant, setSelectedImportant] = useState(
    importants[0].name
  );
  // 送信
  const onSubmit = async () => {
    console.log("onsubmit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-row  py-1 px-3 ">
          {/* 名前 */}
          <div className="md:w-1/4 text-right px-3">
            <LabelInputTitle>title</LabelInputTitle>
          </div>

          <div className="md:w-3/4">
            <input
              type="text"
              className="border rounded-md w-full py-1 px-3 focus:outline-none focus:border-sky-500"
              placeholder="title"
              id="title"
              value={project.title}
              required
            />
          </div>
        </div>

        {/* description */}
        <div className="flex flex-row py-1 px-3 ">
          <div className="md:w-1/4 text-right px-3">
            <LabelInputTitle>description</LabelInputTitle>
          </div>

          <div className="md:w-3/4">
            <textarea
              className="border rounded-md w-full py-1 px-3  focus:outline-none focus:border-sky-500"
              placeholder="description"
              id="introduce"
              rows={3}
              value={project.description}
            />
          </div>
        </div>
        {/* action_plan */}

        <div className="flex flex-row  py-1 px-3">
          <div className="md:w-1/4 text-right px-3">
            <LabelInputTitle>action_plan</LabelInputTitle>
          </div>
          <div className="md:w-3/4">
            <input
              type="text"
              className="border rounded-md w-full py-1 px-3 focus:outline-none focus:border-sky-500"
              placeholder="action_plan"
              id="action_plan"
            />
          </div>
        </div>
        {/* important */}
        <div className="flex flex-row py-1 px-3">
          <div className="md:w-1/4 text-right px-3">
            <LabelInputTitle>important</LabelInputTitle>
          </div>
          <div className="flex items-center">
            <RatingStar rating={project.important} />
          </div>
        </div>

        <div className="flex flex-row py-1 px-3">
          <div className="md:w-1/4 text-right px-3">
            <LabelInputTitle>Option</LabelInputTitle>
          </div>
          <div className="md:w-3/4 flex flex-row">
            <div className="flex flex-row items-center">
              <SwithLabel checked={archiveEnabled} onChange={setArchiveEnabled}>
                <LabelInputTitle>archive</LabelInputTitle>
              </SwithLabel>
            </div>
            <div className="flex flex-row items-center">
              <SwithLabel checked={publicEnabled} onChange={setPublicEnabled}>
                <LabelInputTitle>public</LabelInputTitle>
              </SwithLabel>
            </div>
          </div>
        </div>
        {/* action_plan */}
        <div className="flex flex-row py-1 px-3">
          <div className="md:w-1/4 text-right px-3">
            <LabelInputTitle>review</LabelInputTitle>
          </div>
          <div className="md:w-3/4">
            <input
              type="text"
              className="border rounded-md w-full py-1 px-3 focus:outline-none focus:border-sky-500"
              placeholder="review"
              id="review"
            />
          </div>
        </div>
        {/* 更新 */}
        <div className="mb-5 py-1 px-3">
          <ButtonPrimary>更新</ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default FormEditProject;
