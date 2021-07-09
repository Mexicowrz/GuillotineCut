import { CutterGuillotine } from '../src/CutterGuillotine';

const testInfinity = {
  defaultPanelWidth: 2500,
  defaultPanelHeight: 1250,
  items: [
    ...Array(5)
      .fill(null)
      .map(() => ({
        width: 290,
        height: 2000,
        canRotate: true,
      })),
    ...Array(3)
      .fill(null)
      .map(() => ({
        width: 370,
        height: 290,
        canRotate: true,
      })),
  ],
};

const testFixed = {
  panels: [{ width: 1250, height: 2500, description: 'test1' }],
  items: [
    {
      width: 290,
      height: 2000,
      canRotate: true,
    },
    {
      width: 370,
      height: 290,
      canRotate: true,
    },
  ],
};

describe('Check CutterGuillotine algorithm', () => {
  it('Check infinity panels with test data', () => {
    const result = new CutterGuillotine(
      testInfinity.defaultPanelWidth,
      testInfinity.defaultPanelHeight,
    ).caclulateWithInfinityPanels(testInfinity.items);
    expect(result).toMatchSnapshot();
  });
  it('Check fixed panels with test data', () => {
    const result = new CutterGuillotine().calculateWithFixedPanels(
      testFixed.panels,
      testFixed.items,
    );
    expect(result).toMatchSnapshot();
  });
  it('Check exception on not enough panels', () => {
    expect(() => {
      new CutterGuillotine().calculateWithFixedPanels(testFixed.panels, [
        ...testFixed.items,
        ...testFixed.items.map((it) => ({ ...it })),
        ...testFixed.items.map((it) => ({ ...it })),
        ...testFixed.items.map((it) => ({ ...it })),
        ...testFixed.items.map((it) => ({ ...it })),
      ]);
    }).toThrow('Unresolvable error. Too few panels for given items.');
  });
  it('Check exception on repeating items', () => {
    expect(() => {
      new CutterGuillotine().calculateWithFixedPanels(testFixed.panels, [
        ...testFixed.items,
        ...testFixed.items,
      ]);
    }).toThrow('Repeating items are not allowed');
  });
  it('Check exception if items are bigger then panels', () => {
    expect(() => {
      new CutterGuillotine().calculateWithFixedPanels(testFixed.panels, [
        ...testFixed.items,
        {
          width: 100000,
          height: 500,
          canRotate: true,
        },
      ]);
    }).toThrow('Unresolvable error. Item bigger then panels.');
    expect(() => {
      const result = new CutterGuillotine(
        testInfinity.defaultPanelWidth,
        testInfinity.defaultPanelHeight,
      ).caclulateWithInfinityPanels([
        ...testInfinity.items,
        { width: 100000, height: 100, canRotate: true },
      ]);
    }).toThrow('Unresolvable error. Item bigger then panels.');
  });
});
