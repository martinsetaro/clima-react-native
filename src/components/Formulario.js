import React, { useState } from 'react';
import { Text,
View,
StyleSheet,
TextInput,
TouchableWithoutFeedback,
Animated,
Alert
} from 'react-native';
import {Picker} from '@react-native-picker/picker';





const Formulario = ({ busqueda , guardarBusqueda , guardarConsulta}) =>{

  const { ciudad , pais } = busqueda;
  const [animacionBoton] = useState(new Animated.Value(1))

 

// Boton consultar api

const consultarClima = () => {

  if(ciudad.trim() === '' || pais.trim() === '' ){
    Alert.alert( "Error" , "Agrega una ciudad o un país para la búsqueda",
      [{text:"Entendido"}]
    )
    return
  }

  guardarConsulta(true)

}







  const animacionEntrada = () => {
        Animated.spring(animacionBoton , {
          toValue:.75,
          useNativeDriver: true
        }).start();
  } 

  const estiloAnimacion = {
    transform : [{ scale: animacionBoton }]
  }



  const animacionSalida = ()=>{
    Animated.spring(animacionBoton , {
      toValue:1,
      friction:4,
      tension:30,
      useNativeDriver: true
    }).start();
  }


    return (

      <View style={style.formulario}>

         <View>
           <TextInput 
           value={ciudad}
           onChangeText={ ciudad => guardarBusqueda({...busqueda , ciudad})}
           style={style.input}
             placeholder='Ciudad'
             placeholderTextColor='#333'
           />
        </View>

        <View>

          <Picker
          selectedValue={pais}
          style={{height:60,backgroundColor:'#fff'}}
          onValueChange={pais => guardarBusqueda({ ...busqueda , pais})}
          >
              <Picker.Item label="-- Seleccione un pais" value="" />
              <Picker.Item label="Argentina" value="AR" />
              <Picker.Item label="Brasil" value="BR" />
              <Picker.Item label="Estados Unidos" value="US" />
              <Picker.Item label="Mexico" value="MX" />
              <Picker.Item label="Colombia" value="CO"/>
              <Picker.Item label="Perú" value="PE"/>
              <Picker.Item label="Costa Rica" value="CR"/>
              <Picker.Item label="España" value="ES"/>
          </Picker>

          <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
          onPress={ () => consultarClima()}
          >
            <Animated.View style={[style.btnBuscar , estiloAnimacion]}>
              <Text style={style.textoBuscar}>Buscar clima</Text>
            </Animated.View>
          </TouchableWithoutFeedback>


        </View>

      </View>
    );
  }
const style = StyleSheet.create({

input:{
  padding:10,
  height:50,
  backgroundColor:'#fff',
  fontSize:20,
  marginBottom:20,
  textAlign:'center'
},
btnBuscar:{
 marginTop:50,
 backgroundColor:'#000',
 padding:10,
 justifyContent:'center',
 borderRadius:10
},
textoBuscar:{
 color:'#fff',
 textAlign:'center',
 fontWeight:'bold',
 textTransform:'uppercase',
 fontSize:18
}

})
export default Formulario;