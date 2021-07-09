import React, { useState } from 'react';
import { ScrollView, ImageProps } from 'react-native';
import {
  Button,
  Layout,
  Divider,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Modal,
  Card,
  Text,
} from '@ui-kitten/components';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { PanelFixedSize } from './components/PanelFixedSize';
import { PanelSizeList } from './components/PanelSizeList';
import { CalculationTypeEdit } from './components/CalculationTypeEdit';
import { ProductList } from './components/ProductList';
import { styles } from './FillingPage.styles';
import {
  CalcType,
  CalculationData,
  PanelElement,
} from '@models/calculation';
import { Preloader } from '@components/Preloader';
import { calculate } from '@utils/WorkerCalculation';
import { FillingPageProps } from './FillingPage.types';
import { useEffect } from 'react';

const MenuIcon: RenderProp<Partial<ImageProps>> = (props) => (
  <Icon {...props} name='more-vertical' />
);

const validateForm = (data: CalculationData) => {
  if (data.type === CalcType.INFINITE) {
    if (!data.defaultPanelWidth || !data.defaultPanelHeight) {
      throw new Error(
        'Проверьте заполнение полей блока "Размер заготовок". Значения должны быть положительными целыми числами.',
      );
    }
  } else {
    data.panels?.forEach((pnl) => {
      if (!pnl.width || !pnl.height || !pnl.count) {
        throw new Error(
          'Проверьте заполнение полей блока "Размеры остатков". Значения должны быть положительными целыми числами.',
        );
      }
    });
  }
  data.products?.forEach((prod) => {
    if (!prod.width || !prod.height || !prod.count) {
      throw new Error(
        'Проверьте заполнение полей блока "Размеры изделий". Значения должны быть положительными целыми числами.',
      );
    }
  });
};

export const FillingPage: React.FC<FillingPageProps> = (props) => {
  const [type, setType] = useState(CalcType.INFINITE);
  const [defaultWidth, setDefaultWidth] = useState<number | undefined>();
  const [defaultHeight, setDefaultHeight] = useState<number | undefined>();

  const [panels, setPanels] = useState<PanelElement[]>([]);
  const [products, setProducts] = useState<PanelElement[]>([]);
  const [error, setError] = useState<string>('');

  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  useEffect(() => {
    if (isCalculating) {
      const data: CalculationData = {
        cutWidth: 0,
        type,
        defaultPanelWidth: defaultWidth,
        defaultPanelHeight: defaultHeight,
        panels,
        products,
      };
      try {
        validateForm(data);
        const result = calculate(data);
        props.navigation.navigate('ResultPage', { result });
      } catch (error) {
        console.log('error', error);
        setError(error.message || 'Ошибка');
      } finally {
        setIsCalculating(false);
      }
    }
  }, [isCalculating]);

  const onCalculate = () => {
    setIsCalculating(true);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        automaticallyAdjustContentInsets={true}
      >
        <CalculationTypeEdit type={type} setType={setType} />
        {type === CalcType.INFINITE && (
          <PanelFixedSize
            width={defaultWidth}
            height={defaultHeight}
            setWidth={setDefaultWidth}
            setHeight={setDefaultHeight}
          />
        )}
        {type !== CalcType.INFINITE && (
          <PanelSizeList items={panels} setItems={setPanels} />
        )}
        <ProductList items={products} setItems={setProducts} />
        <Divider />
        <Layout>
          <Button onPress={onCalculate}>Рассчитать</Button>
        </Layout>
      </ScrollView>
      <Modal
        visible={!!error}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setError('')}
      >
        <Card disabled={true}>
          <Text style={styles.errorText}>{error}</Text>
          <Button onPress={() => setError('')}>Закрыть</Button>
        </Card>
      </Modal>
      {isCalculating && <Preloader />}
    </>
  );
};
