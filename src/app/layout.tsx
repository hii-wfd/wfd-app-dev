import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import Providers from "./providers";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Workforce Development App Prototype",
  description: "Created by the WFD team to test out new ideas and concepts for the WFD app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="wrapper">
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}