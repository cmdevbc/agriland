import BlogDetails from "@/components/blogs/blog-details";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
  title: "Agriland",
};
const index = () => {
  return (
    <Wrapper>
      <BlogDetails />
    </Wrapper>
  );
};

export default index;
