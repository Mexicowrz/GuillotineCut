import { CutterGuillotine, Item, Panel, CalcData } from '@lib/CutterGuillotine';
import {
  CalcType,
  CalculationData,
  ProductElement,
  PanelElement,
  CalculationResult,
  CalculationResultPanel,
  ColorsOfProducts,
} from '@models/calculation';
import { generateColors } from '@models/colors';

const productElementsToItems = (products: ProductElement[]) =>
  products.reduce<Item[]>((res: Item[], product: ProductElement) => {
    for (let i = 0; i < (product.count || 0); ++i) {
      res.push({
        width: product.width!,
        height: product.height!,
        canRotate: true,
        description: product.id,
      });
    }
    return res;
  }, []);

const panelElementsToPanels = (panels: PanelElement[]) =>
  panels.reduce<Panel[]>((res: Panel[], panel: PanelElement) => {
    for (let i = 0; i < (panel.count || 0); ++i) {
      res.push({
        width: panel.width!,
        height: panel.height!,
        description: panel.id,
      });
    }
    return res;
  }, []);

const calcDataToResult = (result: CalcData): CalculationResultPanel[] =>
  result.panels.map((pnl: Panel) => {
    return {
      id: pnl.description!,
      width: pnl.width,
      height: pnl.height,
      products: result.usedElements
        .filter((used) => used.panel === pnl)
        .map((used) => ({
          id: used.item.description!,
          width: used.item.width,
          height: used.item.height,
          isRotated: used.isRotated,
          x: used.x,
          y: used.y,
        })),
      unused: result.unusedElements
        .filter((unused) => unused.panel === pnl)
        .map((unused) => ({
          x: unused.x,
          y: unused.y,
          windth: unused.width,
          height: unused.height,
        })),
    };
  });

const makeProductColors = (products: ProductElement[]) => {
  const colors = generateColors(products.length);
  const productColors: ColorsOfProducts = {};
  products.forEach((value, index) => {
    productColors[value.id] = { ...colors[index], index };
  });
  return productColors;
};

export const calculate = (data: CalculationData): CalculationResult => {
  const calculator = new CutterGuillotine(
    data.defaultPanelWidth,
    data.defaultPanelHeight,
    data.cutWidth,
  );
  const items = productElementsToItems(data.products || []);
  let result: CalcData;
  if (data.type === CalcType.FIXED) {
    const panels = panelElementsToPanels(data.panels || []);
    result = calculator.calculateWithFixedPanels(panels, items);
  } else {
    result = calculator.caclulateWithInfinityPanels(items);
  }
  return {
    panels: calcDataToResult(result),
    data,
    colors: makeProductColors(data.products || []),
  };
};