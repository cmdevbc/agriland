"use client";
import CountdownClock from "@/ui/CountDownClock";
import Image from "next/image";
import bannerShape_1 from "@/assets/img/banner/farm1.png";
import bannerShape_2 from "@/assets/img/banner/farm2.png";
import useStats from "@/hooks/useStats";

const Banner = () => {
  const { currentRound, startTimestamp, endTimestamp } = useStats();

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
              <div className="banner-content text-center banner-sub-title">
                Token Launch on the 29th of November, 2024
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
