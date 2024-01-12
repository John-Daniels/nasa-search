/* eslint-disable @next/next/no-script-component-in-head */
import AppProvider from "@/components/providers/AppProvider";
import "@/styles/globals.scss";
import { Mulish, Poppins } from "next/font/google";
import { ReactNode } from "react";

export const metadata = {
  title: "Space Search",
  description: "Space Search",
  icons: {
    icon: ["/logo.svg"],
    // icon: ["/favicon.ico?v=4"],
    // apple: ["/apple-touch-icon.png?v=4"],
    // shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  // preload: true,
});

const mulish = Mulish({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
  // preload: true,
});

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="">
        <AppProvider>
          <div className="bg-[#000]">
            <main className={`relative  w-full max-w-full  ${poppins.variable} ${mulish.variable} font-poppins `}>
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
};

export default Layout;
