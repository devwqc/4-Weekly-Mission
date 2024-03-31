import {
  VALIDATION_CODE,
  VALIDATION_MESSAGE,
} from '@/src/constants/validation';
import isFunction from '@/src/utils/isFunction';
import { ChangeEvent, useState } from 'react';

type useInputTypes = {
  initialValue?: string;
  validator?: (value: string, valueConfirm: string) => VALIDATION_CODE;
};

function useInput({ initialValue = '', validator }: useInputTypes = {}) {
  const [value, setValue] = useState(initialValue);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  /**
   * @todo 디바운스 적용
   */
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    valueConfirm = '',
  ) => {
    const _value = e.target.value;

    setValue(_value);

    if (!validator || !isFunction(validator)) return;

    const validationResultCode = validator(_value, valueConfirm);
    setIsError(validationResultCode === VALIDATION_CODE.PASS ? false : true);
    setMessage(VALIDATION_MESSAGE[validationResultCode]);
  };

  const setInputErrorCode = (code: VALIDATION_CODE) => {
    setIsError(code === VALIDATION_CODE.PASS ? false : true);
    setMessage(VALIDATION_MESSAGE[code]);
  };

  const resetInput = () => {
    setValue(initialValue);
    setMessage('');
    setIsError(false);
  };

  return {
    value,
    message,
    handleInputChange,
    isError,
    setIsError,
    setInputErrorCode,
    resetInput,
  };
}

export default useInput;
