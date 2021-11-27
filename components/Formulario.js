import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {

    const { pais, ciudad } = busqueda;

    const [animacionBoton] = useState(new Animated.Value(1));

    const consultarClima = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta();
            return false;
        }

        guardarConsultar(true);
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y país a la búsqueda.',
            [{ text: 'Entendido...' }]
        )
    }

    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            toValue: .75
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring(animacionBoton, {
            toValue: 1,
            friction: 4,
            tension: 100
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionBoton }]
    }

    return (
        <View style={StyleSheet.formulario}>
            <View>
                <TextInput
                    value={ciudad}
                    style={styles.input}
                    onChange={city => guardarBusqueda({ ...busqueda, city })}
                    placeholder='Ciudad'
                    placeholderTextColor='#666'
                />
            </View>

            <View>
                <Picker
                    selectedValue={country => guardarBusqueda({ ...busqueda, country })}
                    itemStyle={{ height: 120, backgroundColor: '#FFF' }}>
                    <Picker.Item label='--Seleccione un país--' value='' />
                    <Picker.Item label='México' value='MX' />
                    <Picker.Item label='Argentina' value='AR' />
                </Picker>
            </View>

            <TouchableWithoutFeedback
                onPressIn={() => animacionEntrada()}
                onPressOut={() => animacionSalida()}
                onPress={() => consultarClima()}
            >
                <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                    <Text style={styles.textoBuscar}>Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 15,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    textoBuscar: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})

export default Formulario;