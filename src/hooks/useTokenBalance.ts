import abi from "@/constant/abi.json";
import tokenABI from "@/constant/tokenAbi.json";

import { contractAddress, token } from "@/constant/constant";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import BigNumber from "bignumber.js";
type Props = {};

function useTokenBalance() {
  const address = useAddress();
  // const address = "0xcc5eCD824E3864c17bf5AD44083E37A8A25b8B2f";
  let amountFetched = false;
  let totalAgriTokenBought = "";
  const { contract } = useContract(token.address, tokenABI);
  const {
    data: _userTotalBoughtAgri,
    isSuccess: isSuccessUserTotalBoughtAgri,
    error: readError,
  } = useContractRead(contract, "balanceOf", [address]);

  if (_userTotalBoughtAgri && isSuccessUserTotalBoughtAgri) {
    totalAgriTokenBought = Number(
      new BigNumber(_userTotalBoughtAgri.toString())
        .dividedBy(10 ** 18)
        .toFixed(2)
    ).toString();
    amountFetched = true;
  }
  return { amountFetched, totalAgriTokenBought };
}

export default useTokenBalance;
