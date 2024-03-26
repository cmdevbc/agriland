// @ts-nocheck
"use client";
import alt from "@/assets/img/images/alt.png";
import bnb from "@/assets/img/images/bnb.png";
import tractor from "@/assets/img/images/tractor2.png";
import tick from "@/assets/img/images/tick.png";
import usdt from "@/assets/img/images/usdt.svg";
import wallet from "@/assets/img/images/wallet.png";
import loading from "@/assets/img/images/loading.gif";
import classNames from "classnames";
import Image from "next/image";
import styles from "./Buy.module.css";
import useBuy from "../../hooks/useBuy";
import { blockExplorer } from "@/constant/constant";

const Buy = () => {
  //////////
  const {
    balance,
    selectedTkn,
    setSelectedTkn,
    amount,
    setAmount,
    altAmount,
    setAltAmount,
    price,
    capital,
    onConfirm,
    onApprove,
    isApproved,
    isLoadingApprove,
    isLoadingBuyWithUSDT,
    isLoadingBuyWithBNB,
    userTotalBoughtAgri,
    isSuccessBuyWithBNB,
    isSuccessBuyWithUSDT,
    transactionHash,
    setTransactionHash,
  } = useBuy();
  //////////
  let status = 0;
  if (isLoadingBuyWithUSDT || isLoadingBuyWithBNB) {
    status = 1;
  } else if ((isSuccessBuyWithBNB || isSuccessBuyWithUSDT) && transactionHash) {
    status = 2;
  }
  //////////
  return (
    <section className={styles.dashboard}>
      <div className={styles.c1}>
        <div>
          <span className={styles.t1}>{capital}</span>
          &nbsp;&nbsp;&nbsp;
          <span>Capital Raised</span>
        </div>
        <div className={styles.rp}>
          <div className={styles.rp1}>
            <div className={styles.rpt1}>
              <div>Round 1</div>
              <div>|</div>
            </div>
            <div className={styles.rpt2}>
              <div>Round 2</div>
              <div>|</div>
            </div>
          </div>
          <div className={styles.progress}>
            <div className={styles.bar} style={{ width: "80%" }} />
          </div>
          <div className={styles.rp2}>
            <div>Buy Now Before Price Rise</div>
            <div>1 ALT = ${price}</div>
          </div>
        </div>
      </div>
      <div className={styles.c2}>
        <div className={styles.box}>
          <div className={styles.tkns}>
            <div
              onClick={() => setSelectedTkn("BNB")}
              className={classNames(
                styles.tkn,
                selectedTkn == "BNB" && styles.selectedTkn
              )}
            >
              <Image src={bnb} alt="" className={styles.icon} />
              <div>BNB</div>
            </div>
            <div
              onClick={() => setSelectedTkn("USDT")}
              className={classNames(
                styles.tkn,
                selectedTkn == "USDT" && styles.selectedTkn
              )}
            >
              <Image src={usdt} alt="" className={styles.icon} />
              <div>USDT</div>
            </div>
          </div>
          <div className={styles.blnc}>
            <Image src={wallet} alt="" className={styles.icon} />
            <div>
              Wallet Balance:{" "}
              {balance?.displayValue
                ? Number(Number(balance?.displayValue)?.toFixed(4))
                : ""}
            </div>
          </div>
          <div className={styles.inp}>
            <div className={styles.f1}>
              <div className={styles.inpb}>
                <input
                  type="text"
                  lang="en"
                  value={amount ?? ""}
                  onChange={(event: any) => {
                    let inputValue = event.currentTarget.value;
                    inputValue = inputValue?.replace(/^0+(?=\d)/, "");
                    inputValue = inputValue?.replace(/^\./, "0.");

                    const [integerPart, decimalPart] = inputValue.split(".");
                    const l1 = integerPart ? integerPart.length : 0;
                    const l2 = decimalPart ? decimalPart.length : 0;
                    if (l1 + l2 <= 6) {
                      setAmount(inputValue);
                      setAltAmount(null);
                    }
                  }}
                  className={styles.input}
                />
                <Image
                  src={
                    selectedTkn == "BNB"
                      ? bnb
                      : selectedTkn == "USDT"
                      ? usdt
                      : wallet
                  }
                  alt=""
                  className={styles.icon}
                />
                <div className={styles.max}>Max</div>
              </div>
              <div className={styles.hi}>BNB to pay</div>
            </div>
            <div className={styles.f1}>
              <div className={styles.inpb}>
                <input
                  type="text"
                  lang="en"
                  value={altAmount ?? ""}
                  onChange={(event: any) => {
                    let inputValue = event.currentTarget.value;
                    inputValue = inputValue?.replace(/^0+(?=\d)/, "");
                    inputValue = inputValue?.replace(/^\./, "0.");

                    const [integerPart, decimalPart] = inputValue.split(".");
                    const l1 = integerPart ? integerPart.length : 0;
                    const l2 = decimalPart ? decimalPart.length : 0;
                    if (l1 + l2 <= 6) {
                      setAltAmount(inputValue);
                      setAmount(null);
                    }
                  }}
                  className={styles.input}
                />
                <Image src={alt} alt="" className={styles.icon} />
              </div>
              <div className={styles.hi}>$ALT you receive</div>
            </div>
          </div>

          {status == 0 && (
            <>
              {selectedTkn == "USDT" && isApproved == false ? (
                <div onClick={onApprove} className={styles.buy}>
                  <span>Approve</span>
                  {isLoadingApprove && (
                    <Image src={loading} alt="" className={styles.icon} />
                  )}
                </div>
              ) : selectedTkn == "USDT" ? (
                <div onClick={onConfirm} className={styles.buy}>
                  <Image src={usdt} alt="" className={styles.icon} />
                  <span>Buy with USDT</span>
                  {isLoadingBuyWithUSDT && (
                    <Image src={loading} alt="" className={styles.icon} />
                  )}
                </div>
              ) : (
                <div onClick={onConfirm} className={styles.buy}>
                  <Image src={bnb} alt="" className={styles.icon} />
                  <span>Buy with BNB</span>
                  {isLoadingBuyWithBNB && (
                    <Image src={loading} alt="" className={styles.icon} />
                  )}
                </div>
              )}
            </>
          )}
          {status == 1 && (
            <>
              <Image src={tractor} alt="" className={styles.fail} />
              <div className={classNames(styles.pf, styles.cpnt)}>CONFIRM</div>
              <div className={styles.pc}>
                In order to buy {altAmount} Agri with {selectedTkn}, please
                confirm the transaction in your wallet. You may need to check
                the wallet app if you’re on mobile
              </div>
            </>
          )}
          {status == 2 && (
            <>
              <Image src={tick} alt="" className={styles.success} />
              <div className={classNames(styles.pf, styles.cpnt)}>
                PURCHASE SUCCESS!
              </div>
              <div className={styles.pc}>
                Please click on the View Transaction button for more details.
              </div>
              <div className={styles.btns}>
                <div
                  onClick={() =>
                    window.open(blockExplorer + transactionHash, "_blank")
                  }
                  className={styles.btn}
                >
                  View Transaction
                </div>
                <div
                  onClick={() => setTransactionHash(null)}
                  className={styles.btn}
                >
                  Start Again
                </div>
              </div>
            </>
          )}
          <div className={styles.inf}>1 ALT = ${price} </div>
          <div className={styles.lr}>
            <div>Your Purchased $ALT</div>
            <div>{userTotalBoughtAgri}</div>
          </div>
        </div>
        <Image src={tractor} alt="" className={styles.tractor} />
      </div>
    </section>
  );
};
export default Buy;
