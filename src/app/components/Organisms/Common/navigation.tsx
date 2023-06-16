"use client";

import Link from "next/link";
import useStore from "@/store";
import Image from "next/image";
import { useEffect } from "react";
import type { Session } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
// user-circle UserCircleIcon
// document-duplicate DocumentDuplicateIcon
type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

type Props = {
  session: Session | null;
  profile: ProfileType | null;
};

const Menu = [
  {
    name: "Lgtd",
    icon: DocumentDuplicateIcon,
    href: "/lgtd/top",
  },
];

// ナビゲーション
const Navigation = ({ session, profile }: Props) => {
  const { setUser } = useStore();

  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id : "",
      email: session ? session.user.email! : "",
      name: session && profile ? profile.name : "",
      introduce: session && profile ? profile.introduce : "",
      avatar_url: session && profile ? profile.avatar_url : "",
    });
  }, [session, setUser, profile]);

  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="py-2 px-2 container flex items-center justify-between">
        <div className="flex">
          <Link href="/" className="font-bold text-xl cursor-pointer">
            l-gtd
          </Link>

          {Menu.map((item, index) => (
            <Link href={item.href} key={index}>
              <div className=" text-sky-300 hover:text-sky-500 px-3 py-1 rounded-full text-sm">
                <item.icon className="inline-block w-5 h-5 mr-1" />
                {item.name}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-sm font-bold">
          {session ? (
            <div className="flex items-center space-x-5">
              <div>{profile && profile.name ? profile.name : ""}</div>
              <Link href="/settings/profile">
                <div className="relative w-10 h-10">
                  <Image
                    src={
                      profile && profile.avatar_url
                        ? profile.avatar_url
                        : "/default.png"
                    }
                    className="rounded-full object-cover"
                    alt="avatar"
                    fill
                  />
                </div>
                {/* <div>profile</div> */}
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/auth/login">ログイン</Link>
              <Link href="/auth/signup">サインアップ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
