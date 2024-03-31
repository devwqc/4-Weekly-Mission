import Image from 'next/image';
import { InputHTMLAttributes, useState } from 'react';
import styles from './input.module.css';
import eyeOnImg from '@/public/images/eye-on.svg';
import eyeOffImg from '@/public/images/eye-off.svg';
import hasInitialInputType from '@/src/utils/hasInitialInputType';

type InputProps = {
  type?: string;
  className?: string;
  hasVisibleToggler?: boolean;
  initialIsVisible?: boolean;
  message?: string;
  isError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

function InputBongchan({
  type: initialType = 'text',
  className = '',
  hasVisibleToggler = false,
  initialIsVisible = false,
  message = '',
  isError = false,
  ...rest
}: InputProps) {
  const [type, setType] = useState(
    hasInitialInputType(hasVisibleToggler, initialIsVisible)
      ? initialType === 'password'
        ? 'text'
        : initialType
      : 'password',
  );
  const [isVisible, setIsVisible] = useState(initialIsVisible);

  const handleVisibleToggle = () => {
    const nextType = isVisible
      ? 'password'
      : initialType === 'password'
        ? 'text'
        : initialType;
    setType(nextType);
    setIsVisible((preIsVisible) => !preIsVisible);
  };

  const classNames = `${styles.input} ${
    styles[isError ? 'error' : '']
  } ${className}`;
  return (
    <div>
      <div>
        <input type={type} className={classNames} {...rest} />
        {hasVisibleToggler && (
          <button type="button" onClick={handleVisibleToggle}>
            <Image
              src={isVisible ? eyeOnImg : eyeOffImg}
              alt={isVisible ? '눈 뜸' : '눈 감음'}
            />
          </button>
        )}
      </div>
      <p>{message}</p>
    </div>
  );
}

export default InputBongchan;
