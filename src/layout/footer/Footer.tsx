"use client";
import Image from "next/image";
import Link from "next/link";

import footerShape_1 from "@/assets/img/images/footer_shape01.png";
import footerShape_2 from "@/assets/img/images/footer_shape02.png";
import NewsletterForm from "@/components/forms/NewsletterForm";

interface DataType {
  id: number;
  class_name: string;
  title: string;
  footer_link: {
    link: string;
    link_title: string;
  }[];
}

const footer_data: DataType[] = [
  {
    id: 1,
    class_name: "col-xl-3 col-lg-3 col-md-4 col-sm-6",
    title: "Usefull Links",
    footer_link: [
      { link: "/contact", link_title: "Contact us" },
      { link: "/contact", link_title: "How it Works" },
      { link: "/contact", link_title: "Create" },
      { link: "/contact", link_title: "Explore" },
      { link: "/contact", link_title: "Terms & Services" },
    ],
  },
  {
    id: 2,
    class_name: "col-xl-3 col-lg-2 col-md-4 col-sm-6",
    title: "SOLUTIONS",
    footer_link: [
      { link: "/contact", link_title: "Token Suite" },
      { link: "/contact", link_title: "Ecosystem" },
      { link: "/contact", link_title: "Investment" },
      { link: "/contact", link_title: "Portal" },
      { link: "/contact", link_title: "Tokenization" },
    ],
  },
  {
    id: 3,
    class_name: "col-xl-3 col-lg-3 col-md-4 col-sm-4",
    title: "Usefull Links",
    footer_link: [
      { link: "/contact", link_title: "Help Center" },
      { link: "/contact", link_title: "Partners" },
      { link: "/contact", link_title: "Suggestions" },
      { link: "/blog", link_title: "Blog" },
      { link: "/contact", link_title: "Newsletters" },
    ],
  },
];

const Footer = () => {
  return (
    <footer>
      <div
        className="footer-area footer-bg"
        style={{ backgroundImage: `url(/assets/img/bg/footer_bg.png)` }}
      >
        <div className="container">
          <div className="footer-bottom">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright-text">
                  <p>Copyright © 2024 Agriland. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-shape-wrap">
          <Image src={footerShape_1} alt="" className="alltuchtopdown" />
          <Image src={footerShape_2} alt="" className="leftToRight" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
