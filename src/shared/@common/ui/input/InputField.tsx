import classNames from 'classnames/bind';
import {
  ForwardedRef,
  InputHTMLAttributes,
  MouseEvent,
  forwardRef,
  useState,
} from 'react';
import Image, { ImageProps } from 'next/image';

import styles from './Input.module.scss';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  hasVisibleToggler?: boolean;
  initialIsVisible?: boolean;
  visibleTogglerAttributes?: Partial<ImageProps>;
  inVisibleTogglerAttributes?: Partial<ImageProps>;
}

const cx = classNames.bind(styles);

const InputField = forwardRef(
  (
    {
      type: initialType,
      className,
      hasVisibleToggler = false,
      initialIsVisible = false,
      visibleTogglerAttributes,
      inVisibleTogglerAttributes,
      ...rest
    }: InputFieldProps,
    ref?: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isVisible, setIsVisible] = useState(initialIsVisible);

    let type = initialType;
    if (hasVisibleToggler) {
      type = isVisible ? (type === 'password' ? 'text' : type) : 'password';
    }

    const handleVisibleToggler = (e: MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      setIsVisible((prev) => !prev);
    };

    return (
      <div className={cx('inputContainer')}>
        <input
          type={type}
          className={cx('input', className)}
          {...rest}
          ref={ref}
        />
        {hasVisibleToggler &&
          (isVisible ? (
            <Image
              className={cx('visibleToggler')}
              src="/images/eye-open.svg"
              alt="내용이 보이는 눈모양"
              width={24}
              height={24}
              onClick={handleVisibleToggler}
              {...visibleTogglerAttributes}
            />
          ) : (
            <Image
              className={cx('visibleToggler')}
              src="/images/eye-close.svg"
              alt="내용이 보이지 않는 눈모양"
              width={24}
              height={24}
              onClick={handleVisibleToggler}
              {...inVisibleTogglerAttributes}
            />
          ))}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
