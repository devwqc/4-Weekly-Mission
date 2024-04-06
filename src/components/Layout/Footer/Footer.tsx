import {
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconYoutube,
} from '@/src/components/Icon';
import styles from './Footer.module.css';
import Link from 'next/link';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__copyright}>©codeit - 2023</div>
        <div className={styles.footer__links}>
          <div className={styles.links}>
            <Link href="/" className={styles.links__item}>
              Privacy Policy
            </Link>
            <Link href="/" className={styles.links__item}>
              FAQ
            </Link>
          </div>
        </div>
        <div className={styles.footer__sns}>
          <div className={styles.sns}>
            <Link href="/" className={styles.sns__item}>
              <IconFacebook />
            </Link>
            <Link href="/" className={styles.sns__item}>
              <IconTwitter />
            </Link>
            <Link href="/" className={styles.sns__item}>
              <IconYoutube />
            </Link>
            <Link href="/" className={styles.sns__item}>
              <IconInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
