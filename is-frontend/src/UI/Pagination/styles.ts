import styled, { css } from 'styled-components';
import colors from '../../constants/colors';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const TypoLimitsStyles = (pointer?: boolean) => css`
  margin-right: 8px;

  ${pointer &&
  css`
    cursor: pointer;
  `}

  :last-of-type {
    margin: 0;
  }
`;

export const PageInput = styled.input`
  outline: none;
  width: calc(64px - 32px);
  padding: 11px 16px;
  border: 1px solid ${colors.normalGrey};
  text-align: center;

  font-size: 14px;
  line-height: 16px;

  transition: border-color 0.2s ease-in-out;

  :hover,
  :focus {
    border-color: ${colors.mainBlue};
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ImageButton = styled.img`
  width: 16px;
  height: 16px;
  margin: 0 16px;

  cursor: pointer;
`;

export const PageTextStyles = css`
  margin: 0 16px;

  user-select: none;
`;
