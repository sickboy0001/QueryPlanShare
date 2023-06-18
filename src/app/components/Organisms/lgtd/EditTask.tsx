"user client";
import React, { Fragment, useState } from "react";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";
import ButtonPrimary from "../../Atoms/Button/ButtonPrimary";
import LabelInputTitle from "../../Atoms/Lable/LabelInputTitle";
import SwithLabel from "../../Atoms/Input/SwithLabel";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ListBoxIdName } from "../../Atoms/Input/ListBoxIdName";

type Props = {
  task: typetask;
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  projects: typeproject[];
};

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

const EditTask = (props: Props) => {
  const { task, isOpen, setIsOpen } = props;
  const [archiveEnabled, setArchiveEnabled] = useState(false);
  const [publicEnabled, setPublicEnabled] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [detail, setDetail] = useState(task.detail);
  const [actionPlan, setActionPlan] = useState(task.action_plan);
  const [review, setReview] = useState(task.review);

  const [selected, setSelected] = useState(people[0]);

  // 送信
  const onSubmit = () => {
    task.title = title;
    task.detail = detail;
    task.action_plan = actionPlan;
    task.review = review;

    setIsOpen(false);
  };

  return (
    <div>
      {/* projectt */}
      <div className="flex flex-row py-1 px-3">
        <div className="md:w-1/4 text-right px-3">
          <LabelInputTitle>project</LabelInputTitle>
        </div>
        <div className="md:w-3/4">
          <ListBoxIdName
            list={people}
            selected={selected}
            setSelected={() => setSelected}
          />
        </div>
      </div>
      {/* 名前 */}
      <div className="flex flex-row  py-1 px-3 ">
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
          <LabelInputTitle>detail</LabelInputTitle>
        </div>

        <div className="md:w-3/4">
          <textarea
            className="border rounded-md w-full py-1 px-3  focus:outline-none focus:border-sky-500"
            placeholder="detail"
            id="detail"
            rows={3}
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          ></textarea>
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
            value={actionPlan}
            onChange={(e) => {
              setActionPlan(e.target.value);
            }}
          />
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
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </div>
      </div>

      {/* 更新 */}
      <ButtonPrimary onClick={onSubmit}>閉じる</ButtonPrimary>
    </div>
  );
};

export default EditTask;
