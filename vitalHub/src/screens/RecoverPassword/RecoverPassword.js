import { Text } from 'react-native';
import { Container } from '../../components/Container/Style';
import { AntDesign } from '@expo/vector-icons';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { ContentIconSetinha, SubText } from './Style';
import { RecoverInput } from '../../components/Input/Style';
import { Button, ButtonTitle } from '../../components/Button/Style';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { api } from '../../services/Service';

export const RecoverPassword = ({ navigation }) => {

	const [email, setEmail] = useState ('') 

	async function SendEmail(){
		await api.post(`/RecuperarSenha?email=${email}`)
		.then(() => {
			navigation.replace("CheckEmail", {emailRecuperacao : email})
		}).catch(error =>{
			console.log(error);
		})
	}
	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.goBack()}>
				<AntDesign name="leftcircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Recover Password</Title>
			<SubText>
				Enter your registered email address below and we'll send you a
				link to recover your password.
			</SubText>
			<RecoverInput 
			placeholder={'Username or E-mail'} 
			value={email} onChangeText={(text) => setEmail(text)} />
			<Button onPress={()=> SendEmail()}>
				<ButtonTitle>Continue</ButtonTitle>
			</Button>
		</Container>
	);
};
