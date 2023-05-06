import type { FC } from "react";
import { Inter } from "next/font/google";
import Head from "next/head";
import NavBar from "~/components/nav-bar";

interface LayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Fii Practic</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <NavBar />
        <div className="container pt-20">{children}</div>
      </div>
    </>
  );
};

export default Layout;
