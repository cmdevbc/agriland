// @ts-nocheck
"use client";
import alt from "@/assets/img/images/alt.png";
import bnb from "@/assets/img/images/bnb.png";
import card from "@/assets/img/images/card.png";
import tractor from "@/assets/img/images/tractor2.png";
import usdt from "@/assets/img/images/usdt.svg";
import wallet from "@/assets/img/images/wallet.png";
import classNames from "classnames";
import Image from "next/image";
import styles from "./Dashboard.module.css";
import useBuy from "./useBuy";

const Dashboard = () => {
  //////////
  const {
    balance,
    selectedTkn,
    setSelectedTkn,
    amount,
    setAmount,
    altAmount,
    setAltAmount,
    status,
    setStatus,
    price,
    capital,
    onConfirm,
  } = useBuy();
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
            </div>{" "}
            <div
              onClick={() => setSelectedTkn("CARD")}
              className={classNames(
                styles.tkn,
                selectedTkn == "CARD" && styles.selectedTkn
              )}
            >
              <Image src={card} alt="" className={styles.icon} />
              <div>Card</div>
            </div>
          </div>
          <div className={styles.blnc}>
            <Image src={wallet} alt="" className={styles.icon} />
            <div>Wallet Balance: {balance?.displayValue}</div>
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
          <div></div>
          {status == 0 && (
            <div onClick={onConfirm} className={styles.buy}>
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
              <span>Buy with {selectedTkn}</span>
            </div>
          )}
          {status == 13 && (
            <Image src={tractor} alt="" className={styles.fail} />
          )}

          {status == 13 && (
            <div className={classNames(styles.pf, styles.cpnt)}>CONFIRM</div>
          )}
          {status == 13 && (
            <div className={styles.pc}>
              In order to buy $ALT with BNB, please confirm the transaction in
              your wallet. You may need to check the wallet app if you’re on
              mobile
            </div>
          )}
          {status == 13 && (
            <div className={styles.pc}>
              Please click on the View Transaction button for more details.
            </div>
          )}
          {status == 13 && (
            <div className={styles.btns}>
              <div className={styles.btn}>View Transaction</div>
              <div className={styles.btn}>Start Again</div>
            </div>
          )}
          <div className={styles.inf}>1 ALT = ${price} </div>

          <div className={styles.lr}>
            <div>Your Purchased $ALT</div>
            <div>0</div>
          </div>
        </div>
        <Image src={tractor} alt="" className={styles.tractor} />
      </div>
    </section>
  );
};
export default Dashboard;
