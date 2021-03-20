import styled, { css } from 'styled-components/macro';
import colors from '../../constants/colors';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

interface IStyledInputProps {
  error?: boolean;
  hasIcon?: boolean;
  padding?: boolean;
}

export const StyledInput = styled.input`
  outline: none;
  width: calc(100% - 34px);
  padding: 11px 16px;
  border: 1px solid ${colors.normalGrey};

  font-size: 14px;
  line-height: 16px;

  transition: border-color 0.2s ease-in-out;

  ${(props: IStyledInputProps) =>
    props.error &&
    css`
      border-color: ${colors.red} !important;
    `}

  ${(props: IStyledInputProps) =>
    props.padding &&
    css`
      padding-right: 38px;
    `}

  :disabled {
    border-color: transparent !important;
    background: ${colors.lightGrey};
  }

  :hover,
  :focus {
    border-color: ${colors.mainBlue};
  }

  ::placeholder {
    font-size: 14px;
    line-height: 16px;
    color: ${colors.grey};
  }
`;

export const LabelStyles = css`
  margin-bottom: 16px;
`;

export const ErrorLabel = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.red};
  margin-top: 8px;
  position: absolute;
  top: 100%;
`;

export const SearchWrap = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  height: max-content;
`;
