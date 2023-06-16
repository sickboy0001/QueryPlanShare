"use client";
import React, { useEffect, useState } from "react";
import { getAllGoodThings } from "@/app/bizlogic/goodthings";
import TGTCalendarWeek from "@/app/components/Organisms/iikotomittu/CalendarWeek";
import SubTitle from "@/app/components/Atoms/Lable/Title";
import useStore from "@/store";

const guest_user_id = process.env.NEXT_PUBLIC_GUEST_USER_ID as
  | string
  | undefined;

function GoodThings() {
  const [goodThings, setGoodThings] = useState<any>();
  const [userId, setUserId] = useState("");
  const { user } = useStore();

  useEffect(() => {
    const getGoodThings = async () => {
      // console.log(goodThings);
      // console.log(`getGoodThings userId:${userId}`);
      // const this_userid = await getUserIdOrGuestID();
      const this_userid = user.id
        ? user.id
        : guest_user_id
        ? guest_user_id
        : ""; //guest_user_id === undefined ? "" : guest_user_id;
      // console.log(`getGoodThings this_userid:start:${this_userid}`);
      const newGoodThings = await getAllGoodThings(this_userid);
      // console.log(`getGoodThings this_userid:start:${this_userid}`);
      setUserId(this_userid);
      setGoodThings(newGoodThings);
    };

    getGoodThings();
  }, [user]);

  return (
    <section className="mb-2 w-full max-w-7xl mx-auto">
      <SubTitle Title="イイコトミッツ" Description=""></SubTitle>
      <TGTCalendarWeek
        userId={userId}
        posts={goodThings}
        setGoodThings={setGoodThings}
      />
    </section>
  );
}

export default GoodThings;
