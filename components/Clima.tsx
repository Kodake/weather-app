import React from 'react';
import { View, Text, Image } from 'react-native';
import store from '../store/sharedStateStore'
import { styles } from './ClimaStyles';

const Clima: React.FC = () => {
    const { resultado, bgColor } = store;

    if (!resultado?.name) return null;

    const kelvin = 273.15;

    return (
        <View style={[styles.clima, { backgroundColor: bgColor }]}>
            <Text style={[styles.texto, styles.actual]}>
                {parseInt(String(resultado.main.temp - kelvin))}
                <Text style={styles.temperatura}>&#x2103;</Text>
                <Image
                    style={styles.imagen}
                    source={{
                        uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`,
                    }}
                />
            </Text>
            <View style={styles.temperaturas}>
                <Text style={styles.texto}>
                    Min{' '}
                    <Text style={styles.temperatura}>
                        {parseInt(String(resultado.main.temp_min - kelvin))} &#x2103;
                    </Text>
                </Text>
                <Text style={styles.texto}>
                    Max{' '}
                    <Text style={styles.temperatura}>
                        {parseInt(String(resultado.main.temp_max - kelvin))} &#x2103;
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default Clima;
