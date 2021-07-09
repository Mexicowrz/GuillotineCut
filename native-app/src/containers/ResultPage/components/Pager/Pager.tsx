import React from 'react';
import { Button, ButtonGroup, Layout } from '@ui-kitten/components';
import { styles } from './Pager.styles';
import { PagerProps } from './Pager.types';

const MAX_PAGE_COUNT = 6;

export const Pager: React.FC<PagerProps> = (props) => {
  const lastPage = props.pageSize - 1;
  let minVal = Math.max(props.currentPage - Math.floor(MAX_PAGE_COUNT / 2), 0);
  const maxVal = Math.min(minVal + MAX_PAGE_COUNT, lastPage);
  if ((maxVal - minVal) < MAX_PAGE_COUNT) {
    minVal = Math.max(maxVal - MAX_PAGE_COUNT, 0);
  }
  const pages = [];
  for (
    let i = minVal;
    i <= (maxVal === lastPage ? lastPage : maxVal - 2);
    ++i
  ) {
    pages.push(i);
  }
  if (maxVal < lastPage) {
    pages.push(...[-1, lastPage]);
  }
  return (
    <Layout style={styles.container} level='1'>
      <ButtonGroup style={styles.buttonGroup} size='tiny'>
        {pages.map((pg) =>
          pg >= 0 ? (
            <Button key={pg} onPress={() => props.onPageChange(pg)}>{pg + 1}</Button>
          ) : (
            <Button key={pg} disabled={true}>...</Button>
          ),
        )}
      </ButtonGroup>
    </Layout>
  );
};
