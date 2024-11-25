"use client";

import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [tokenPrice, setTokenPrice] = useState(0);

  const [graphData, setGraphData] = useState([]);

  return (
    <AppContext.Provider
      value={{ tokenPrice, setTokenPrice, setGraphData, graphData }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
