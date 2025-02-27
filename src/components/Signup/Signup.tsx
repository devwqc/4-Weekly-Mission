import { ChangeEvent, FormEvent } from 'react';
import styles from './Signup.module.css';
import { Input } from '@/src/components/Input';
import { VALIDATION_CODE } from '@/src/constants/validation';
import useInput from '@/src/hooks/useInput';
import {
  getValidateEmailCode,
  getValidatePasswordCode,
  getValidatePasswordConfirmCode,
} from '@/src/utils/validation';
import { Button } from '../Button';

export default function Signup() {
  const email = useInput({ validator: getValidateEmailCode });
  const password = useInput({ validator: getValidatePasswordCode });
  const passwordConfirm = useInput({
    validator: getValidatePasswordConfirmCode,
  });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    password.handleInputChange(e);

    const validatePasswordConfirmCode = getValidatePasswordConfirmCode(
      passwordConfirm.value,
      e.target.value,
    );
    if (validatePasswordConfirmCode !== VALIDATION_CODE.PASS) {
      passwordConfirm.setInputErrorCode(validatePasswordConfirmCode);
    }
  };

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    passwordConfirm.handleInputChange(e, password.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateEmailCode = getValidateEmailCode(email.value);
    const validatePasswordCode = getValidatePasswordCode(password.value);
    const validatePasswordConfirmCode = getValidatePasswordConfirmCode(
      passwordConfirm.value,
      password.value,
    );

    let isValid = true;

    if (validateEmailCode !== VALIDATION_CODE.PASS) {
      email.setInputErrorCode(validateEmailCode);
      isValid = false;
    }

    if (validatePasswordCode !== VALIDATION_CODE.PASS) {
      password.setInputErrorCode(validatePasswordCode);
      isValid = false;
    }

    if (validatePasswordConfirmCode !== VALIDATION_CODE.PASS) {
      passwordConfirm.setInputErrorCode(validatePasswordConfirmCode);
      isValid = false;
    }

    if (!isValid) return;

    alert('회원가입 성공!');
  };

  return (
    <form className={styles.Signup} onSubmit={handleSubmit}>
      <div className={styles.InputContainer}>
        <label htmlFor="email">이메일</label>
        <Input
          id="email"
          name="email"
          value={email.value}
          placeholder="이메일을 입력해 주세요."
          onChange={email.handleInputChange}
          onBlur={email.handleInputChange}
          isError={email.isError}
          message={email.message}
        />
      </div>
      <div className={styles.InputContainer}>
        <label htmlFor="password">비밀번호</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password.value}
          onChange={handlePasswordChange}
          onBlur={handlePasswordChange}
          isError={password.isError}
          message={password.message}
          hasVisibleToggler={true}
        />
      </div>
      <div className={styles.InputContainer}>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={passwordConfirm.value}
          onChange={handlePasswordConfirmChange}
          onBlur={handlePasswordConfirmChange}
          isError={passwordConfirm.isError}
          message={passwordConfirm.message}
          hasVisibleToggler={true}
        />
      </div>
      <Button>회원가입</Button>
    </form>
  );
}
