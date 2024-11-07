"use client";
import React, { useMemo, useState } from "react";
import styles from "./livedata.module.css";
import Graph from "./Graph";
import TokenDetails from "./TokenDetails";
function LiveData() {
  return (
    <div className={styles.wrap}>
      <Graph />
      <TokenDetails />
    </div>
  );
}

export default LiveData;
