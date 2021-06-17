import { useCallback, useState } from "react";

export function useFormValidation() {
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };

  const resetFrom = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setInputValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setInputValues, setErrors, setIsValid]
  );

  return { inputValues, handleChange, resetFrom, errors, isValid };
}
