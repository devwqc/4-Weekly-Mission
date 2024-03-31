import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
import styles from '@/styles/App.module.css';
import { Footer } from '@/src/components/Layout/Footer';
import { Header } from '@/src/components/Layout/Header';
import { LoginProvider } from '@/src/contexts/LoginContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Linkbrary</title>
      </Head>
      <LoginProvider>
        <Header />
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </LoginProvider>
    </>
  );
}
