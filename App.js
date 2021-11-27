import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        console.log('Consultando la API...');
        const API_KEY = `9e98f86b6c35e2b3a50d7cdcf47cac37`;
        const API_URL = `api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}`;

        try {
          const response = await fetch(API_URL);
          const result = await response.json();
          guardarResultado(result);
          guardarConsultar(false);
        } catch (error) {
          mostrarAlerta();
        }
      }
    }
    consultarClima();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'no hay resultados, intenta con otra ciudad o país.',
      [{ text: 'Ok' }]
    )
  }

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={styles.app}>
          <View style={styles.contenido}>
            <Clima resultado={resultado}/>
            <Formulario busqueda={busqueda} guardarBusqueda={guardarBusqueda} guardarConsultar={guardarConsultar} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#0F2C67',
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
