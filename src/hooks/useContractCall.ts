import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import abi from "../constant/abi.json";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";

const useContractCall = () => {
  const { contract } = useContract(
    "0xE63c4e4a5c77d0FA008c08ED64815Bc25F99B7Ea",
    abi
  );

  const [agriTokenAmountToBuy, setAgriTokenAmountToBuy] = useState(0);

  const { data: requiredAmountData } = useContractRead(
    contract,
    "getRequiredBNB",
    [agriTokenAmountToBuy]
  );

  const { mutateAsync: buyWithUSDT, isLoading: buyWithUSDTIsLoading } =
    useContractWrite(contract, "buyWithUSDT");

  const { mutateAsync: buyWithBNB, isLoading: buyWithBNBIsLoading } =
    useContractWrite(contract, "buyWithBNB");

  const handleBuyWithUSDT = async () => {
    const writeData = await buyWithUSDT({
      args: [agriTokenAmountToBuy],
      overrides: {},
    });
  };

  const handleBuyWithBNB = async () => {
    const value = requiredAmountData.toString();
    const writeData = await buyWithBNB({
      args: [agriTokenAmountToBuy],
      overrides: { value },
    });
  };
};
export default useContractCall;