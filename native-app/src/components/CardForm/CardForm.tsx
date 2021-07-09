import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { styles } from './CardForm.styles';
import { CardFormProps } from './CardForm.types';

const Header = (title: string) => {
  const header: RenderProp<ViewProps> = (props) => (
    <View {...props}>
      <Text category='s1'>{title}</Text>
    </View>
  );
  return header;
};

export const CardForm: React.FC<CardFormProps> = (props: CardFormProps) => {
  return (
    <Card
      style={styles.card}
      header={Header(props.title)}
      footer={props.footer}
    >
      {props.children}
    </Card>
  );
};
