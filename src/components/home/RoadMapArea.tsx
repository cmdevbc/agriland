"use client";
import Slider from "react-slick";

interface DataTyfe {
  id: number;
  roadmap_title: string;
  title: string;
  desc: JSX.Element;
}

const roadmap_data: DataTyfe[] = [
  {
    id: 1,
    roadmap_title: "",
    title: "Overview",
    desc: (
      <>
        The AgriLand Token (ALT) harnesses blockchain technology to
        revolutionize access to agricultural land investments, opening doors
        once closed to all but large investors or institutions. ALT stands as a
        beacon for change in the investment landscape, making it a pioneering
        opportunity for global participants.
      </>
    ),
  },
  {
    id: 2,
    roadmap_title: "",
    title: "Mission",
    desc: (
      <>
        ALTs mission is to convert agricultural land into digital shares, easily
        traded on a blockchain platform. This innovative approach brings a new
        level of accessibility to investing in farmland, allowing for fractional
        ownership and the potential for diversification within investors
        portfolios.
      </>
    ),
  },
  {
    id: 3,
    roadmap_title: "",
    title: "Opportunities",
    desc: (
      <>
        With ALT, the complexity and high costs traditionally associated with
        agricultural investments are significantly reduced. Investors benefit
        from blockchains efficiency and transparency, which streamlines
        transactions and provides clear ownership records. This makes investing
        in agriculture more attractive and feasible for a wider audience.
      </>
    ),
  },
  {
    id: 4,
    roadmap_title: "",
    title: "Vision",
    desc: (
      <>
        ALT invests in sustainable agriculture, ensuring environmental health
        and long-term productivity. This approach makes ALT not only a smart
        financial choice but also a contribution to a resilient and sustainable
        food system for future generations.
      </>
    ),
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  centerMode: true,
  centerPadding: "260px",
  autoplay: true,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerPadding: "100px",
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        enterPadding: "0",
        centerMode: false,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        enterPadding: "0",
        centerMode: false,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        enterPadding: "0",
        centerMode: false,
      },
    },
  ],
};

const RoadMapArea = () => {
  return (
    <section id="roadMap" className="roadmap-area pt-140">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-lg-12">
            <div className="section-title text-center mb-70">
              <h2 className="title">Our Roadmap</h2>
            </div>
          </div>
        </div>
        <Slider {...settings} className="row roadMap-active">
          {roadmap_data.map((item) => (
            <div key={item.id} className="col-lg-4">
              <div className="roadmap-item">
                <div className="roadmap-content">
                  <h4 className="title">
                    <span className="dot"></span>
                    {item.title}
                  </h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default RoadMapArea;
