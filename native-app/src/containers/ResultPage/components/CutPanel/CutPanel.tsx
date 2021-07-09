import React from 'react';
import Svg, { Rect, Text, Use, G } from 'react-native-svg';
import { CutPanelProps } from './CutPanel.types';
import { Dimensions } from 'react-native';
import {
  CalculationResultProduct,
  ColorsOfProducts,
} from '@models/calculation';

const ProductBlock: React.FC<{
  product: CalculationResultProduct;
  index: number;
  colors: ColorsOfProducts;
  isSelected: boolean;
  strokeWidth: number;
  fontSize: number;
}> = (props) => {
  const { product, index, colors, isSelected, strokeWidth, fontSize } = props;
  const [width, height] = product.isRotated
    ? [product.height, product.width]
    : [product.width, product.height];
  return (
    <>
      <Rect
        x={product.x}
        y={product.y}
        width={width}
        height={height}
        fill={colors[product.id].bg}
        stroke={isSelected ? 'red' : '#000'}
        strokeWidth={isSelected ? strokeWidth * 2 : strokeWidth}
      />
      <Text
        textAnchor={'middle'}
        x={product.x + width / 2}
        y={product.y + height / 2 + fontSize / 3}
        fill={colors[product.id].color}
        fontSize={fontSize}
      >
        {colors[product.id].index + 1}
      </Text>
    </>
  );
};

export const CutPanel: React.FC<CutPanelProps> = (props: CutPanelProps) => {
  const windowWidth = Dimensions.get('window').width;
  const { width, height, products } = props.panel;
  const colors = props.colors;
  const fontSize = 3 / (100 / width);
  const strokeWidth = width / windowWidth;
  return (
    <Svg
      width={windowWidth}
      height={(height * windowWidth) / width}
      viewBox={`0 0 ${width} ${height}`}
    >
      <Rect
        key='main'
        x={0}
        y={0}
        width={width}
        height={height}
        strokeWidth={strokeWidth}
        stroke='#000'
      />
      {products.map(
        (pr, index) =>
          index !== props.selectedIndex && (
            <ProductBlock
              key={index}
              product={pr}
              index={index}
              colors={colors}
              fontSize={fontSize}
              strokeWidth={strokeWidth}
              isSelected={false}
            />
          ),
      )}
      {props.selectedIndex !== undefined && (
        <ProductBlock
          key={props.selectedIndex}
          product={products[props.selectedIndex]}
          index={props.selectedIndex}
          colors={colors}
          fontSize={fontSize}
          strokeWidth={strokeWidth}
          isSelected={true}
        />
      )}
    </Svg>
  );
};
