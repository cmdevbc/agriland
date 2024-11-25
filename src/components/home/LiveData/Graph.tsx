"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import {
  convertToTime,
  showDateLabel,
  showTimeLabel,
} from "@/utils/dateandtime";
import { useAppContext } from "@/context/AppContext";
import { isEmpty } from "rxjs";

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
  if (!data || data.length === 0) {
    return { min: 0, max: 0 }; // Return object for consistency
  }

  return data.reduce(
    (acc, item: any) => {
      const numValue = parseFloat(item?.value);
      acc.min = Math.min(acc.min, numValue);
      acc.max = Math.max(acc.max, numValue);
      return acc;
    },
    { min: Infinity, max: -Infinity }
  );
}

function Graph({}: Props) {
  const { graphData, graphType, setGraphType } = useAppContext();

  const mockGraphData: any = {
    coordinates: graphData,
  };

  const mockLabels = mockGraphData.coordinates.map((coord: any) => coord?.time);
  const mockValues = mockGraphData.coordinates.map(
    (coord: any) => coord?.value
  );

  const dataset = useMemo(() => {
    return mockGraphData.coordinates.map((item: any) =>
      parseFloat(item?.value)
    );
  }, [mockGraphData.coordinates]);

  if (!graphData || graphData.length === 0) {
    return <div style={{ textAlign: "center" }}>Loading...</div>; // Show a loading message or spinner
  }

  const { min, max } = getMinMax(mockGraphData.coordinates);

  const diffValue = max - min;
  const offsetValueForGraph = diffValue * 0.15;

  const numOfDataPoints = mockGraphData.coordinates.length;

  const numOfTicks = 10;

  const stepSize = Math.max(Math.floor(numOfDataPoints / numOfTicks), 1);
  let zoomLevel = 1;
  // @ts-ignore

  const INITIAL_DISPLAY_COUNT = Math.floor(mockLabels.length / 2);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 5 / 1,
    onResize: (chart: any, size: any) => {
      chart.options.aspectRatio = size.width <= 600 ? 1 / 1 : 9 / 4;
      chart.update();
    },
    scales: {
      x: {
        ticks: {
          callback: (value: any, index: number) => {
            if (index % stepSize === 0) {
              return showDateLabel(mockLabels[index]);
            }
          },
        },
      },
      y: {
        min: min - offsetValueForGraph,
        max: max + offsetValueForGraph,
        position: "right",
        title: {
          display: true,
          text: "ALT($)",
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true, // Allow panning
          mode: "x", // Enable panning along the x-axis
        },
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
        intersect: false,
        mode: "nearest",
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
        pointRadius: 0,
        borderColor: "#35855B",
        borderWidth: 2,
        tension: 0.4, // This makes the line smooth and curved
      },
    ],
  };

  const DataGraph = () => {
    // @ts-ignore
    return <Line options={options} data={data} />;
  };

  const goToDailyGraph = () => {
    setGraphType("daily");
  };

  const goToHourlyGraph = () => {
    setGraphType("hourly");
  };

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.graphTitle}>Live $ALT Price</h2>

        <div className={styles.buttons}>
          <button
            onClick={goToHourlyGraph}
            className={graphType === "hourly" ? styles.activeBtn : ""}
          >
            Hourly
          </button>
          <button
            onClick={goToDailyGraph}
            className={graphType === "daily" ? styles.activeBtn : ""}
          >
            Daily
          </button>
        </div>
      </div>

      <DataGraph />
    </>
  );
}

export default Graph;
