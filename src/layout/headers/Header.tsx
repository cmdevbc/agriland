"use client";
import Link from "next/link";
import { useState } from "react";
import UseSticky from "../../hooks/UseSticky";
import Image from "next/image";
import NavMenu from "./Menu/NavMenu";
import { ConnectWallet } from "@thirdweb-dev/react";

import logo from "@/assets/img/banner/logo.png";

const Header = () => {
  const { sticky } = UseSticky();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [offCanvas, setOffCanvas] = useState<boolean>(false);

  return (
    <>
      <header id="header">
        <div
          id="sticky-header"
          className={`menu-area transparent-header ${
            sticky ? "sticky-menu" : ""
          }`}
        >
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="menu-wrap">
                  <nav className="menu-nav">
                    <div className="logo">
                      <Link href="/">
                        <Image src={logo} width="30" height="30" alt="Logo" />
                        <div className="text-xxl">AGRILAND</div>
                      </Link>
                    </div>
                    <div className="navbar-wrap main-menu d-none d-lg-flex">
                      <NavMenu />
                    </div>
                    <div className="header-action">
                      <ul className="list-wrap">
                        <li className="header-login">
                          <ConnectWallet />
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
