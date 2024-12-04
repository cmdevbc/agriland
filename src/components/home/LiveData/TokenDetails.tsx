import React from "react";
import styles from "./livedata.module.css";
import logo from "@/assets/img/banner/logo.png";
import Image from "next/image";
import useBuy from "@/hooks/useBuy";
import { useAppContext } from "@/context/AppContext";
import useTokenBalance from "@/hooks/useTokenBalance";
import {
  contractAddress,
  token,
  usdtContractAddress,
} from "@/constant/constant";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { numberWithCommas } from "@/utils/utils";
type Props = {};

function TokenDetails({}: Props) {
  const { addToken } = useBuy();
  const { tokenPrice, setTokenPrice } = useAppContext();
  const tokenAddress = token?.address;
  const _goToSwap = () => {
    window.open(
      `https://pancakeswap.finance/?chain=bsc&outputCurrency=${tokenAddress}`,
      "_blank"
    );
  };

  const connectedAddress = useAddress();
  const { amountFetched, totalAgriTokenBought } = useTokenBalance();

  const getTotalValue = () => {
    if (!tokenPrice || !amountFetched) {
      return;
    }
    return numberWithCommas(
      (Number(totalAgriTokenBought) * Number(tokenPrice)).toFixed(2)
    );
  };

  return (
    <>
      <div className={styles.tokenD}>
        <div className={styles.icon}>
          <Image src={logo} width="50" height="50" alt="Logo" />
        </div>

        <div className={styles.price}>${tokenPrice?.toFixed(3)}</div>
      </div>
      {/* <div className={styles.pancakeSwapBtn} onClick={_goToSwap}>
        Buy / Sell
      </div> */}

      {connectedAddress ? (
        <>
          <div className="token-acquired-title">Your $ALT Balance</div>
          <div className="token-acquired-flex">
            {getTotalValue() ? (
              <>
                <span className="token-acquired">
                  {totalAgriTokenBought} ALT{" "}
                </span>{" "}
                {getTotalValue() ? (
                  <span className="equivalent-usd">{`(~ $${getTotalValue()})`}</span>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <> </>
            )}
          </div>
        </>
      ) : (
        <div className={"graph-connectBtn"}>
          <ConnectWallet
            modalTitleIconUrl="/assets/img/banner/logo.png"
            modalTitle="AGRILAND"
          />
        </div>
      )}

      <div className={styles.add} onClick={addToken}>
        Add $ALT to Wallet
      </div>
    </>
  );
}

export default TokenDetails;
