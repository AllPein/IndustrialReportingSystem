import React, { useState, useCallback } from 'react';
import * as UI from './styles';
import Typography from '../Typography';
import colors from '../../constants/colors';

export interface IInputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  errorOnBlur?: boolean;
  onFieldBlur?: () => void;
  type?: string;
  maxLength?: number;
}

const Input: React.FC<IInputProps> = (props) => {

  const {
    value,
    label,
    placeholder,
    disabled,
    errorMessage,
    onChange,
    type,
    onBlur,
    onFieldBlur,
    maxLength,
  } = props;

  const [focus, setFocus] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (onChange && inputValue !== null) {
      onChange(inputValue);
    }

    setFocus(true);
  };

  const handleFocus = () => {
    if (!errorMessage) {
      setFocus(true);
    }
  };

  const handleBlur = useCallback(() => {
    if (onFieldBlur) onFieldBlur();
    if (onBlur) onBlur();
    setFocus(false);
  }, [onBlur, onFieldBlur]);


  return (
    <UI.InputContainer>
      {label && (
        <Typography type="p2" color={colors.grey} styles={UI.LabelStyles}>{label}</Typography>
      )}
      <UI.SearchWrap>
        <UI.StyledInput
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          type={type}
          maxLength={maxLength}
        />
      </UI.SearchWrap>
    </UI.InputContainer>

  );
}

export default Input;
