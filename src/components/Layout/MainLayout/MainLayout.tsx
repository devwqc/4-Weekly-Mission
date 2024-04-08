import { ReactNode } from 'react';
import styles from './MainLayout.module.css';
import { Header } from '@/src/components/Layout/Header';
import { Footer } from '@/src/components/Layout/Footer';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
