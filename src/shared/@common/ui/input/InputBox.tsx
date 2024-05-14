import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import styles from './Input.module.scss';

interface InputBoxProps {
  children: ReactNode;
  isError?: boolean;
  className?: string;
}

const cx = classNames.bind(styles);

export default function InputBox({
  children,
  isError,
  className,
}: InputBoxProps) {
  return (
    <div className={cx('box', { error: isError }, className)}>{children}</div>
  );
}
