/**
 * The layout component for the AI Recipe App.
 *
 * @param children - The child components to be rendered within the layout.
 * @returns The layout component.
 */
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import Appbar from "./components/Appbar";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "AI World Recipes",

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
      <head>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
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
