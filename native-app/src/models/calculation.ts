export enum CalcType {
  INFINITE = 0,
  FIXED = 1,
}

export type ItemElement = {
  id: string;
  width?: number;
  height?: number;
  count?: number;
};

export type PanelElement = ItemElement;

export type ProductElement = ItemElement;

export type CalculationData = {
  type: CalcType;
  cutWidth: number;
  defaultPanelWidth?: number;
  defaultPanelHeight?: number;
  panels?: PanelElement[];
  products?: ProductElement[];
};

export type CalculationResultProduct = {
  id: string;
  width: number;
  height: number;
  isRotated: boolean;
  x: number;
  y: number;
};

export type CalculationResultUnused = {
  x: number;
  y: number;
  windth: number;
  height: number;
};

export type CalculationResultPanel = {
  id: string;
  width: number;
  height: number;
  products: CalculationResultProduct[];
  unused: CalculationResultUnused[];
};

export type ColorsOfProducts = {
  [key: string]: { bg: string; color: string; index: number };
};

export type CalculationResult = {
  panels: CalculationResultPanel[];
  data: CalculationData;
  colors: ColorsOfProducts;
};

export type CalculationStackParamList = {
  FillingPage: undefined;
  ResultPage: { result: CalculationResult };
};
