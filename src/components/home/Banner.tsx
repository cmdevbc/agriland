"use client";
import CountdownClock from "@/ui/CountDownClock";
import Image from "next/image";
import bannerShape_1 from "@/assets/img/banner/farm1.png";
import bannerShape_2 from "@/assets/img/banner/farm2.png";
import useStats from "@/hooks/useStats";
import { ConnectWallet } from "@thirdweb-dev/react";
import {
  useAddress,
} from "@thirdweb-dev/react";
import { useAppContext } from "@/context/AppContext";
import useTokenBalance from "@/hooks/useTokenBalance";

const Banner = () => {
  const { currentRound, startTimestamp, endTimestamp } = useStats();
  const connectedAddress = useAddress();
  const {tokenPrice} = useAppContext();
  const {amountFetched,totalAgriTokenBought} = useTokenBalance()
  let timestamp = 0;
  let isEndTimeStamp = false;
  if (startTimestamp && endTimestamp) {
    const t0 = Date.now();
    const t1 = parseInt(startTimestamp) * 1000;
    const t2 = parseInt(endTimestamp) * 1000;

    if (t0 < t1) {
      timestamp = t1;
      isEndTimeStamp = false;
    } else if (t0 < t2) {
      timestamp = t2;
      isEndTimeStamp = true;
    }
  }

  const getTotalValue = ()=>{
    if(!tokenPrice || !amountFetched){
      return ;
    }
    return  (Number(totalAgriTokenBought)*Number(tokenPrice)).toFixed(2);
  }

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
              {/* <div className="banner-countdown-wrap">
                {timestamp > 0 && (
                  <div className="coming-time">
                    <CountdownClock endTimestamp={timestamp} />
                  </div>
                )}
              </div> */}
              {/* <div className="banner-content text-center banner-sub-title">
                Countdown Until Round{" "}
                {currentRound != null ? currentRound : undefined}{" "}
                {isEndTimeStamp ? "Ends" : "Starts"}
              </div> */}
             {connectedAddress ? 
             <>
          
             <div className="token-acquired-title">
              Your $ALT Balance
              </div>
              <div>
                
                {  getTotalValue() ?
                <>
                  <span className="token-acquired">{totalAgriTokenBought} ALT </span> {getTotalValue() ?<span  className="equivalent-usd">{`(~ $${getTotalValue()})`}</span>:<></> }
                </>:
                <> </>
                }
               
              </div>
              </>
             :  <div className={"banner-connectBtn"}>
               <ConnectWallet
                            modalTitleIconUrl="/assets/img/banner/logo.png"
                            modalTitle="AGRILAND"
                          />
              </div>}
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
