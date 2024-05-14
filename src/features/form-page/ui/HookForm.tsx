import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './Form.module.scss';
import Input from '@/src/shared/@common/ui/input';

const cx = classNames.bind(styles);

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

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

export default function HookForm() {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleValidSubmit = (data: FormValues) => {
    alert('제출 완료');
  };

  return (
    <form className={cx('form')} onSubmit={handleSubmit(handleValidSubmit)}>
      <Input>
        <Input.Label className={cx('label')} htmlFor="email2">
          이메일
        </Input.Label>
        <Input.Box isError={errors.email ? true : false}>
          <Input.Field
            className={cx('inputField')}
            type="email"
            id="email2"
            placeholder="이메일을 입력해 주세요."
            {...register('email')}
          />
        </Input.Box>
        {errors.email?.message && (
          <Input.Message>{errors.email.message}</Input.Message>
        )}
      </Input>
      <Input>
        <Input.Label className={cx('label')} htmlFor="password2">
          비밀번호
        </Input.Label>
        <Input.Box isError={errors.password ? true : false}>
          <Input.Field
            className={cx('inputField')}
            type="password"
            id="password2"
            placeholder="비밀번호를 입력해 주세요."
            hasVisibleToggler
            {...register('password')}
          />
        </Input.Box>
        {errors.password?.message && (
          <Input.Message>{errors.password.message}</Input.Message>
        )}
      </Input>
      <Input>
        <Input.Label className={cx('label')} htmlFor="passwordConfirm2">
          비밀번호 확인
        </Input.Label>
        <Input.Box isError={errors.passwordConfirm ? true : false}>
          <Input.Field
            className={cx('inputField')}
            type="password"
            id="passwordConfirm2"
            placeholder="비밀번호를 입력해 주세요."
            hasVisibleToggler
            visibleTogglerAttributes={{ src: '/images/heart.svg' }}
            inVisibleTogglerAttributes={{ src: '/images/star.svg' }}
            {...register('passwordConfirm')}
          />
        </Input.Box>
        {errors.passwordConfirm?.message && (
          <Input.Message>{errors.passwordConfirm.message}</Input.Message>
        )}
      </Input>
      <button type="submit" disabled={!isValid || isSubmitting}>
        제출
      </button>
    </form>
  );
}
