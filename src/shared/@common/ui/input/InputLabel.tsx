import { LabelHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
  hide?: boolean;
}

const cx = classNames.bind(styles);

export default function InputLabel({
  children,
  className,
  hide,
  ...rest
}: InputLabelProps) {
  return (
    <label className={cx('label', { hide }, className)} {...rest}>
      {children}
    </label>
  );
}
