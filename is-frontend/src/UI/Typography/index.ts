import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import colors from '../../constants/colors';

export type TypographyType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p1'
  | 'p2'
  | 'caption'
  | 'button'
  | 'link';

type TypographyWeight = 'bold' | 'bolder' | 'lighter' | 'normal';

interface ITypographyProps {
  type: TypographyType;
  weight?: TypographyWeight;
  spacing?: number;
  lineHeight?: number;
  color?: string;
  styles?: FlattenSimpleInterpolation;
  ellipsisMaxLines?: number;
}

const getFontSize = (type: TypographyType) => {
  switch (type) {
    case 'h1':
      return 40;
    case 'h2':
      return 32;
    case 'h3':
      return 24;
    case 'h4':
      return 20;
    case 'p1':
      return 16;
    case 'p2':
    case 'link':
      return 14;
    case 'caption':
      return 12;
    case 'button':
    default:
      return 13;
  }
};

const getLineHeight = (type: TypographyType, lineHeight?: number) => {
  if (lineHeight) {
    return lineHeight;
  }

  switch (type) {
    case 'h1':
      return 48;
    case 'h2':
      return 40;
    case 'h3':
      return 32;
    case 'h4':
      return 28;
    case 'p1':
      return 22;
    case 'p2':
    case 'link':
      return 16;
    case 'button':
    default:
      return 24;
  }
};

const getFontWeight = (type: TypographyType, weight?: TypographyWeight) => {
  if (weight) {
    return weight;
  }

  switch (type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'button':
      return 'bold';
    case 'p1':
    case 'p2':
    case 'caption':
    case 'link':
    default:
      return 'normal';
  }
};

const getLetterSpacing = (type: TypographyType, spacing?: number) => {
  if (spacing) {
    return spacing;
  }

  switch (type) {
    case 'button':
      return 1;
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'p1':
    case 'p2':
    case 'caption':
    default:
      return 0;
  }
};

const linkStyles = css`
  text-decoration: underline;
  color: ${colors.mainBlue};
  transition: color ease-in-out 0.2s;
  cursor: pointer;

  :hover {
    color: ${colors.hoverBlue};
  }
`;

const Typography = styled.p<ITypographyProps>`
  color: ${({ color }) => color || colors.mainBlack};

  ${(props) => css`
    font-size: ${getFontSize(props.type)}px;
    font-weight: ${getFontWeight(props.type, props.weight)};
    letter-spacing: ${getLetterSpacing(props.type, props.spacing)}px;
    line-height: ${getLineHeight(props.type, props.lineHeight)}px;
  `}
  
   ${({ ellipsisMaxLines }) =>
     ellipsisMaxLines &&
     css`
       overflow: hidden;
     `}
  
  ${({ ellipsisMaxLines }) =>
    ellipsisMaxLines === 1
      ? css`
          display: inline-block;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
        `
      : ellipsisMaxLines &&
        ellipsisMaxLines > 1 &&
        css`
          display: -webkit-box;
          -webkit-line-clamp: ${ellipsisMaxLines};
          -webkit-box-orient: vertical;
        `}
    
    ${({ type }) => type === 'link' && linkStyles}
    
    a {
      ${linkStyles}
    }

    ${({ styles }) => styles}
`;

export default Typography;
