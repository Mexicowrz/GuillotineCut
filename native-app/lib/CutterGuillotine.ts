/**
 * Produced item
 */
export type Item = {
  readonly width: number;
  readonly height: number;
  readonly canRotate: boolean;
  readonly description?: string;
};

/**
 * Panel to be sliced
 */
export type Panel = {
  readonly width: number;
  readonly height: number;
  readonly description?: string;
};

export type Used = {
  panel: Panel;
  item: Item;
  x: number;
  y: number;
  isRotated: boolean;
};

export type Unused = {
  panel: Panel;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CalcData = {
  readonly items: Item[];
  usedElements: Used[];
  unusedElements: Unused[];
  readonly panels: Panel[];
};

const FITNESS_K = 0.03;

export class CutterGuillotine {
  private cutWidth: number = 0;
  private defaultPanelWidth: number = 0;
  private defaultPanelHeight: number = 0;
  private isPanelsGenerating = false;
  private finalResult: CalcData = {
    items: [],
    usedElements: [],
    unusedElements: [],
    panels: [],
  };
  constructor(
    defaultPanelWidth: number = 0,
    defaultPanelHeight: number = 0,
    cutWidth: number = 0,
  ) {
    this.setDefaultPanelSize(defaultPanelWidth, defaultPanelHeight);
    this.setCutWidth(cutWidth);
  }

  public setDefaultPanelSize(
    defaultPanelWidth: number,
    defaultPanelHeight: number,
  ): void {
    this.defaultPanelWidth = defaultPanelWidth;
    this.defaultPanelHeight = defaultPanelHeight;
  }

  public setCutWidth(cutWidth: number) {
    if (cutWidth < 0)
      throw new Error('Parameter "cutWidth" must be greater or equals 0');
    this.cutWidth = cutWidth;
  }

  public caclulateWithInfinityPanels(items: Item[]) {
    if (this.defaultPanelHeight <= 0 || this.defaultPanelWidth <= 0)
      throw new Error(
        'Default panel size is not valid. Panel sides must be greater than 0.',
      );
    this.isPanelsGenerating = true;
    const panel: Panel = {
      width: this.defaultPanelWidth,
      height: this.defaultPanelHeight,
    };
    return this.calculateResult({
      items,
      panels: [panel],
      unusedElements: [
        { panel, width: panel.width, height: panel.height, x: 0, y: 0 },
      ],
      usedElements: [],
    });
  }

  public calculateWithFixedPanels(panels: Panel[], items: Item[]) {
    this.isPanelsGenerating = false;
    return this.calculateResult({
      items,
      panels,
      unusedElements: panels.map((pnl: Panel) => ({
        panel: pnl,
        width: pnl.width,
        height: pnl.height,
        x: 0,
        y: 0,
      })),
      usedElements: [],
    });
  }

  private calculateResult(result: CalcData) {
    if (new Set(result.items).size !== result.items.length) {
      throw new Error('Repeating items are not allowed');
    }
    for (const item of result.items) {
      if (
        !result.panels.find(
          (panel) =>
            (item.width <= panel.width && item.height <= panel.height) ||
            (item.canRotate &&
              item.width <= panel.height &&
              item.height <= panel.width),
        )
      )
        throw new Error('Unresolvable error. Item bigger then panels.');
    }

    this.finalResult = {
      items: result.items,
      usedElements: [],
      unusedElements: [],
      panels: [],
    };
    while (!this.isDone(result)) {
      let newResult: CalcData | null = null;
      let newFitness: number | null = null;
      for (const nextResult of this.getNextResults(result)) {
        const nextFitness = this.fitness(nextResult);
        if (newFitness === null || nextFitness < newFitness) {
          newResult = nextResult;
          newFitness = nextFitness;
        }
      }
      if (newResult) {
        result = newResult;
      } else {
        result = this.makeNewDefaultPanel(result);
      }
    }
    this.finalizeResultAndGetRestItems(result);
    return this.finalResult;
  }

  private makeNewDefaultPanel(result: CalcData): CalcData {
    if (!this.isPanelsGenerating)
      throw new Error('Unresolvable error. Too few panels for given items.');
    const restItems = this.finalizeResultAndGetRestItems(result);
    const newPanel = {
      width: this.defaultPanelWidth,
      height: this.defaultPanelHeight,
    };
    return {
      items: restItems,
      panels: [newPanel],
      usedElements: [],
      unusedElements: [
        {
          panel: newPanel,
          width: newPanel.width,
          height: newPanel.height,
          x: 0,
          y: 0,
        },
      ],
    };
  }

  private finalizeResultAndGetRestItems(result: CalcData): Item[] {
    const restItems = result.items.filter(
      (item: Item) => !this.isItemInUsed(result, item),
    );
    this.finalResult = {
      ...this.finalResult,
      panels: [...this.finalResult.panels, ...result.panels],
      usedElements: [...this.finalResult.usedElements, ...result.usedElements],
      unusedElements: [
        ...this.finalResult.unusedElements,
        ...result.unusedElements,
      ],
    };
    return restItems;
  }

  private isItemInUsed(result: CalcData, item: Item): boolean {
    return !!result.usedElements.find((used: Used) => used.item === item);
  }

  private isDone(result: CalcData): boolean {
    return result.items.length === result.usedElements.length;
  }

  private getNextResults(result: CalcData): CalcData[] {
    let selectedItem: Item | null = null;
    const usedItems = result.usedElements.map((used: Used) => used.item);
    for (let item of result.items) {
      if (usedItems.includes(item)) continue;
      if (
        !selectedItem ||
        Math.max(item.width, item.height) >
          Math.max(selectedItem.width, selectedItem.height)
      ) {
        selectedItem = item;
      }
    }
    if (!selectedItem) {
      throw new Error('Result is done.');
    }
    return this.getNextResultForItem(result, selectedItem);
  }

  private getNextResultForItem(result: CalcData, item: Item): CalcData[] {
    const ret: CalcData[] = [];
    let unusedVariants = [
      ...result.unusedElements.map((unused: Unused, index: number) => ({
        isRotated: false,
        index,
        unused,
      })),
    ];
    if (item.canRotate) {
      unusedVariants.splice(
        -1,
        0,
        ...result.unusedElements.map((unused: Unused, index: number) => ({
          isRotated: true,
          index,
          unused,
        })),
      );
    }
    for (const { isRotated, index, unused } of unusedVariants) {
      for (const isVertical of [true, false]) {
        const [newUsed, newUnused] = this.cutItemFromUnused(
          unused,
          item,
          isRotated,
          isVertical,
        );
        if (!newUsed) continue;
        ret.push({
          ...result,
          usedElements: [...result.usedElements, newUsed],
          unusedElements: [
            ...result.unusedElements.slice(0, index),
            ...newUnused,
            ...result.unusedElements.slice(index + 1),
          ],
        });
      }
    }
    return ret;
  }

  private cutItemFromUnused(
    unused: Unused,
    item: Item,
    isRotated: boolean,
    isVertical: boolean,
  ): [Used | null, Unused[]] {
    const [itemWidth, itemHeight] = isRotated
      ? [item.height, item.width]
      : [item.width, item.height];
    if (unused.height < itemHeight || unused.width < itemWidth) {
      return [null, []];
    }
    const used: Used = {
      panel: unused.panel,
      item,
      x: unused.x,
      y: unused.y,
      isRotated,
    };
    const newUnused = [];
    let [width, height] = [
      unused.width - itemWidth - this.cutWidth,
      isVertical ? unused.height : itemHeight,
    ];
    if (width > 0) {
      newUnused.push({
        panel: unused.panel,
        width,
        height,
        x: unused.x + itemWidth + this.cutWidth,
        y: unused.y,
      });
    }
    [width, height] = [
      isVertical ? itemWidth : unused.width,
      unused.height - itemHeight - this.cutWidth,
    ];
    if (height > 0) {
      newUnused.push({
        panel: unused.panel,
        width,
        height,
        x: unused.x,
        y: unused.y + itemHeight + this.cutWidth,
      });
    }
    return [used, newUnused];
  }

  private fitness(result: CalcData): number {
    const totalArea = result.panels.reduce(
      (res: number, pnl: Panel) => res + pnl.width * pnl.height,
      0,
    );
    let fitness = 0;
    for (const pnl of result.panels) {
      const usedAreas = result.usedElements
        .filter((used: Used) => used.panel === pnl)
        .map((used: Used) => used.item.width * used.item.height);
      const unusedAreas = result.unusedElements
        .filter((unused: Unused) => unused.panel === pnl)
        .map((unused: Unused) => unused.width * unused.height);
      fitness +=
        (pnl.width * pnl.height -
          usedAreas.reduce((res: number, area: number) => res + area)) /
        totalArea;
      fitness -=
        (FITNESS_K *
          (Math.min(...usedAreas) || 0) *
          (Math.max(...unusedAreas) || 0)) /
        (totalArea * totalArea);
    }
    return fitness;
  }
}

// console.log(
//   JSON.stringify(
//     new CutterGuillotine(2500, 1250).caclulateWithInfinityPanels([
//       {
//         width: 290,
//         height: 2000,
//         canRotate: true,
//       },
//       {
//         width: 370,
//         height: 290,
//         canRotate: true,
//       },
//       {
//         width: 290,
//         height: 2000,
//         canRotate: true,
//       },
//       {
//         width: 370,
//         height: 290,
//         canRotate: true,
//       },
//       {
//         width: 290,
//         height: 2000,
//         canRotate: true,
//       },
//       {
//         width: 370,
//         height: 290,
//         canRotate: true,
//       },
//       {
//         width: 290,
//         height: 2000,
//         canRotate: true,
//       },
//       {
//         width: 370,
//         height: 290,
//         canRotate: true,
//       },
//       {
//         width: 290,
//         height: 2000,
//         canRotate: true,
//       },
//       {
//         width: 370,
//         height: 290,
//         canRotate: true,
//       },
//       {
//         width: 290,
//         height: 2000,
//         canRotate: true,
//       },
//       {
//         width: 370,
//         height: 290,
//         canRotate: true,
//       },
//       {
//         width: 290,
//         height: 2000,
//         canRotate: true,
//       },
//       {
//         width: 370,
//         height: 290,
//         canRotate: true,
//       },
//       {
//         width: 290,
//         height: 2000,
//         canRotate: true,
//       },
//       {
//         width: 370,
//         height: 290,
//         canRotate: true,
//       },
//     ]),
//   ),
// );
