import React from 'react';
import {
  Drawer,
  DrawerItem,
  Layout,
  IndexPath,
  Icon,
} from '@ui-kitten/components';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { ImageProps } from 'react-native';
import Svg, { Circle, Text } from 'react-native-svg';
import { HistoryProps } from './History.types';

const makeCircleIcon = (params: {
  bg: string;
  color: string;
  index: number;
}): RenderProp<Partial<ImageProps>> => {
  return (props) => (
    <Svg width={24} height={24} viewBox='0 0 24 24'>
      <Circle fill={params.bg} cx={12} cy={12} r={12} />
      <Text
        textAnchor={'middle'}
        x={12}
        y={16}
        fill={params.color}
        fontSize={12}
      >
        {params.index + 1}
      </Text>
    </Svg>
  );
};

export const History: React.FC<HistoryProps> = (props: HistoryProps) => {
  return (
    <Layout>
      <Drawer selectedIndex={props.selectedIndex} onSelect={props.onSelect}>
        {props.panel.products.map((product) => (
          <DrawerItem
            key={product.id}
            title={`${product.width}x${product.height}`}
            accessoryLeft={makeCircleIcon(props.colors[product.id])}
          />
        ))}
        {/* <DrawerItem title='Users' accessoryLeft={makeCircleIcon()} />
        <DrawerItem title='Orders' />
        <DrawerItem title='Transactions' />
        <DrawerItem title='Settings' /> */}
      </Drawer>
    </Layout>
  );
};
