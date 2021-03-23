import styled from 'styled-components/macro';
import colors from '../../constants/colors';


export const HeaderWrapper = styled.div`
  z-index: 1231;
  background-color: ${colors.white};
  height: 80px;
  padding: 0 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

