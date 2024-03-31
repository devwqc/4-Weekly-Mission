import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { Signup } from '@/src/components/Signup';
import { Button } from '@/src/components/Button';

export default function Home() {
  return (
    <div className={styles.landing}>
      <h1>Landing page</h1>
      <div className={styles.linkContainer}>
        <div>
          <Link href="/shared">
            <Button>shared 페이지</Button>
          </Link>
        </div>
        <div>
          <Link href="/folder">
            <Button>folder 페이지</Button>
          </Link>
        </div>
      </div>
      <Signup />
    </div>
  );
}
