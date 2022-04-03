import { useState } from 'react';

const useInput = (isValid: any = () => {}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputTouched, setInputTouched] = useState(false);

  const isValueValid = isValid(inputValue);
  const isInputInvalid = !isValueValid && inputTouched;

  const valueHandler = (event: any) => {
    setInputValue(event.target.value);
  };

  const blurHandler = () => {
    setInputTouched(true);
  };

  const reset = () => {
    setInputValue('');
    setInputTouched(false);
  };

  return {
    inputValue,
    isValueValid,
    isInputInvalid,
    valueHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
