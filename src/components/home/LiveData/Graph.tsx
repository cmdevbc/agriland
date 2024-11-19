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
import { convertToTime, showTimeLabel } from "@/utils/dateandtime";

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
function getMinMax(data: [number, string][]) {
  return data.reduce(
    (acc, [_, value]) => {
      const numValue = parseFloat(value);
      acc.min = Math.min(acc.min, numValue);
      acc.max = Math.max(acc.max, numValue);
      return acc;
    },
    { min: Infinity, max: -Infinity }
  );
}

function generateCryptoData() {
  const startTime = Math.floor(Date.now() / 1000); // current time in seconds
  const dataPoints = 50; // total data points
  const interval = 12 * 10; // 12 minutes in seconds

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


function Graph({}: Props) {
  const mockGraphData: GraphData = {
    coordinates: generateCryptoData(),
  };
  const mockLabels = mockGraphData.coordinates.map((coord) => coord[0]);
  const mockValues = mockGraphData.coordinates.map((coord) => coord[1]);

  const dataset = useMemo(() => {
    return mockGraphData.coordinates.map((item) => parseFloat(item[1]));
  }, [mockGraphData.coordinates]);

  const { min, max } = getMinMax(mockGraphData.coordinates);

console.log("Lowest value:", min);
console.log("Highest value:", max);
const diffValue = max- min;
const offsetValueForGraph = diffValue*0.15;

  const numOfDataPoints = mockGraphData.coordinates.length;
  
  const numOfTicks = 6;

  const stepSize = Math.max(Math.floor(numOfDataPoints / numOfTicks), 1);
  let zoomLevel = 1;
  // @ts-ignore
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 5 / 1,
    onResize: (chart: any, size: any) => {
      chart.options.aspectRatio = size.width <= 600 ? 1/1 : 9 / 4;
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
        min: min-offsetValueForGraph,
        max: max+offsetValueForGraph,
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
            if (label === "ALT") {
              return `$ALT: $${dataset[context.dataIndex].toFixed(2)}`;
            }
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

  const DataGraph = (() => {
    // @ts-ignore
    return <Line options={options} data={data} />;
  });

  return (
    <>
      <h2 className={styles.graphTitle}>Live $ALT Price</h2>
      <DataGraph/>
    </>
  );
}

export default Graph;
