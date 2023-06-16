"use client";

import React, {
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CalendarDay } from "./CalendarDay";
import { GetYmdString } from "@/lib/datetime";
import { useMediaQuery } from "react-responsive";

const moment = require("moment");

type Props = {
  userId: any;
  posts: any;
  setGoodThings: Dispatch<any>;
};

function TGTCalendarWeek(props: any) {
  const { userId, posts, setGoodThings } = props;
  const [baseDate, setBaseDate] = useState(GetYmdString(new Date()));
  const [baseCols, setBaseCols] = useState(2);
  const isDesktop: boolean = useMediaQuery({ query: "(min-width: 768px)" });
  const ref = useRef(null);

  useEffect(() => {
    setBaseCols(isDesktop ? baseCols : -1);
  });

  const endnumber = 1;
  const startnumber = endnumber - (baseCols + 3) * 3;

  const startTime = moment(baseDate, "yyyy MM DD")
    .add(startnumber, "d")
    .toDate();
  const endTime = moment(baseDate, "yyyy MM DD").add(endnumber, "d").toDate();

  const handleBaseColsBig = useCallback(
    (e: any) => {
      setBaseCols((prevBaseCols) =>
        prevBaseCols <= 3 ? prevBaseCols + 1 : prevBaseCols
      );
    },
    [baseCols]
  );

  const handleBaseColsSmall = useCallback(
    (e: any) => {
      setBaseCols((prevBaseCols) =>
        prevBaseCols > 0 ? prevBaseCols - 1 : prevBaseCols
      );
    },
    [baseCols]
  );

  const handleDayReset = useCallback((e: any) => {
    setBaseDate(() => {
      return GetYmdString(new Date());
    });
  }, []);
  const handleDayPrev = useCallback((e: any) => {
    setBaseDate((prevBaseDate) => {
      return moment(prevBaseDate, "YYYY-MM-DD")
        .add(baseCols + 3, "d")
        .format("YYYY-MM-DD");
    });
  }, []);
  const handleDayBack = useCallback((e: any) => {
    setBaseDate((prevBaseDate) => {
      return moment(prevBaseDate, "YYYY-MM-DD")
        .add(-(baseCols + 3), "d")
        .format("YYYY-MM-DD");
    });
  }, []);

  var thisdate = startTime;
  var thisdates = Array.from(
    { length: Math.ceil((endTime - thisdate) / (1000 * 60 * 60 * 24)) },
    (_, i) => {
      const d = new Date(thisdate);
      d.setDate(d.getDate() + i + 1);
      return d;
    }
  );

  interface EventObject {
    [key: string]: Array<any>;
  }

  const events: EventObject = {};
  for (const date of thisdates) {
    const key = moment(date).format("YYYY-MM-DD");
    // console.log(key);
    events[key] = [];
  }

  // console.log(posts);
  // 各イベントを対応する日付の配列に追加
  for (const date in events) {
    if (posts !== undefined && posts !== null) {
      events[date] = posts.filter((post: any) => {
        return !post.is_archived && date === post.cur_date;
      });
    }
  }

  return (
    <div>
      {/* //ダミー */}
      <div className="grid grid-cols-2"></div>
      <div className="grid grid-cols-3"></div>
      <div className="grid grid-cols-4"></div>
      <div className="grid grid-cols-5"></div>
      <div className="grid grid-cols-6"></div>
      <div className="grid grid-cols-7"></div>
      {/* <div ref={ref}>
        <button onClick={() => {}}>一番下へスクロール</button>
      </div> */}
      {/* <SubTitle Title={"Calendar"} Description={""}></SubTitle> */}
      <div className="flex items-center justify-between py-2 px-6">
        <div className="leading-none rounded-lg transition ease-in-out inline-flex  p-1 items-center text-2xl">
          {GetYmdString(startTime)}- {GetYmdString(endTime)}
          <div className="border rounded-lg px-1 ml-2">
            <button
              type="button"
              className="leading-none rounded-lg transition ease-in-out inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 "
              onClick={handleDayBack}
            >
              <svg className="h-6 w-6 text-gray-500 inline-flex leading-none">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="leading-none rounded-lg transition ease-in-out inline-flex  p-1 items-center text-2xl">
              <button
                type="button"
                className="leading-none rounded-lg transition ease-in-out inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 "
                onClick={handleDayReset}
              >
                Now
              </button>
            </div>
            <button
              type="button"
              className="leading-none rounded-lg transition ease-in-out inline-flex items-center cursor-pointer hover:bg-gray-200 p-1"
              onClick={handleDayPrev}
            >
              <svg className="h-6 w-6 text-gray-500 inline-flex leading-none">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        {isDesktop ? (
          <div className="border rounded-lg px-1">
            <button
              type="button"
              className="leading-none rounded-lg transition ease-in-out inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 "
              onClick={handleBaseColsBig}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                />
              </svg>
            </button>
            <button
              type="button"
              className="leading-none rounded-lg transition ease-in-out inline-flex items-center cursor-pointer hover:bg-gray-200 p-1"
              onClick={handleBaseColsSmall}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* <div className={`grid grid-cols-${baseCols + 3}  gap-2`}> */}
      <div className={`grid grid-cols-${(baseCols + 3).toString()} gap-4`}>
        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">  */}
        {thisdates.map((date) => {
          const thisdatestring = moment(date).format("YYYY-MM-DD");
          const event = thisdatestring in events ? events[thisdatestring] : [];
          return (
            <div key={thisdatestring}>
              <CalendarDay
                userId={userId}
                date={date}
                events={event}
                setGoodThings={setGoodThings}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TGTCalendarWeek;
