import styled, { keyframes } from 'styled-components';
import colors from '../../constants/colors';
import preloader from '../../../assets/icons/preloader-page.svg';
import { Z_INDEX_PRELOADER } from '../../constants/styles';

const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); } 
`;

export default styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: ${Z_INDEX_PRELOADER};
  background-color: ${colors.blackBack};

  &:after {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 56px;
    width: 56px;
    margin-left: -28px;
    margin-bottom: -28px;
    background-image: url(${preloader});
    animation: ${rotate} 1s linear infinite;
    content: '';
  }
`;
