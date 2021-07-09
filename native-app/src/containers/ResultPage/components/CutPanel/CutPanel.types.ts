import { CalculationResultPanel, ColorsOfProducts } from '@models/calculation';

export type CutPanelProps = {
  panel: CalculationResultPanel;
  colors: ColorsOfProducts;
  selectedIndex?: number;
};
