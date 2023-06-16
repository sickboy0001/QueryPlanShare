"use client";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Menu = [
  {
    name: "iikoto-Mittu",
    description: "毎晩寝る前に、1日で良かったことを3つ書く",
    icon: DocumentDuplicateIcon,
    href: "/iikotomittu/top",
  },
  {
    name: "Locat-GettingThingDoing",
    description: "自分用TodoList",
    icon: DocumentDuplicateIcon,
    href: "/lgtd/top",
  },
];

// プロフィール
const Start = () => {
  return (
    <div>
      <h1 className="text-3xl my-2 text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight ">
        イイコトミッツ
      </h1>
      <h2 className="text-3xl my-2 text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight ">
        iikoto-mittu
      </h2>
      <div className="flex justify-center ">
        <div className="max-w-[60rem] p-4 rounded-t-xl bg-white border border-gray-200 shadow-sm rounded-xl ">
          <p className="text-left mt-1 text-base text-gray-600">
            ３GoodThingsとは、毎日自分が経験した３つの良いことを挙げる習慣です。心理学的な研究により、この習慣がストレスや不安を減らし、幸福感を高めることが示されています。
          </p>
          <p className="text-left mt-1 text-base text-gray-600">
            この習慣を始めるためには、毎日同じ時間帯に自分の好きな方法で３つの良いことを挙げます。例えば、美味しい食事をした、友達と話した、好きな本を読んだなど、小さなことでも良いので、自分にとってポジティブな出来事を思い出し、感謝することが大切です。
          </p>
          <p className="text-left mt-1 text-base text-gray-600">
            ３GoodThingsを継続的に行うことで、ポジティブな思考が身につき、ストレスや不安に対する耐性が上がります。また、自分自身の良い面に気づくことができ、自信を持つことができるようになります。
          </p>
          <p className="text-left mt-1 text-base text-gray-600">
            毎日続けることが大切ですが、やりすぎないように注意しましょう。また、他人と比べることなく、自分のペースで取り入れていくことが大切です。
          </p>
          <p className="text-left mt-1 text-base text-gray-600">
            ３GoodThingsを始めて、幸福感を高めてみませんか？
          </p>
        </div>
      </div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">
          {Menu.map((item, index) => (
            <Link href={item.href} key={index}>
              <div className=" group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7">
                <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-xl">
                  <item.icon className="inline-block mr-1 fill-white" />
                </div>
                <div className="mt-5">
                  <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 ">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
                    more
                    <svg
                      className="w-2.5 h-2.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Start;
