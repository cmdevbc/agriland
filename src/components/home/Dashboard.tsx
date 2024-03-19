import Image from "next/image";
import styles from "./Dashboard.module.css";
import tractor from "@/assets/img/images/tractor2.png";
import classNames from "classnames";
import bnb from "@/assets/img/images/bnb.png";
import usdt from "@/assets/img/images/usdt.svg";
import card from "@/assets/img/images/card.png";
import wallet from "@/assets/img/images/wallet.png";
import alt from "@/assets/img/images/alt.png";

const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <div className={styles.c1}>
        <div>
          <span className={styles.t1}>$45,256,123</span>
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
            <div>1 ALT = 1$</div>
          </div>
        </div>
      </div>
      <div className={styles.c2}>
        <Image src={tractor} alt="" className={styles.tractor} />

        <div className={styles.box}>
          <div className={styles.tkns}>
            <div className={classNames(styles.tkn, styles.selectedTkn)}>
              <Image src={bnb} alt="" className={styles.icon} />
              <div>BNB</div>
            </div>
            <div className={classNames(styles.tkn)}>
              <Image src={usdt} alt="" className={styles.icon} />
              <div>USDT</div>
            </div>{" "}
            <div className={classNames(styles.tkn)}>
              <Image src={card} alt="" className={styles.icon} />
              <div>Card</div>
            </div>
          </div>
          <div className={styles.blnc}>
            <Image src={wallet} alt="" className={styles.icon} />
            <div>Wallet Balance: 0</div>
          </div>
          <div className={styles.inp}>
            <div className={styles.f1}>
              <div className={styles.inpb}>
                <input className={styles.input} />
                <Image src={bnb} alt="" className={styles.icon} />
                <div className={styles.max}>Max</div>
              </div>
              <div className={styles.hi}>BNB to pay</div>
            </div>
            <div className={styles.f1}>
              <div className={styles.inpb}>
                <input className={styles.input} />
                <Image src={alt} alt="" className={styles.icon} />
              </div>
              <div className={styles.hi}>$ALT you receive</div>
            </div>
          </div>
          <Image src={tractor} alt="" className={styles.fail} />
          <div className={styles.pf}>PURCHASE FAILED!</div>
          <div className={styles.pc}>
            Please click on the View Transaction button for more details.
          </div>
          <div className={styles.btns}>
            <div className={styles.btn}>View Transaction</div>
            <div className={styles.btn}>Start Again</div>
          </div>
          <div className={styles.lr}>
            <div>Your Purchased $ALT</div>
            <div>0</div>
          </div>
        </div>
        <div className={styles.inf}>1 ALT = $1 </div>
      </div>
    </section>
  );
};
export default Dashboard;
