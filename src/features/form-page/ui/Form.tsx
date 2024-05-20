import classNames from 'classnames/bind';
import * as Yup from 'yup';

import styles from './Form.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import Input from '@/src/shared/@common/ui/input';

const cx = classNames.bind(styles);

const formSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('이메일 형식으로 입력해 주세요.')
    .required('이메일을 입력해 주세요.'),
  password: Yup.string()
    .trim()
    .min(8, '8자 이상 입력해 주세요.')
    .required('비밀번호를 입력해 주세요.'),
  passwordConfirm: Yup.string()
    .trim()
    .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 입력해 주세요.'),
});

interface FormData {
  [key: string]: {
    value: string;
    isError: boolean;
    message: string;
  };
}

const initialFormData: FormData = {
  email: {
    value: '',
    isError: false,
    message: '',
  },
  password: {
    value: '',
    isError: false,
    message: '',
  },
  passwordConfirm: {
    value: '',
    isError: false,
    message: '',
  },
};

/**
 * @todo 팀 프로젝트에서 피드백 반영하겠습니다!
 */
export default function Form() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      email: formData.email.value,
      password: formData.password.value,
      passwordConfirm: formData.passwordConfirm.value,
    };

    for (const key in formData) {
      try {
        await formSchema.validateAt(key, data);

        setFormData((prev) => ({
          ...prev,
          [key]: { ...prev[key], isError: false, message: '' },
        }));
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setFormData((prev) => ({
            ...prev,
            [key]: { ...prev[key], isError: true, message: error.message },
          }));
          return;
        }
      }
    }

    alert('제출 완료');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: { ...prev[name], value } }));
  };

  return (
    <form className={cx('form')} onSubmit={handleSubmit}>
      <Input>
        <Input.Label className={cx('label')} htmlFor="email" hide>
          이메일
        </Input.Label>
        <Input.Box isError={formData.email.isError}>
          <Input.Field
            className={cx('inputField')}
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해 주세요."
            onChange={handleInputChange}
          />
        </Input.Box>
        {formData.email.message && (
          <Input.Message>{formData.email.message}</Input.Message>
        )}
      </Input>
      <Input>
        <Input.Label className={cx('label')} htmlFor="password">
          비밀번호
        </Input.Label>
        <Input.Box isError={formData.password.isError}>
          <Input.Field
            className={cx('inputField')}
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요."
            onChange={handleInputChange}
            hasVisibleToggler
          />
        </Input.Box>
        {formData.password.message && (
          <Input.Message>{formData.password.message}</Input.Message>
        )}
      </Input>
      <Input>
        <Input.Label className={cx('label')} htmlFor="passwordConfirm">
          비밀번호 확인
        </Input.Label>
        <Input.Box isError={formData.passwordConfirm.isError}>
          <Input.Field
            className={cx('inputField')}
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="비밀번호를 입력해 주세요."
            onChange={handleInputChange}
            hasVisibleToggler
            visibleTogglerAttributes={{ src: '/images/heart.svg' }}
            inVisibleTogglerAttributes={{ src: '/images/star.svg' }}
          />
        </Input.Box>
        {formData.passwordConfirm.message && (
          <Input.Message>{formData.passwordConfirm.message}</Input.Message>
        )}
      </Input>
      <button type="submit">제출</button>
    </form>
  );
}
