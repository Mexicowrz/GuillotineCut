import React from 'react';
import { ItemList } from '@components/ItemList';
import { PanelSizeListProps } from './PanelSizeList.types';

export const PanelSizeList: React.FC<PanelSizeListProps> = (props) => {
  return <ItemList {...props} title='Размеры остатков' />;
};
