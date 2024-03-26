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

const useBuy = () => {
  const [status, setStatus] = useState(0);
  const address = useAddress();
  const [selectedTkn, setSelectedTkn] = useState("BNB");
  const [transactionHash, setTransactionHash] = useState<any>();
  const [amount, setAmount] = useState<any>();
  const [altAmount, setAltAmount] = useState<any>();
  const { data: balance } = useBalance(
    selectedTkn == "USDT" ? usdtContractAddress : undefined
  );
  let price = "";
  let progress = 0;
  let capital = "";
  let isApproved = undefined;
  let userTotalBoughtAgri = "";
  ///////////////////
  const { contract } = useContract(contractAddress, abi);
  const { contract: usdtContract } = useContract(usdtContractAddress, erc20Abi);
  ////////
  const {
    data: _userTotalBoughtAgri,
    isSuccess: isSuccessUserTotalBoughtAgri,
  } = useContractRead(contract, "userTotalBoughtAgri", [address]);
  const { data: requiredAgri } = useContractRead(contract, "getAgriByBNB", [
    Number(amount) > 0 ? toWei(Number(amount)) : 0,
  ]);
  const { data: requiredBnb } = useContractRead(contract, "getRequiredBNB", [
    Number(altAmount) > 0 ? toWei(Number(altAmount)) : 0,
  ]);
  const { mutateAsync: approve, isLoading: isLoadingApprove } =
    useContractWrite(usdtContract, "approve");
  const { data: allowance } = useContractRead(usdtContract, "allowance", [
    address,
    contractAddress,
  ]);
  const {
    mutateAsync: buyWithBNB,
    isLoading: isLoadingBuyWithBNB,
    isSuccess: isSuccessBuyWithBNB,
    isError: isErrorBuyWithBNB,
  } = useContractWrite(contract, "buyWithBNB");
  const {
    mutateAsync: buyWithUSDT,
    isLoading: isLoadingBuyWithUSDT,
    isSuccess: isSuccessBuyWithUSDT,
    isError: isErrorBuyWithUSDT,
  } = useContractWrite(contract, "buyWithUSDT");
  const { data: contractStats, isSuccess } = useContractRead(
    contract,
    "getStats"
  );
  const { data: totalAgriPool } = useContractRead(
    contract,
    "totalAgriPool",
    []
  );
  ///////////
  if (contractStats?.totalPool && contractStats?.amountSold) {
    const n1 = new BigNumber(contractStats.totalPool.toString());
    const n2 = new BigNumber(contractStats.amountSold.toString());
    progress = Number(n2.dividedBy(n1).multipliedBy(100).toString());
  }
  console.log(totalAgriPool);
  if (allowance?.toString()) {
    isApproved = new BigNumber(allowance.toString()).comparedTo(0) > 0;
  }
  ///////////
  if (_userTotalBoughtAgri && isSuccessUserTotalBoughtAgri) {
    userTotalBoughtAgri = Number(
      new BigNumber(_userTotalBoughtAgri.toString())
        .dividedBy(10 ** 18)
        .toFixed(2)
    ).toString();
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
    setAltAmount(0);
    setAmount(0);
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
        args: [contractAddress, toWei(1000000000)],
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
          if (writeData?.receipt?.transactionHash) {
            setTransactionHash(writeData?.receipt?.transactionHash);
          }
        } else if (selectedTkn == "USDT") {
          if (isLoadingBuyWithUSDT) return;
          const writeData = await buyWithUSDT({
            args: [toWei(altAmount)],
          });
          if (writeData?.receipt?.transactionHash) {
            setTransactionHash(writeData?.receipt?.transactionHash);
          }
        }
      }
    } catch (error) {}
  };
  //////////
  const addToken = async () => {
    console.log(111);
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: 18,
        },
      },
    });
  };
  //////////
  useEffect(() => {
    if (isLoadingBuyWithUSDT || isLoadingBuyWithBNB) {
      setStatus(1);
    } else if (isSuccessBuyWithBNB || isSuccessBuyWithUSDT) {
      setStatus(2);
    } else if (isErrorBuyWithBNB || isErrorBuyWithUSDT) {
      setStatus(3);
    }
  }, [
    isLoadingBuyWithUSDT,
    isLoadingBuyWithBNB,
    isErrorBuyWithBNB,
    isErrorBuyWithUSDT,
    isSuccessBuyWithBNB,
    isSuccessBuyWithUSDT,
  ]);
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
    onConfirm,
    onApprove,
    isApproved,
    isLoadingApprove,
    isLoadingBuyWithUSDT,
    isLoadingBuyWithBNB,
    userTotalBoughtAgri,
    transactionHash,
    isSuccessBuyWithBNB,
    isSuccessBuyWithUSDT,
    status,
    setStatus,
    addToken,
    progress,
  };
};
export default useBuy;
