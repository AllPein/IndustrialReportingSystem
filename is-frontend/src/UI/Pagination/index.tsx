import React, { useCallback, useState } from 'react';
import { v4 } from 'uuid';
import * as UI from './styles';
import Typography from '../Typography';
import colors from '../../constants/colors';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import pageLeft from '../../assets/icons/page-left.svg';
import pageRight from '../../assets/icons/page-right.svg';

interface IPaginationProps {
  limits: Array<number>;
  limit: number;
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const Pagination: React.FC<IPaginationProps> = (props) => {
  const { limits, limit, onLimitChange, onPageChange, total, page } = props;
  const pages = Math.ceil(total / limit);

  const [inputFocus, setInputFocus] = useState(false);
  const [tempPage, setTempPage] = useState<number>(page);

  const handleInputBlur = () => {
    setInputFocus(false);

    if (tempPage && tempPage > 0 && tempPage < pages) {
      onPageChange(tempPage);
    }
  };

  const handleInputFocus = () => {
    setInputFocus(true);
    setTempPage(page);
  };

  const handleLimitChange = (value: number) => () => onLimitChange(value);

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTempPage(parseInt(event.target.value, 10));

  const handlePageClick = (value: number) => () => {
    if (page + value > 0 && page + value <= pages) {
      onPageChange(page + value);
    }
  };

  const handleSetPage = useCallback(
    (value: number) => () => onPageChange(value),
    [onPageChange]
  );

  const handlePageInput = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        const page = Number(event.currentTarget.value);

        if (page && !isNaN(page)) {
          onPageChange(page);
        }
      }
    },
    [onPageChange]
  );

  return (
    <UI.PaginationWrapper>
      <UI.Row>
        <Typography
          type="p2"
          color={colors.grey}
          styles={UI.TypoLimitsStyles()}
        >
          На странице:
        </Typography>
        {limits.map((l) => (
          <Typography
            key={v4()}
            type="p2"
            weight={l === limit ? 'bold' : 'normal'}
            color={l === limit ? undefined : colors.grey}
            styles={UI.TypoLimitsStyles(true)}
            onClick={handleLimitChange(l)}
          >
            {l}
          </Typography>
        ))}
      </UI.Row>
      <UI.Row>
        <UI.ImageButton src={pageLeft} onClick={handleSetPage(1)} />
        <UI.ImageButton src={arrowLeft} onClick={handlePageClick(-1)} />
        <Typography type="p2" color={colors.grey} styles={UI.PageTextStyles}>
          страница
        </Typography>
        <UI.PageInput
          type="number"
          value={inputFocus ? tempPage : page}
          onChange={handlePageChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handlePageInput}
        />
        <Typography type="p2" color={colors.grey} styles={UI.PageTextStyles}>
          / {pages}
        </Typography>
        <UI.ImageButton src={arrowRight} onClick={handlePageClick(1)} />
        <UI.ImageButton src={pageRight} onClick={handleSetPage(pages)} />
      </UI.Row>
      <Typography type="p2" color={colors.grey}>
        Показано {limit <= total ? limit : total} из {total}
      </Typography>
    </UI.PaginationWrapper>
  );
};

export default Pagination;
