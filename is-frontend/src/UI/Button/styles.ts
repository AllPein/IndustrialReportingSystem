import styled, {
  css,
  FlattenSimpleInterpolation,
} from 'styled-components/macro';
import colors from '../../constants/colors';
import Typography from '../Typography';

interface IFilledButtonProps {
  disabled?: boolean;
  secondary?: boolean;
  styles?: FlattenSimpleInterpolation;
}

export const FilledButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  width: 100%;
  background: ${colors.mainBlue};
  backdrop-filter: blur(81.5485px);
  border-radius: 1px;

  color: ${colors.white};
  font-weight: bold;
  font-size: 13px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;

  transition: background 0.2s ease-in-out;

  :hover {
    background: ${colors.hoverBlue};
  }

  ${(props: IFilledButtonProps) =>
    props.secondary &&
    css`
      border: 1px solid ${colors.red};
      background: transparent;

      ${Typography} {
        color: ${colors.red};
      }

      :hover {
        background: ${colors.red};

        ${Typography} {
          color: ${colors.white};
        }
      }
    `}

  ${Typography} {
    transition: color 0.2s ease-in-out;
  }

  ${(props: IFilledButtonProps) =>
    props.disabled &&
    css`
      background: ${colors.lightGrey} !important;

      ${Typography} {
        color: ${colors.normalGrey};
      }

      cursor: default;
    `}

  ${(props: IFilledButtonProps) => props.styles}
`;
