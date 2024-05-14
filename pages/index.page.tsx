import { ReactElement } from 'react';
import Link from 'next/link';
import styles from '@/styles/pages/Home.module.css';
import { Button } from '@/src/components/Button';
import { MainLayout } from '@/src/components/Layout';
import Form from '@/src/features/form-page/ui/Form';
import SearchForm from '@/src/features/form-page/ui/SearchForm';
import HookForm from '@/src/features/form-page/ui/HookForm';

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
      <div className={styles.formPage}>
        <div>
          <h2>일반 폼</h2>
          <Form />
        </div>
        <div>
          <h2>검색 폼</h2>
          <SearchForm />
        </div>
        <div>
          <h2>리액트 훅 폼</h2>
          <HookForm />
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
