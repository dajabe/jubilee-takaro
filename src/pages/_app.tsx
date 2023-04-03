import { type AppProps, type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
// import { type Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
