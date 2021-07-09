import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CalculationStackParamList } from '@models/calculation';

export type ResultPageProps = NativeStackScreenProps<
  CalculationStackParamList,
  'ResultPage'
>;
