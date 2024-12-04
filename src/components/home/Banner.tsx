"use client";
import CountdownClock from "@/ui/CountDownClock";
import Image from "next/image";
import bannerShape_1 from "@/assets/img/banner/farm1.png";
import bannerShape_2 from "@/assets/img/banner/farm2.png";
import useStats from "@/hooks/useStats";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { useAppContext } from "@/context/AppContext";
import useTokenBalance from "@/hooks/useTokenBalance";
import { timerEndTimeStamp } from "@/constant/constant";
import { numberWithCommas } from "@/utils/utils";

const Banner = () => {
  // const { currentRound, startTimestamp, endTimestamp } = useStats();

  const connectedAddress = useAddress();
  const { tokenPrice } = useAppContext();
  const { amountFetched, totalAgriTokenBought } = useTokenBalance();
  let isEndTimeStamp = false;

  if (timerEndTimeStamp) {
    const t0 = Date.now();
    const t2 = timerEndTimeStamp;

    // console.log("t0", t0);

    if (t0 < t2) {
      isEndTimeStamp = false;
    } else {
      isEndTimeStamp = true;
    }
  }

  const getTotalValue = () => {
    if (!tokenPrice || !amountFetched) {
      return;
    }
    return numberWithCommas(
      (Number(totalAgriTokenBought) * Number(tokenPrice)).toFixed(2)
    );
  };

  return (
    <section
      className="banner-area banner-bg"
      style={{ backgroundImage: `url(/assets/img/banner/banner_bg.png)` }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="banner-content text-center">
              <h2 className="title">
                Grow your Investments,
                <br /> <span>Seed the Future with Agriland Token</span>
              </h2>
              <p>Transforming Land Ownership One Token at a Time</p>

              {timerEndTimeStamp && !isEndTimeStamp && (
                <>
                  <div className="banner-countdown-wrap">
                    <div className="coming-time">
                      <CountdownClock endTimestamp={timerEndTimeStamp} />
                    </div>
                  </div>
                  <div className="banner-content text-center banner-sub-title">
                    Countdown to Binance, OKX and MEXC listing AGRI
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="banner-scroll-down">
        <a href="#contribution" className="section-link">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <div className="banner-shape-wrap">
        <Image src={bannerShape_1} width={239} alt="" className="leftToRight" />
        <Image
          src={bannerShape_2}
          width={239}
          alt=""
          className="alltuchtopdown"
        />
      </div>
    </section>
  );
};

export default Banner;
