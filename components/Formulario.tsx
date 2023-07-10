import { Picker } from '@react-native-picker/picker';
import { styles } from './FormularioStyles';
import store from '../store/sharedStateStore';
import { Text, View, TextInput, TouchableWithoutFeedback, Animated } from 'react-native';
import { observer } from 'mobx-react';

const Formulario: React.FC = observer(() => {
    const { animacionBtn } = store;

    const estiloAnimacion = {
        transform: [{ scale: animacionBtn }],
    };

    return (
        <>
            <View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => store.setCiudad(texto)}
                        placeholder="Ciudad"
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <Picker
                        onValueChange={(value) => {
                            store.setPais(value)
                        }}
                        selectedValue={(store.pais)}
                        style={styles.selector}
                    >
                        <Picker.Item key={'00'} label="-- Seleccione un país --" value="" />
                        <Picker.Item key={'US'} label="Estados Unidos" value="US" />
                        <Picker.Item key={'MX'} label="México" value="MX" />
                        <Picker.Item key={'AR'} label="Argentina" value="AR" />
                        <Picker.Item key={'CO'} label="Colombia" value="CO" />
                        <Picker.Item key={'CR'} label="Costa Rica" value="CR" />
                        <Picker.Item key={'ES'} label="España" value="ES" />
                        <Picker.Item key={'EC'} label="Ecuador" value="EC" />
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={() => store.animacionEntrada(animacionBtn)}
                    onPressOut={() => store.animacionSalida(animacionBtn)}
                    onPress={() => store.consultarClima()}
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.txtBuscar}>Buscar clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
});

export default Formulario;
