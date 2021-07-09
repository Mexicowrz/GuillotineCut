import { RenderProp } from '@ui-kitten/components/devsupport';
import { ReactChildren, ReactChild } from 'react';
import { ViewProps } from 'react-native';

export type CardFormProps = {
  title: string;
  children?: ReactChild | ReactChild[] | ReactChildren | ReactChildren[] | JSX.Element[];
  footer?: RenderProp<ViewProps>;
};
