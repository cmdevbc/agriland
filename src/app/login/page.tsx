import Login from "@/components/login";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
  title: "Agriland",
};
const index = () => {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
};

export default index;
