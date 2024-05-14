import Image from 'next/image';
import { FormEvent, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Form.module.scss';
import Input from '@/src/shared/@common/ui/input';

const cx = classNames.bind(styles);

export default function SearchForm() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(searchInputRef.current?.value);
  };

  return (
    <form className={cx('form')} onSubmit={handleSubmit}>
      <Input>
        <Input.Box>
          <Image
            src="/images/search.svg"
            alt="검색 돋보기"
            width={24}
            height={24}
            onClick={handleSubmit}
          />
          <Input.Field
            type="text"
            placeholder="검색어를 입력해 주세요."
            ref={searchInputRef}
          />
        </Input.Box>
      </Input>
      <button type="submit">제출</button>
    </form>
  );
}
