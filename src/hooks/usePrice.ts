import { useAppContext } from "@/context/AppContext";
import React, { useEffect } from "react";

type Props = {};

function usePrice() {
  const { setGraphData, setTokenPrice } = useAppContext();

  const fetchHourlyData = async () => {
    try {
      const res = await fetch("/api/prices/?type=hourly");
      const data = await res.json();

      let _graphData = data?.data?.pairHourDatas;
      setGraphData(_graphData);
      let _latestPrice =
        Number(_graphData[0].reserve0) / Number(_graphData[0].reserve1);
      setTokenPrice(_latestPrice);
      console.log("data is", _graphData);
    } catch (err) {
      console.log("error fetching pricecs", err);
    }
  };

  const fetchDailyData = async () => {
    try {
      const res = await fetch("/api/prices/?type=daily");
      const data = await res.json();
      let _graphData = data?.data?.pairHourDatas;
      setGraphData(_graphData);
      // let _latestPrice =
      //   Number(_graphData[0].reserve0) / Number(_graphData[0].reserve1);
      // setTokenPrice(_latestPrice);
      console.log("data is", _graphData);
    } catch (err) {
      console.log("error fetching pricecs", err);
    }
  };

  return { fetchHourlyData, fetchDailyData };
}

export default usePrice;
