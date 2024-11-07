import React from "react";
import styles from "./livedata.module.css";
import logo from "@/assets/img/banner/logo.png";
import Image from "next/image";
import useBuy from "@/hooks/useBuy";
type Props = {};

function TokenDetails({}: Props) {
  const { addToken } = useBuy();
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.tokenD}>
        <div className={styles.icon}>
          <Image src={logo} width="50" height="50" alt="Logo" />
        </div>

        <div className={styles.price}>$1.314</div>
      </div>
      <div className={styles.pancakeSwapBtn}>Buy / Sell</div>

      <div className={styles.add} onClick={addToken}>
        Add $ALT to Wallet
      </div>
    </div>
  );
}

export default TokenDetails;
