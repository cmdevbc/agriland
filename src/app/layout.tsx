"use client";

import Footer from "@/layout/footer/Footer";
import "../styles/index.css";
import Header from "@/layout/headers/Header";
import { Outfit, Plus_Jakarta_Sans, Inter } from "next/font/google";
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
  useAddress,
  useChainId,
  useSwitchChain,
} from "@thirdweb-dev/react";
import { useEffect } from "react";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
        <meta name="description" content="Agriland" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={` ${inter.variable} ${heading.variable}`}
      >
        <ThirdwebProvider
          activeChain={"binance-testnet"}
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
          <AppLayout> {children}</AppLayout>
          <DocumentArea />
          <Footer />
        </ThirdwebProvider>
      </body>
    </html>
  );
}

const AppLayout = ({ children }: { children: any }) => {
  const address = useAddress();
  const chainId = useChainId();
  const switchChain = useSwitchChain();
  useEffect(() => {
    if (address && chainId && chainId != 97) {
      switchChain(97);
    }
  }, [address]);

  return <>{children}</>;
};
