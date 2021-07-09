import { Input, InputProps } from '@ui-kitten/components';
import React from 'react';
import { NumeritInputProps } from './NumericInput.types';

export const NumericInput: React.FC<NumeritInputProps> = (
  props: NumeritInputProps,
) => {
  const [value, setValue] = React.useState('');
  const onChange = (nextValue: string) => {
    let val = nextValue.replace(/\D/gi, '');
    if (val.length > 0 && props.maxValue && +val > props.maxValue) {
      val = props.maxValue.toString();
    }
    setValue(val);
    if (props.onChange) {
      props.onChange(val === '' ? undefined : +val);
    }
  };
  return (
    <Input
      {...props}
      onChange={undefined}
      onChangeText={onChange}
      value={props.value === undefined ? value : props.value.toString()}
    />
  );
};
