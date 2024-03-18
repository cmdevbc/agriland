"use client";
import Image from "next/image";
import CountdownClock from "@/ui/CountDownClock";

import bannerShape_1 from "@/assets/img/banner/tractor.png";
import bannerShape_2 from "@/assets/img/banner/hand.png";

const Banner = () => {
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
              <p>Transforming Land Ownership one token at a time.</p>
              <div className="banner-countdown-wrap">
                <div className="coming-time" data-countdown="2024/8/29">
                  <CountdownClock />
                </div>
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
        <Image src={bannerShape_1} alt="" className="leftToRight" />
        <Image src={bannerShape_2} alt="" className="alltuchtopdown" />
      </div>
    </section>
  );
};

export default Banner;
