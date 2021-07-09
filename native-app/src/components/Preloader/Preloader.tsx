import React from 'react';
import { Modal, Spinner } from '@ui-kitten/components';
import { styles } from './Preloader.styles';

export const Preloader: React.FC = () => {
  return (
    <Modal visible={true} backdropStyle={styles.backdrop}>
      <Spinner size='giant' />
    </Modal>
  );
};
