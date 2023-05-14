import React, { useState , useEffect } from 'react';
import { Text,
View,
StyleSheet,
Alert,
} from 'react-native';
import Formulario from './src/components/Formulario';
import Clima from './src/components/Clima';

const App = () =>{
  
     const [ busqueda, guardarBusqueda] = useState({
        ciudad:'',
        pais:''
     })
     const [ consulta , guardarConsulta]=useState(false)
     const [ resultado, guardarResultado] = useState({})
     const [ background , guardarBackground] = useState('rgb(71,149,212)');

     const { ciudad , pais } = busqueda;


     useEffect(()=>{
 
        const consultarClima = async () => {

         if(consulta){
             const appId='315f494fcbe86712a996b9b40e0c6517'
             const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`


             try {

                const respuesta = await fetch(url)
                const resultado = await respuesta.json();
                guardarResultado(resultado)
                guardarConsulta(false)

                //modifica los colores de fondo

                const kelvin = 273.15;
                const { main } = resultado;
                const actual = main.temp - kelvin;

                if(actual < 10){
                    guardarBackground('rgb(105,108,149)')

                }else if(actual >= 10 && actual < 25){
                    guardarBackground('rgb(71,149,212)')
                }else {
                   guardarBackground('rgb(178,28,61)')
                }

                
             } catch (error) {
                mostrarAlerta()                
             }
         }


         }

         consultarClima()


     },[consulta])

     const mostrarAlerta = ()=>{
        Alert.alert("Error ", "No hay resultados para esos datos",[{ text:"Entendido"}])
     }

     const bgColorApp = {
        backgroundColor : background
     }


    return (


      <View style={[style.app, bgColorApp]}>

         <View style={style.contenido}>
             <Clima 
             resultado={resultado}
             />
             <Formulario
             busqueda={busqueda}
             guardarBusqueda={guardarBusqueda}
             guardarConsulta={guardarConsulta}
             />

         </View>

      </View>
    );
  }

const style = StyleSheet.create({
    texto:{
     
          fontFamily:'outfit',
         fontSize:50,
         color:'#000',
       
    },
    app:{
      flex:1,
      justifyContent:'center'

    },
    contenido:{
        marginHorizontal:'2.5%'
    }


})
export default App;