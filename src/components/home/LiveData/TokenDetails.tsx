import React from "react";
import styles from "./livedata.module.css";
import logo from "@/assets/img/banner/logo.png";
import Image from "next/image";
import useBuy from "@/hooks/useBuy";
import { useAppContext } from "@/context/AppContext";
import {
  contractAddress,
  token,
  usdtContractAddress,
} from "@/constant/constant";
type Props = {};

function TokenDetails({}: Props) {
  const { addToken } = useBuy();
  const { tokenPrice, setTokenPrice } = useAppContext();
  const tokenAddress  = token?.address;
  const _goToSwap = ()=>{
    window.open(`https://pancakeswap.finance/?chain=bsc&outputCurrency=${tokenAddress}`,"_blank")
  }
  return (
    <>
      <div className={styles.tokenD}>
        <div className={styles.icon}>
          <Image src={logo} width="50" height="50" alt="Logo" />
        </div>

        <div className={styles.price}>${tokenPrice?.toFixed(2)}</div>
      </div>
      <div className={styles.pancakeSwapBtn} onClick={_goToSwap}>Buy / Sell</div>

      <div className={styles.add} onClick={addToken}>
        Add $ALT to Wallet
      </div>
    </>
  );
}

export default TokenDetails;
