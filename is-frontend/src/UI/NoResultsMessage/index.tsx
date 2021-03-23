import React from 'react';
import Typography from '../Typography';
import colors from '../../constants/colors';
import { Wrapper, NoResultsIcon } from './styles';

const NoResultsMessage: React.FC = () => (
  <Wrapper>
    <NoResultsIcon />
    <Typography type="h4" weight="bold" color={colors.mainBlack}>
      По вашему запросу ничего не найдено
    </Typography>
  </Wrapper>
);

export default NoResultsMessage;
