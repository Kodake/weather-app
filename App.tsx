import React, { useEffect } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import store from './store/sharedStateStore';
import { styles } from './AppStyles';

const App: React.FC = () => {
  useEffect(() => {
    if (store.ciudad !== '' && store.pais !== '') {
      store.consultarClima();
    }
  }, []);

  return (
    <>
      <View style={[styles.app, { backgroundColor: store.bgColor }]}>
        <View style={styles.contenido}>
          {store.resultado && <Clima />}
          <Formulario />
        </View>
      </View>
    </>
  );
};

export default observer(App);
