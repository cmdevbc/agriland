"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./livedata.module.css";
// import Graph from "./Graph";
import TokenDetails from "./TokenDetails";
import { useAppContext } from "@/context/AppContext";
import dynamic from "next/dynamic";
import usePrice from "@/hooks/usePrice";

const Graph = dynamic(() => import("./Graph"), {
  ssr: false,
  loading: () => <p style={{ textAlign: "center" }}>Loading...</p>,
});

function LiveData() {
  const { graphType } = useAppContext();

  const { fetchGraphData } = usePrice();

  useEffect(() => {
    fetchGraphData();

    // Set up interval for every 5 minutes
    const intervalId = setInterval(() => {
      fetchGraphData();
    }, 300000);

    return () => clearInterval(intervalId);
  }, [graphType]);

  return (
    <div className={styles.wrap} id="live">
      <div className={styles.graph}>
        <Graph />
      </div>

      <div className={styles.tokenDetails}>
        <TokenDetails />
      </div>
    </div>
  );
}

export default LiveData;
