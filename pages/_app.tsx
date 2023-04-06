import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "@d20/styles/globals.css";
import Header from "@d20/Components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="h-screen overflow-y-scroll bg-slate-200">
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
