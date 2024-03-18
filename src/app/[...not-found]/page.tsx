import Error from "@/components/error/Index";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
  title: "Agriland || 404",
};
const index = () => {
  return (
    <Wrapper>
      <Error />
    </Wrapper>
  );
};

export default index;
