"use client";

import Footer from "@/layout/footer/Footer";
import "../styles/index.css";
import Header from "@/layout/headers/Header";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import DocumentArea from "@/components/common/DocumentArea";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
  trustWallet,
  phantomWallet,
  localWallet,
} from "@thirdweb-dev/react";

const body = Outfit({
  weight: ["100", "200", "300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tg-body-font-family",
});

const heading = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--tg-heading-font-family",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Xeco - ICO & Crypto Landing Page Template"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={` ${body.variable} ${heading.variable}`}
      >
        <ThirdwebProvider
          supportedWallets={[
            metamaskWallet({ recommended: true }),
            coinbaseWallet(),
            walletConnect(),
            localWallet(),
            embeddedWallet({
              auth: {
                options: ["google", "apple", "facebook", "email"],
              },
            }),
            trustWallet(),
            phantomWallet(),
          ]}
          clientId="57295e55d254d258cee1bb8de9c59bcf"
        >
          <Header />
          {children}
          <DocumentArea />
          <Footer />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
