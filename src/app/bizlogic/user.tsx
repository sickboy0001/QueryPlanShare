"use server";

import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const guest_user_id = process.env.NEXT_PUBLIC_GUEST_USER_ID;

export const getSessionUser: any | null = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  // セッションの取得
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session?.user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserIdOrGuestID = async () => {
  const user = await getSessionUser();
  console.log(`user:${user.id}`);
  if (user) {
    return user.id;
  } else {
    return guest_user_id;
  }
  //   return guest_user_id;
};
