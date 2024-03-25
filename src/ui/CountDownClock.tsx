import React, { useState } from "react";
import { useTimer } from "react-timer-hook";

const CountdownClock = ({ endTimestamp }: { endTimestamp: number }) => {
  const time = new Date(endTimestamp);

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <>
      <div className="time-count day">
        <span>{days}</span>days
      </div>
      <div className="time-count hour">
        <span>{hours}</span>hours
      </div>
      <div className="time-count min">
        <span>{minutes}</span>mins
      </div>
      <div className="time-count sec">
        <span>{seconds}</span>secs
      </div>
    </>
  );
};

export default CountdownClock;
