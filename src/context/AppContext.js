"use client"; 

import React, { createContext, useState,useContext } from 'react';


const defaultContextValue = {
  tokenPrice: 0,
  setTokenPrice: () => {},
};

// Create the context
 const AppContext = createContext();

// Context provider component
export const AppContextProvider= ({ children }) => {
  const [tokenPrice, setTokenPrice] = useState(0);

  return (
    <AppContext.Provider value={{ tokenPrice, setTokenPrice }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);