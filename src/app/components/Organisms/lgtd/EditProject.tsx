"user client";
import React, { Fragment, useState } from "react";
import { typeproject } from "@/app/model/lgtd/projects.type";
import ButtonPrimary from "../../Atoms/Button/ButtonPrimary";
import LabelInputTitle from "../../Atoms/Lable/LabelInputTitle";
import SwithLabel from "../../Atoms/Input/SwithLabel";
import RatingStar from "../../Atoms/icon/RaingStart";

type Props = {
  project: typeproject;
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
};

const EditProject = (props: Props) => {
  const { project, isOpen, setIsOpen } = props;
  const [archiveEnabled, setArchiveEnabled] = useState(false);
  const [publicEnabled, setPublicEnabled] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const onSubmit = () => {
    console.log(`FormEditProject_onsbumit:${project.id}`);
    console.log(`FormEditProject_title:${title}`);
    setIsOpen(false);
  };

  // 送信

  return (
    <div>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={project.action_plan}
            readOnly
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
            <SwithLabel
              checked={archiveEnabled}
              onChange={() => setArchiveEnabled}
            >
              <LabelInputTitle>archive</LabelInputTitle>
            </SwithLabel>
          </div>
          <div className="flex flex-row items-center">
            <SwithLabel
              checked={publicEnabled}
              onChange={() => setPublicEnabled}
            >
              <LabelInputTitle>public</LabelInputTitle>
            </SwithLabel>
          </div>
        </div>
      </div>
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
            value={project.review}
            readOnly
          />
        </div>
      </div>

      <ButtonPrimary onClick={onSubmit}>閉じる</ButtonPrimary>
    </div>
  );
};

export default EditProject;
