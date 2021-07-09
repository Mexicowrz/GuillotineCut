import React from 'react';
import { CardForm } from '@components/CardForm';
import { Layout } from '@ui-kitten/components';
import { styles } from './PanelFixedSize.styles';
import { NumericInput } from '@components/NumericInput';
import { PanelFixedSizeProps } from './PanelFixedSize.types';

export const PanelFixedSize: React.FC<PanelFixedSizeProps> = (
  props: PanelFixedSizeProps,
) => {
  return (
    <CardForm title='Размер заготовок'>
      <Layout style={styles.container} level='1'>
        <NumericInput
          style={styles.input}
          placeholder='Длина'
          maxValue={1000000000}
          value={props.width}
          onChange={props.setWidth}
        />
        <NumericInput
          style={styles.input}
          placeholder='Ширина'
          maxValue={1000000000}
          value={props.height}
          onChange={props.setHeight}
        />
      </Layout>
    </CardForm>
  );
};
