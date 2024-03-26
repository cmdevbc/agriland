"use client";
import CountdownClock from "@/ui/CountDownClock";
import Image from "next/image";
import bannerShape_1 from "@/assets/img/banner/farm1.png";
import bannerShape_2 from "@/assets/img/banner/farm2.png";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import abi from "@/constant/abi.json";
import { contractAddress } from "@/constant/constant";

const Banner = () => {
  const { contract } = useContract(contractAddress, abi);
  const { data: contractStats, isSuccess } = useContractRead(
    contract,
    "getStats"
  );
  const endTimestamp =
    isSuccess && contractStats && contractStats.endTimestamp
      ? parseInt(contractStats.endTimestamp.toString()) * 1000
      : 0;

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
              <div className="banner-countdown-wrap">
                {endTimestamp > 0 && (
                  <div className="coming-time">
                    <CountdownClock endTimestamp={endTimestamp} />
                  </div>
                )}
              </div>
              <div className="banner-content text-center banner-sub-title">
                Countdown until Round 1 ends
              </div>
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
