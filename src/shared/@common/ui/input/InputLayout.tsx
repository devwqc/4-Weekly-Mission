import classNames from 'classnames/bind';
import { PropsWithChildren, ReactNode } from 'react';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

interface InputLayoutProps extends PropsWithChildren {
  className?: string;
}

export default function InputLayout({ children, className }: InputLayoutProps) {
  return <div className={cx('layout', className)}>{children}</div>;
}
