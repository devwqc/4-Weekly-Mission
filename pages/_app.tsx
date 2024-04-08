import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
import { LoginProvider } from '@/src/contexts/LoginContext';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Linkbrary</title>
      </Head>
      <LoginProvider>{getLayout(<Component {...pageProps} />)}</LoginProvider>
    </>
  );
}
