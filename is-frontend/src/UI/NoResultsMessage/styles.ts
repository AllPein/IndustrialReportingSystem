import styled from 'styled-components/macro';
import icon from '../../assets/icons/no-results.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.5vh;
`;
export const NoResultsIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: 3.5vh;
  background-image: url(${icon});
`;
