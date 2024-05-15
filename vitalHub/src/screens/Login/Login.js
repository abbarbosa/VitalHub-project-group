import { Container } from '../../components/Container/Style';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { Input } from '../../components/Input/Style';
import { LinkBold, LinkMedium } from '../../components/Links/Style';
import {
	Button,
	ButtonGoogle,
	ButtonTitle,
	ButtonTitleGoogle,
} from '../../components/Button/Style';
import { AntDesign } from '@expo/vector-icons';
import { ContentAccount, TextAccount } from './Style';
import { useState } from 'react';

import { api } from '../../services/Service';

import AsyncStorage from '@react-native-async-storage/async-storage';

//import para a função de carregamento
import { ActivityIndicator, Alert } from 'react-native';

export const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [loading, setLoading] = useState();

	async function Login() {
		setLoading(true);
		try {
			if (!email || !senha) {
				Alert.alert('Erro', 'Por favor, preencha todos os campos');
				return;
			}

			const response = await api.post('/Login', {
				email: email,
				senha: senha,
			});

			await AsyncStorage.setItem('token', JSON.stringify(response.data));
			navigation.navigate('Main');
		} catch (error) {
			console.log('Erro ao fazer login:', error);
			Alert.alert('Erro', 'Erro ao fazer login. Verifique suas credenciais e tente novamente..');
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	}

	return (
		<Container>
			<Logo source={require('../../assets/logoVitalHub.png')} />

			<Title>Entrar ou criar uma conta</Title>

			<Input
				placeholder={'Usuário email...'}
				value={email}
				onChangeText={(txt) => setEmail(txt)}
			//onChange={event => event.nativeEvent.text}
			/>

			<Input
				placeholder={'Senha...'}
				secureTextEntry={true}
				value={senha}
				onChangeText={(txt) => setSenha(txt)}
			/>

			<LinkMedium onPress={() => navigation.navigate('RecoverPassword')}>
				Esqueceu sua senha?
			</LinkMedium>

			<Button onPress={Login}>
				{loading ? (
					<ActivityIndicator size="small" color="#ffffff" />
				) : (
					<ButtonTitle>Entrar</ButtonTitle>
				)}
			</Button>

			<ButtonGoogle>
				<AntDesign name="google" size={18} color="#496BBA" />
				<ButtonTitleGoogle>Entrar com o  Google</ButtonTitleGoogle>
			</ButtonGoogle>

			<ContentAccount>
				<TextAccount>
					Não tem uma conta?{' '}
					<LinkBold
						onPress={() => navigation.navigate('CreateAccount')}
					>
						Faça uma agora!
					</LinkBold>
				</TextAccount>
			</ContentAccount>
		</Container>
	);
};
