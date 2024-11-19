"use client";
import React, { useMemo, useState } from "react";
import styles from "./livedata.module.css";
// import Graph from "./Graph";
import TokenDetails from "./TokenDetails";
import { useAppContext } from "@/context/AppContext";
import dynamic from 'next/dynamic';

const Graph = dynamic(() => import('./Graph'), {
  ssr: false, 
  loading: () => <p  style={{textAlign:"center"}}>Loading...</p>,
});

function LiveData() {

  return (
    <div className={styles.wrap}>
 
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
