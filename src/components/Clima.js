import React from 'react';
import { Text,
View,
StyleSheet,
Image
} from 'react-native';


const Clima = ({resultado}) =>{

const { name , main } = resultado

// no se ejecuta el componente hasta que no tengamos una respuesta.

if(!name) return null;

//grados kelvin

const kelvin = 273.15

    return (

      <View style={style.clima}>

          <Text style={[style.texto, style.actual]}>{parseInt(main.temp - kelvin)}
             <Text style={style.temperatura}>
                &#x2103;
             </Text>
            <Image 
          style={{width:66, height:58}}
          source={{uri:`http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}
          /> 
          </Text>
          <View style={style.temperaturas}>
            <Text style={style.texto}>Max {' '}
              <Text style={style.temperatura}>
                {parseInt(main.temp_min - kelvin)} &#x2103;
              </Text>
            </Text>
            <Text style={style.texto}>Min {' '}
              <Text style={style.temperatura}>
                {parseInt(main.temp_max - kelvin)} &#x2103;
              </Text>
            </Text>
          </View>
      

      </View>
    );
  }

const style = StyleSheet.create({
 clima:{
 marginBottom:20
 },
 texto:{
  color:'#fff',
  fontSize:20,
  textAlign:'center',
  marginRight:20
 },
 actual:{
fontSize:80,
marginRight:0,
fontWeight:'bold'
 },
 temperatura:{
fontSize:32,
fontWeight:'bold'
 },
 temperaturas:{
  flexDirection:'row',
  justifyContent:'center'
 }

})
export default Clima;