import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import featureImg_1 from "@/assets/img/images/metamask.png";
import featureImg_2 from "@/assets/img/images/tokens.png";
import featureImg_3 from "@/assets/img/images/quality.png";
import featureImg_4 from "@/assets/img/images/tractor2.png";

interface DataType {
  id: number;
  title: JSX.Element;
  desc: JSX.Element;
  img: StaticImageData;
}
const feature_data: DataType[] = [
  {
    id: 1,
    title: <>1. Install Metamask</>,
    desc: (
      <>
        Navigate to Metamask.io, select the download option, and install the
        Metamask extension. Proceed to follow the instructions to create your
        wallet. It is imperative to safeguard your private key with utmost care,
        as it secures your assets, preventing unauthorized access.
      </>
    ),
    img: featureImg_1,
  },
  {
    id: 2,
    title: <>2. Transfer BNB or USDT to MetaMask</>,
    desc: (
      <>
        Transfer Binance Coin (BNB) or Tether (USDT) on the Binance Smart Chain
        to your MetaMask wallet from your chosen cryptocurrency storage
        location, or directly purchase BNB or USDT via MetaMask. This digital
        currency is essential for acquiring AgriLand tokens.
      </>
    ),
    img: featureImg_2,
  },
  {
    id: 3,
    title: <>3. Purchase on the Official Website</>,
    desc: (
      <>
        AgriLand tokens can only be purchased through this platform for the
        presale. You have the flexibility to use ETH, USDT, BNB, or Card based
        on your preference. Secure your tokens to optimize your investment.
      </>
    ),
    img: featureImg_3,
  },
  {
    id: 4,
    title: <>4. Claim AgriLand Tokens</>,
    desc: (
      <>
        Following the conclusion of the presale, participants are eligible to
        claim their AgriLand tokens on the platform. This marks your integration
        into the AgriLand community, a dynamic group within the cryptocurrency
        ecosystem.
      </>
    ),
    img: featureImg_4,
  },
];
const FeatureOne = () => {
  return (
    <section id="how" className="features-area pt-140 pb-110">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-title text-center mb-70">
              <h2 className="title">How to Buy AGRILAND</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {feature_data.map((item) => (
            <div key={item.id} className="col-lg-6">
              <div className="features-item">
                <div className="features-content">
                  <h2 className="title">
                    <Link href="#!">{item.title}</Link>
                  </h2>
                  <p>{item.desc}</p>
                </div>
                <div className="features-img">
                  <Image width="164" src={item.img} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureOne;
