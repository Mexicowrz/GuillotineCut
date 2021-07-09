import { CalcType } from 'types/calculation';

export type CalculationTypeEditProps = {
  type: CalcType;
  setType: (type: CalcType) => void;
};
