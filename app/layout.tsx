import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import Appbar from "./components/Appbar";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "AI Recipe App",

  description:
    "An app that uses AI to generate recipes based on the users dietary restrictions and preferences.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main className="md:w-[70vw] m-auto px-7">
            <Appbar />
            {children}
            <ToastContainer></ToastContainer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
