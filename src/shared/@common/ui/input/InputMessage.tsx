import { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

interface InputMessageProps {
  children: ReactNode;
  className?: string;
}

const cx = classNames.bind(styles);

export default function InputMessage({
  children,
  className,
}: InputMessageProps) {
  return <div className={cx('message', className)}>{children}</div>;
}
