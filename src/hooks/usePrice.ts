import { useAppContext } from "@/context/AppContext";
import React, { useEffect } from "react";

type Props = {};

function usePrice() {
  const { setGraphData, setTokenPrice } = useAppContext();
  const { graphType } = useAppContext();

  const fillRemainingData = (_data: any[], timer: number) => {
    const filledData = [];

    for (let i = 0; i < _data.length - 1; i++) {
      const current = _data[i];
      const next = _data[i + 1];

      filledData.push({ ...current }); // Add a copy of the current data point

      let currentTime = current.time; // Use a separate variable for time calculation
      let timeDifference = next.time - currentTime;

      // Fill in data points if the time difference is greater than timer
      while (timeDifference > timer) {
        currentTime += timer; // Increment time by timer
        filledData.push({
          time: currentTime, // Use the incremented time value
          value: current.value, // Keep the value the same
        });
        timeDifference = next.time - currentTime; // Update the difference
      }
    }

    // Push the last data point
    filledData.push({ ..._data[_data.length - 1] });
    console.log("filledData", filledData);
    setGraphData(filledData);
  };

  function transformAndSaveData(_data: any, _type: "daily" | "hourly") {
    const _transformedData = _data
      .map(
        (item: {
          date: Number;
          hourStartUnix: Number;
          reserve0: string;
          reserve1: string;
        }) => ({
          time: _type == "daily" ? item.date : item.hourStartUnix,
          value: (
            parseFloat(item.reserve1) / parseFloat(item.reserve0)
          ).toFixed(6), // Adjust decimal places as needed
        })
      )
      .sort((a: any, b: any) => a.time - b.time);
    if (_type == "daily") {
      fillRemainingData(_transformedData, 86400);
    } else {
      let _latestPrice = Number(_data[0].reserve1) / Number(_data[0].reserve0);
      setTokenPrice(_latestPrice);

      fillRemainingData(_transformedData, 3600);
    }
  }

  const fetchHourlyData = async () => {
    try {
      const res = await fetch("/api/prices/?type=hourly");
      const data = await res.json();
      let _graphData = data?.data?.pairHourDatas;
      transformAndSaveData(_graphData, "hourly");

      // let _temp = {
      //   pair: {
      //     id: "0x3938fAecD0f93572314654D4ED862969BB5cB6BC",
      //     name: "ALT-USDT",
      //   },
      //   hourStartUnix: 1733126400,
      //   reserve0: "513.296062945111068",
      //   reserve1: "719.32782629263928497",
      // };
      // transformAndSaveData([..._graphData, _temp], "hourly");
    } catch (err) {
      console.log("error fetching pricecs", err);
    }
  };

  const fetchDailyData = async () => {
    try {
      const res = await fetch("/api/prices/?type=daily");
      const data = await res.json();
      let _graphData = data?.data?.pairDayDatas;

      transformAndSaveData(_graphData, "daily");
    } catch (err) {
      console.log("error fetching pricecs", err);
    }
  };

  const fetchGraphData = () => {
    setGraphData([]);
    if (graphType === "daily") {
      fetchDailyData();
    } else {
      fetchHourlyData();
    }
  };

  return { fetchGraphData };
}

export default usePrice;
