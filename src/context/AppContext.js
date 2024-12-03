"use client";

import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [tokenPrice, setTokenPrice] = useState(0);

  const [graphData, setGraphData] = useState([]);

  const [graphType, setGraphType] = useState("hourly"); // hourly/daily

  return (
    <AppContext.Provider
      value={{
        tokenPrice,
        setTokenPrice,
        setGraphData,
        graphData,
        graphType,
        setGraphType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
