import React from 'react';
import { Radio, RadioGroup } from '@ui-kitten/components';
import { CardForm } from '@components/CardForm';
import { CalculationTypeEditProps } from './CalculationTypeEdit.types';

export const CalculationTypeEdit: React.FC<CalculationTypeEditProps> = (
  props: CalculationTypeEditProps,
) => {
  // const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <CardForm title='Тип рассчета'>
      <RadioGroup selectedIndex={props.type} onChange={props.setType}>
        <Radio>Подобрать количество заготовок</Radio>
        <Radio>Заполнить по остаткам</Radio>
      </RadioGroup>
    </CardForm>
  );
};
