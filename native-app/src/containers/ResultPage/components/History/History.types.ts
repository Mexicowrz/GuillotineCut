import { CalculationResultPanel, ColorsOfProducts } from '@models/calculation';
import { IndexPath } from '@ui-kitten/components';

export type HistoryProps = {
  panel: CalculationResultPanel;
  colors: ColorsOfProducts;
  onSelect: (index: IndexPath) => void;
  selectedIndex?: IndexPath;
};
