import abi from "@/constant/abi.json";
import erc20Abi from "@/constant/erc20.json";

import {
  contractAddress,
  token,
  usdtContractAddress,
} from "@/constant/constant";
import {
  toWei,
  useAddress,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";

const useStats = () => {
  let currentRound;
  const { contract } = useContract(contractAddress, abi);
  const { data: _currentRound } = useContractRead(contract, "currentRound");
  const { data: _sRounds } = useContractRead(contract, "s_rounds", [
    _currentRound?.toString(),
  ]);
  //////////
  if (_currentRound) {
    currentRound = Number(_currentRound.toString());
  }
  const startTimestamp = _sRounds?.startTimestamp?.toString();
  const endTimestamp = _sRounds?.endTimestamp?.toString();
  //////////
  return { currentRound, startTimestamp, endTimestamp };
};
export default useStats;
