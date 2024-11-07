"use client";
import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import styles from "./livedata.module.css";
type FilterData = {
  [key: string]: {
    value: number;
    numOfPoints: number;
  };
};

type GraphData = {
  coordinates: [number, string][];
};

// Register Chart.js components only once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  zoomPlugin
);
type Props = {};
function generateCryptoData() {
  const startTime = Math.floor(Date.now() / 1000); // current time in seconds
  const dataPoints = 60; // total data points
  const interval = 12 * 60; // 12 minutes in seconds

  const cryptoData: [number, string][] = Array.from(
    { length: dataPoints },
    (_, i) => {
      const time = startTime + i * interval; // increment time by 12 minutes for each data point
      const value = (Math.random() * 0.3 + 0.15).toFixed(6); // random value between 0.2 and 0.5
      return [time, value];
    }
  );

  return cryptoData;
}
const getDoubleDigit = (num: number) => (num < 10 ? `0${num}` : num);

const showTimeLabel = (epochTime: number) => {
  const date = new Date(epochTime * 1000);
  return `${getDoubleDigit(date.getHours())}:${getDoubleDigit(
    date.getMinutes()
  )}`;
};

const showDateLabel = (epochTime: number) => {
  const date = new Date(epochTime * 1000);
  return `${getDoubleDigit(date.getMonth() + 1)}/${getDoubleDigit(
    date.getDate()
  )}`;
};

const convertToTime = (epochTime: number) => {
  const date = new Date(epochTime * 1000);
  return `${date.getFullYear()}/${getDoubleDigit(
    date.getMonth() + 1
  )}/${getDoubleDigit(date.getDate())} ${getDoubleDigit(
    date.getHours()
  )}:${getDoubleDigit(date.getMinutes())}:${getDoubleDigit(date.getSeconds())}`;
};

function Graph({}: Props) {
  const mockGraphData: GraphData = {
    coordinates: generateCryptoData(),
  };
  const mockLabels = mockGraphData.coordinates.map((coord) => coord[0]);
  const mockValues = mockGraphData.coordinates.map((coord) => coord[1]);

  const dataset = useMemo(() => {
    return mockGraphData.coordinates.map((item) => parseFloat(item[1]));
  }, [mockGraphData.coordinates]);

  const numOfDataPoints = mockGraphData.coordinates.length;
  const numOfTicks = 6;
  const stepSize = Math.max(Math.floor(numOfDataPoints / numOfTicks), 1);
  let zoomLevel = 1;
  // @ts-ignore
  const options = {
    responsive: true,
    aspectRatio: 5 / 1,
    onResize: (chart: any, size: any) => {
      chart.options.aspectRatio = size.width <= 600 ? 3 / 2 : 9 / 4;
      chart.update();
    },
    scales: {
      x: {
        ticks: {
          callback: (value: any, index: number) => {
            if (index % stepSize === 0) {
              return showTimeLabel(mockLabels[index]);
            }
          },
        },
      },
      y: {
        min: 0.1,
        max: 0.5,
        position: "right",
        title: {
          display: true,
          text: "ALT($)",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            onZoom: ({ chart }: any) => {
              zoomLevel += 1;
              chart.options.plugins.zoom.zoom.wheel.enabled = zoomLevel <= 10;
            },
          },
          pinch: {
            enabled: true,
            onZoom: ({ chart }: any) => {
              zoomLevel += 1;
              chart.options.plugins.zoom.zoom.pinch.enabled = zoomLevel <= 3;
            },
          },
          mode: "x",
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) =>
            convertToTime(mockLabels[tooltipItems[0].dataIndex]),
          label: (context: any) => {
            const label = context.dataset.label;
            console.log("label", label);
            if (label === "ALT") {
              return `$ALT: $${dataset[context.dataIndex].toFixed(2)}`;
            }
            return "anj";
          },
        },
        displayColors: false,
      },
    },
  };

  const data = {
    labels: mockLabels,
    datasets: [
      {
        label: "ALT",
        data: mockValues,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // Return plain color during initialization, before chart is rendered
            return "rgba(75,192,192,0.2)";
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "#010314"); // Bottom color
          gradient.addColorStop(1, "#35855B"); // Top color
          return gradient;
        },
        borderColor: "#35855B",
        tension: 0.4, // This makes the line smooth and curved
      },
    ],
  };

  const memoizedGraph = useMemo(() => {
    // @ts-ignore
    return <Line options={options} data={data} />;
  }, [data]);

  return (
    <div className={styles.graphContainer}>
      <h2 className={styles.graphTitle}>Any Title Here</h2>
      {memoizedGraph}
    </div>
  );
}

export default Graph;
