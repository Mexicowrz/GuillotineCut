import React, { useCallback, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { CutPanel } from './components/CutPanel';
import { Pager } from './components/Pager';
import { History } from './components/History';
import { ResultPageProps } from './ResultPage.types';
import { IndexPath } from '@ui-kitten/components';

export const ResultPage: React.FC<ResultPageProps> = (props) => {
  const result = props.route.params.result;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>();

  const onPageChange = useCallback(
    (page: number) => {
      setSelectedIndex(undefined);
      setCurrentPage(page);
    },
    [setCurrentPage, setSelectedIndex],
  );

  // useEffect(() => {
  //   setSelectedIndex(undefined);
  // }, [currentPage]);
  return (
    <View>
      <Pager
        pageSize={result.panels.length}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ScrollView>
        <CutPanel
          panel={result.panels[currentPage]}
          colors={result.colors}
          selectedIndex={selectedIndex && selectedIndex.row}
        />
        <History
          panel={result.panels[currentPage]}
          colors={result.colors}
          onSelect={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </ScrollView>
    </View>
  );
};
