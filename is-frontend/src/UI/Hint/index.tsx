import React, { PropsWithChildren } from 'react';
import Tooltip from 'react-tooltip';
import styled from 'styled-components/macro';
import colors from '../../constants/colors';
import Typography from '../Typography';

interface IStyledHintProps {
  maxWidth?: number;
}

const StyledHint = styled(Tooltip)<IStyledHintProps>`
  &.type-dark {
    max-width: ${(props) => props.maxWidth || 188}px;
    padding: 16px;
    background: ${colors.white};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
    opacity: 1;

    &.place-bottom:after,
    &.place-bottom:before {
      border-bottom-color: ${colors.white} !important;
    }

    &.place-top:after,
    &.place-top:before {
      border-top-color: ${colors.white} !important;
    }

    &.place-right:after,
    &.place-right:before {
      border-right-color: ${colors.white} !important;
    }

    &.place-left:after,
    &.place-left:before {
      border-left-color: ${colors.white} !important;
    }
  }
`;

interface IHintProps {
  tip: string;
  maxWidth?: number;
}

const Hint: React.FC<PropsWithChildren<IHintProps>> = (props) => {
  return (
    <StyledHint
      className="tooltip"
      id={props.tip}
      place="top"
      effect="solid"
      maxWidth={props.maxWidth}
    >
      <Typography type="p2">{props.children}</Typography>
    </StyledHint>
  );
};

export default Hint;
