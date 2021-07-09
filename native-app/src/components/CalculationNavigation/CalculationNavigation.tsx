import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FillingPage } from '@containers/FillingPage';
import { ResultPage } from '@containers/ResultPage';

const Stack = createNativeStackNavigator();

export const CalculationNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='FillingPage'
        component={FillingPage}
        options={{ title: 'Заполнение формы' }}
      />
      <Stack.Screen
        name='ResultPage'
        component={ResultPage}
        options={{ title: 'Результат рассчета' }}
      />
    </Stack.Navigator>
  );
};
