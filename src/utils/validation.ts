import { VALIDATION_CODE } from '@/src/constants/validation';

export function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return regex.test(email);
}

export function validatePassword(password: string) {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  return regex.test(password);
}

export function validateValueConfirm(value: string, valueConfirm: string) {
  return value === valueConfirm;
}

export function getValidateEmailCode(email: string): VALIDATION_CODE {
  if (!email) {
    return VALIDATION_CODE.EMPTY_EMAIL;
  }

  if (!validateEmail(email)) {
    return VALIDATION_CODE.PATTERN_ERROR_EMAIL;
  }

  return VALIDATION_CODE.PASS;
}

export function getValidatePasswordCode(password: string): VALIDATION_CODE {
  if (!password) {
    return VALIDATION_CODE.EMPTY_PASSWORD;
  }

  if (!validatePassword(password)) {
    return VALIDATION_CODE.PATTERN_ERROR_PASSWORD;
  }

  return VALIDATION_CODE.PASS;
}

export function getValidatePasswordConfirmCode(
  passwordConfirm: string,
  password: string,
): VALIDATION_CODE {
  if (!passwordConfirm) {
    return VALIDATION_CODE.EMPTY_PASSWORD_CONFIRM;
  }

  if (!validateValueConfirm(password, passwordConfirm)) {
    return VALIDATION_CODE.PATTERN_ERROR_PASSWORD_CONFIRM;
  }

  return VALIDATION_CODE.PASS;
}
