import React, { useCallback, useMemo, useEffect } from 'react';
import update from 'react-addons-update';
import { CardForm } from '../CardForm';
import { Layout, Icon, Button } from '@ui-kitten/components';
import { styles } from './ItemList.styles';
import { NumericInput } from '../NumericInput';
import { ImageProps, View } from 'react-native';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { ViewProps } from 'react-native';
import { ItemListProps } from './ItemList.types';
import { ItemElement } from '@models/calculation';
// import { RenderProp } from '@ui-kitten/components/devsupport';

const TrashIcon: RenderProp<Partial<ImageProps>> = (props) => (
  <Icon {...props} name='trash-2-outline' />
);

const AddIcon: RenderProp<Partial<ImageProps>> = (props) => (
  <Icon {...props} name='plus-square-outline' />
);

const MakeFooter = (onAdd: () => void): RenderProp<ViewProps> => {
  const Footer: RenderProp<ViewProps> = (props) => (
    <Layout {...props}>
      <Button
        style={styles.button}
        status='success'
        accessoryLeft={AddIcon}
        onPress={onAdd}
      >
        Добавить
      </Button>
    </Layout>
  );
  return Footer;
};

const makeId = () => {
  return `${new Date().getTime()}_${Math.floor(
    (1 + Math.random()) * 0x10000,
  ).toString(16)}`;
};

const Row: React.FC<{
  item: ItemElement;
  index: number;
  onRemove: (item: ItemElement) => void;
  onChange: (index: number, item: ItemElement) => void;
}> = (props) => {
  const onRemove = useCallback(() => {
    props.onRemove(props.item);
  }, [props]);

  const onChangeWidth = useCallback(
    (width) => {
      props.onChange(props.index, { ...props.item, width });
    },
    [props],
  );
  const onChangeHeight = useCallback(
    (height) => {
      props.onChange(props.index, { ...props.item, height });
    },
    [props],
  );
  const onChangeCount = useCallback(
    (count) => {
      props.onChange(props.index, { ...props.item, count });
    },
    [props],
  );

  return (
    <Layout style={styles.row} level='1'>
      <NumericInput
        style={styles.input}
        placeholder='Длина'
        maxValue={1000000000}
        value={props.item.width}
        onChange={onChangeWidth}
      />
      <NumericInput
        style={styles.input}
        placeholder='Ширина'
        maxValue={1000000000}
        value={props.item.height}
        onChange={onChangeHeight}
      />
      <NumericInput
        style={styles.input}
        placeholder='Кол-во'
        maxValue={1000000000}
        value={props.item.count}
        onChange={onChangeCount}
      />

      <Button
        status='danger'
        accessoryLeft={TrashIcon}
        size='small'
        disabled={props.index === 0}
        onPress={onRemove}
      />
    </Layout>
  );
};

export const ItemList: React.FC<ItemListProps> = (props) => {
  useEffect(() => {
    if ((!props.items || props.items.length === 0) && props.setItems) {
      props.setItems([
        {
          id: makeId(),
          count: 1,
        },
      ]);
    }
  }, []);
  const addItem = useCallback(() => {
    props.setItems &&
      props.setItems([...(props.items || []), { id: makeId(), count: 1 }]);
  }, [props]);

  const removeItem = useCallback(
    (item: ItemElement) => {
      props.setItems &&
        props.setItems((props.items || []).filter((val) => val !== item));
    },
    [props],
  );

  const changeItem = useCallback(
    (index: number, item: ItemElement) => {
      props.setItems &&
        props.setItems(update(props.items || [], { [index]: { $set: item } }));
    },
    [props],
  );

  const Footer = useMemo<RenderProp<ViewProps>>(
    () => MakeFooter(addItem),
    [addItem],
  );
  return (
    <CardForm title={props.title} footer={Footer}>
      {props.items &&
        props.items.map((item: ItemElement, index: number) => (
          <Row
            key={item.id}
            item={item}
            index={index}
            onRemove={removeItem}
            onChange={changeItem}
          />
        ))}
    </CardForm>
  );
};
