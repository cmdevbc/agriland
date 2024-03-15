import Blog from "@/components/blogs/blog";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
  title: "Agriland",
};
const index = () => {
  return (
    <Wrapper>
      <Blog />
    </Wrapper>
  );
};

export default index;
