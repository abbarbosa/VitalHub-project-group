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
import { ActivityIndicator } from 'react-native';
import * as Yup from 'yup';

export const RecoverPassword = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('E-mail inválido')
			.required('Por favor, digite seu e-mail.'),
	});

	async function SendEmail() {
		try {
			await validationSchema.validate({ email }, { abortEarly: false });
		} catch (validationError) {
			const errorMessage = validationError.errors[0];
			setError(errorMessage);
			return;
		}

		setLoading(true);
		try {
			await api.post(`/RecuperarSenha?email=${email}`);
			navigation.replace('CheckEmail', { emailRecuperacao: email });
		} catch (error) {
			if (error.response && error.response.status === 404) {
				setError('E-mail não encontrado. Verifique e tente novamente.');
			} else {
				console.log(error);
				setError('Ocorreu um erro. Por favor, tente novamente.');
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.goBack()}>
				<AntDesign name="leftcircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Recover Password?</Title>
			<SubText>
				Enter your registered email address below and we'll send you a
				link to recover your password.
			</SubText>
			<RecoverInput
				placeholder={'Username or E-mail'}
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			{error ? (
				<Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>
			) : null}
			<Button onPress={() => SendEmail()}>
				{loading ? (
					<ActivityIndicator size="small" color="#ffffff" />
				) : (
					<ButtonTitle>Continue</ButtonTitle>
				)}
			</Button>
		</Container>
	);
};
