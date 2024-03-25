import abi from "@/constant/abi.json";
import { contractAddress, usdtContractAddress } from "@/constant/address";
import {
  toWei,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";

const useBuy = () => {
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
  ///////////////////
  const { contract } = useContract(contractAddress, abi);
  const { data: requiredAgri } = useContractRead(contract, "getAgriByBNB", [
    Number(amount) > 0 ? toWei(Number(amount)) : 0,
  ]);
  const { data: requiredBnb } = useContractRead(contract, "getRequiredBNB", [
    Number(altAmount) > 0 ? toWei(Number(altAmount)) : 0,
  ]);
  const { mutateAsync: buyWithBNB } = useContractWrite(contract, "buyWithBNB");
  const { mutateAsync: buyWithUSDT } = useContractWrite(
    contract,
    "buyWithUSDT"
  );
  const { data: contractStats, isSuccess } = useContractRead(
    contract,
    "getStats"
  );
  ///////////
  if (isSuccess && contractStats) {
    const _price: any = new BigNumber(contractStats.price.toString()).dividedBy(
      10 ** 18
    );
    price = _price.toString();
    capital = contractStats.usdCapitalRaised.toString();
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
  const onConfirm = async () => {
    if (Number(altAmount) > 0) {
      if (selectedTkn == "BNB") {
        const writeData = await buyWithBNB({
          args: [toWei(altAmount)],
        });
        console.log(writeData);
      } else if (selectedTkn == "USDT") {
        const writeData = await buyWithUSDT({
          args: [toWei(altAmount)],
        });
        console.log(writeData);
      }
    }
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
  };
};
export default useBuy;
