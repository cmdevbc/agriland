import Home from "@/components/home";
import Wrapper from "@/layout/Wrapper";
import { useEffect } from "react";

export const metadata = {
  title: "Agriland",
};
const index = () => {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
};

export default index;
