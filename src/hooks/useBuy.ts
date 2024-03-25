import abi from "@/constant/abi.json";
import erc20Abi from "@/constant/erc20.json";

import { contractAddress, usdtContractAddress } from "@/constant/address";
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

const useBuy = () => {
  const address = useAddress();
  const [status, setStatus] = useState(0);
  const [selectedTkn, setSelectedTkn] = useState("BNB");
  const [amount, setAmount] = useState<any>();
  const [altAmount, setAltAmount] = useState<any>();
  const { data: balance, isLoading } = useBalance(
    selectedTkn == "CARD"
      ? ""
      : selectedTkn == "USDT"
      ? usdtContractAddress
      : undefined
  );
  let price = "";
  let capital = "";
  let isApproved = undefined;
  ///////////////////
  const { contract } = useContract(contractAddress, abi);
  const { contract: usdtContract } = useContract(usdtContractAddress, erc20Abi);

  const { data: requiredAgri } = useContractRead(contract, "getAgriByBNB", [
    Number(amount) > 0 ? toWei(Number(amount)) : 0,
  ]);
  const { data: requiredBnb } = useContractRead(contract, "getRequiredBNB", [
    Number(altAmount) > 0 ? toWei(Number(altAmount)) : 0,
  ]);
  const {
    mutateAsync: approve,
    isLoading: isLoadingApprove,
    isError,
    error,
  } = useContractWrite(usdtContract, "approve");
  const { data: allowance } = useContractRead(usdtContract, "allowance", [
    address,
    address,
  ]);
  const { mutateAsync: buyWithBNB, isLoading: isLoadingBuyWithBNB } =
    useContractWrite(contract, "buyWithBNB");
  const { mutateAsync: buyWithUSDT, isLoading: isLoadingBuyWithUSDT } =
    useContractWrite(contract, "buyWithUSDT");
  const { data: contractStats, isSuccess } = useContractRead(
    contract,
    "getStats"
  );
  ///////////
  if (allowance?.toString()) {
    isApproved = new BigNumber(allowance.toString()).comparedTo(0) > 0;
  }
  ///////////
  if (isSuccess && contractStats) {
    const _price: any = new BigNumber(contractStats.price.toString()).dividedBy(
      10 ** 18
    );
    const _capital: any = new BigNumber(
      contractStats.usdCapitalRaised.toString()
    ).dividedBy(10 ** 18);
    price = _price.toString();
    capital = _capital.toString();
  }
  ///////////
  //////////
  useEffect(() => {
    setAltAmount(null);
    setAmount(null);
  }, [selectedTkn]);
  useEffect(() => {
    if (selectedTkn == "BNB") {
      if (Number(requiredBnb?.toString()) > 0 && !amount) {
        setAmount(
          BigNumber(requiredBnb.toString())
            .dividedBy(10 ** 18)
            .toFixed(4)
        );
      }
    } else {
      if (Number(price) > 0 && !amount) {
        setAmount(Number(price) * Number(altAmount));
      }
    }
  }, [requiredBnb, selectedTkn, price]);
  useEffect(() => {
    if (selectedTkn == "BNB") {
      if (Number(requiredAgri?.toString()) > 0 && !altAmount) {
        setAltAmount(
          BigNumber(requiredAgri.toString())
            .dividedBy(10 ** 18)
            .toFixed(4)
        );
      }
    } else {
      if (Number(amount) > 0 && Number(price) > 0 && !altAmount) {
        setAltAmount(Number(amount) / Number(price));
      }
    }
  }, [requiredAgri, selectedTkn, price]);
  //////////
  const onApprove = async () => {
    try {
      if (isLoadingApprove) return;
      const writeData = await approve({
        args: [address, toWei(1000000000)],
      });
    } catch (error) {}
  };
  //////////
  const onConfirm = async () => {
    try {
      if (Number(altAmount) > 0) {
        if (selectedTkn == "BNB") {
          if (isLoadingBuyWithBNB) return;
          const writeData = await buyWithBNB({
            args: [toWei(altAmount)],
            overrides: { value: requiredBnb.toString() },
          });
        } else if (selectedTkn == "USDT") {
          if (isLoadingBuyWithUSDT) return;
          const writeData = await buyWithUSDT({
            args: [toWei(altAmount)],
          });
        }
      }
    } catch (error) {}
  };
  //////////
  return {
    balance,
    price,
    capital,
    selectedTkn,
    setSelectedTkn,
    amount,
    setAmount,
    altAmount,
    setAltAmount,
    status,
    setStatus,
    onConfirm,
    onApprove,
    isApproved,
    isLoadingApprove,
    isLoadingBuyWithUSDT,
    isLoadingBuyWithBNB,
  };
};
export default useBuy;