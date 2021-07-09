import React from 'react';
import { ItemList } from '@components/ItemList';
import { ProductListProps } from './ProductList.types';

export const ProductList: React.FC<ProductListProps> = (props) => {
  return <ItemList {...props} title='Размеры изделий' />;
};
