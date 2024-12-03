import abi from "@/constant/abi.json";

import {
  contractAddress,
} from "@/constant/constant";
import {
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import BigNumber from "bignumber.js";
type Props = {}

function useTokenBalance() {

    const address = useAddress();
    let amountFetched = false;
    let totalAgriTokenBought = "";
    const { contract } = useContract(contractAddress, abi);
    const {
        data: _userTotalBoughtAgri,
        isSuccess: isSuccessUserTotalBoughtAgri,
      } = useContractRead(contract, "userTotalBoughtAgri", [address]);

      if (_userTotalBoughtAgri && isSuccessUserTotalBoughtAgri) {
        totalAgriTokenBought = Number(
          new BigNumber(_userTotalBoughtAgri.toString())
            .dividedBy(10 ** 18)
            .toFixed(2)
        ).toString();
        amountFetched =true;
      }
      return {amountFetched,totalAgriTokenBought}
}

export default useTokenBalance