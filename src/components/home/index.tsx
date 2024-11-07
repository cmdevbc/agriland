import Banner from "./Banner";
import Brand from "./Brand";
import ChartArea from "./ChartArea";
import Contribution from "./Contribution";
import Buy from "./Buy";
import DownloadArea from "./DownloadArea";
import FAQ from "./Faq";
import FeatureOne from "./FeatureOne";
import FeatureTwo from "./FeatureTwo";
import RoadMapArea from "./RoadMapArea";
import Team from "./Team";
import LiveData from "./LiveData/LiveData";

const Home = () => {
  return (
    <>
      <Banner />
      {/* <Buy /> */}
      {/*<Contribution />*/}
      <LiveData />
      <FeatureOne />
      <RoadMapArea />
    </>
  );
};

export default Home;
