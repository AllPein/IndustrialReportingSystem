import React, { useCallback } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { FilledButton } from './styles';
import Typography from '../Typography';
import colors from '../../constants/colors';


export interface IButtonProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  children: React.ReactNode;
  secondary?: boolean;
  disabled?: boolean;
  className?: string;
  styles?: FlattenSimpleInterpolation;
  isSubmit?: boolean;
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    disabled,
    secondary,
    children,
    className,
    styles,
    onClick,
    isSubmit,
  } = props;

  const handleClick = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!disabled) {
        onClick(event);
      }
    },
    [disabled, onClick]
  );

  return (
    <FilledButton
      secondary={secondary}
      disabled={disabled}
      onClick={handleClick}
      className={className}
      styles={styles}
      type={isSubmit ? 'submit' : 'button'}
    >
      <Typography type="button" color={colors.white}>
        {children}
      </Typography>
    </FilledButton>
  );
};

export default Button;
