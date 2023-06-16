import React, { Dispatch } from "react";
import { getAllGoodThings, archivedGoodThing } from "@/app/bizlogic/goodthings";
import LabelNowThing from "./LabelNowThing";
import LabelDate from "@/app/components/Atoms/Lable/LabelDate";
import { ButtonToThing } from "@/app/components/Atoms/Button/ButtonToThing";
import { NewThing } from "./NewThing";
const moment = require("moment");

type Props = {
  userId: any;
  date: Date;
  events: any[];
  setGoodThings: Dispatch<any>;
};

export function CalendarDay(props: Props) {
  const { userId, date, events, setGoodThings } = props;
  //handleClickChangeArchived
  const handleClickChangeArchived = async (id: number) => {
    {
      console.log(`handleClickChangeArchived:id:${id} `);
      // await toArchivedTodo(id, isToArchived);
      await archivedGoodThing(id);

      let newgoodthings = await getAllGoodThings(userId);
      setGoodThings(newgoodthings);
    }
  };

  return (
    <div key={moment(date).format("YYYYMMDD")}>
      <div>
        <div>
          <LabelDate date={date} />
          <div>
            {events.map((post, index: number) => {
              return (
                <span key={index} className="relative group">
                  {/* <button className={deleteButtonClassName}>x</button> */}
                  <ButtonToThing
                    handleClick={() => handleClickChangeArchived(post.id)}
                  >
                    x
                  </ButtonToThing>
                  <div>
                    <LabelNowThing
                      userId={userId}
                      id={post.id}
                      setGoodThings={setGoodThings}
                    >
                      {post.contents}
                    </LabelNowThing>
                  </div>
                </span>

                // </p>
              );
            })}
          </div>
          <NewThing
            userId={userId}
            date={date}
            setGoodThings={setGoodThings}
          ></NewThing>
        </div>
      </div>
    </div>
  );
}
