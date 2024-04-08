import { ReactNode } from 'react';
import styles from './SignLayout.module.css';

type SignLayoutProps = {
  children: ReactNode;
};

export default function SignLayout({ children }: SignLayoutProps) {
  return <div className={styles.background}>{children}</div>;
}
