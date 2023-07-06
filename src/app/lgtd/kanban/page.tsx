"use client";
import React, { useEffect, useState } from "react";
import Container from "@/app/components/Organisms/kanban/Kanban";

import useStore from "@/store";
import SubTitle from "@/app/components/Atoms/Lable/Title";

const guest_user_id = process.env.NEXT_PUBLIC_GUEST_USER_ID as
  | string
  | undefined;

function GoodThings() {
  const [userId, setUserId] = useState("");
  const { user } = useStore();

  useEffect(() => {
    const getUser = async () => {
      const this_userid = user.id
        ? user.id
        : guest_user_id
        ? guest_user_id
        : ""; //guest_user_id === undefined ? "" : guest_user_id;
      setUserId(this_userid);
    };
    getUser();
  }, [user]);

  return (
    <section className="mb-2 w-full mx-auto">
      <SubTitle Title="Local Getting Things Done" Description=""></SubTitle>
      <div> {userId}</div>
      <Container />
      {/* <Projects /> */}
    </section>
  );
}

export default GoodThings;
