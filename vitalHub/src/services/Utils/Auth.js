import AsyncStorage from '@react-native-async-storage/async-storage'
import {jwtDecode} from 'jwt-decode'
import { decode, encode } from 'base-64'

//configura modos de codificação e descodificação
if (!global.atob){
    global.atob = decode
}

if (!global.btoa){
    global.btoa = encode
}

//função de decodificar o token
export const UserDecodeToken =async() =>{
    //capturar o token
    const token = await AsyncStorage.getItem('token');

    if(token === null){
        return null;
    }
    const  decoded = jwtDecode(token)

    return{
        role: decoded.role,
        name: decoded.name,
        email: decoded.email
    }
}

