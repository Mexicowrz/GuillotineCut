import { InputProps } from '@ui-kitten/components';
export type NumeritInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  value?: number;
  maxValue?: number;
  onChange?: (val?: number) => void;
};
