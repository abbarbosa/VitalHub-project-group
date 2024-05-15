import { useState } from 'react';
import { Alert, Text } from 'react-native';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { Container } from '../../components/Container/Style';
import { ContentIconSetinha, SubText } from '../RecoverPassword/Style';
import { Input, RecoverInput } from '../../components/Input/Style';
import { Button, ButtonTitle } from '../../components/Button/Style';
import { AntDesign } from '@expo/vector-icons';
import { api } from '../../services/Service';
import * as Yup from 'yup';

export const ResetPassword = ({ navigation, route }) => {
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [errors, setErrors] = useState({});

	async function UpdatePwd() {
		try {
			const schema = Yup.object().shape({
				password: Yup.string().required('Password is required'),
				confirm: Yup.string()
					.oneOf([Yup.ref('password'), null], 'Passwords must match')
					.required('Confirm password is required'),
			});

			await schema.validate({ password, confirm }, { abortEarly: false });

			await api.put(
				`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`,
				{
					senhaNova: password,
				},
			);

			navigation.replace('Login');
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const validationErrors = {};
				error.inner.forEach((e) => {
					validationErrors[e.path] = e.message;
				});
				setErrors(validationErrors);
			} else {
				console.log(error);
			}
		}
	}

	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.navigate('Login')}>
				<AntDesign name="closecircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>

			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Redefinir senha</Title>
			<SubText>Insira e confirme a sua nova senha</SubText>

			<Input
				placeholder={'Nova senha'}
				value={password}
				onChangeText={(txt) => setPassword(txt)}
				secureTextEntry={true}
			/>
			{errors.password && (
				<Text style={{ color: 'red' }}>{errors.password}</Text>
			)}

			<RecoverInput
				placeholder={'Confirmar nova senha'}
				value={confirm}
				onChangeText={(txt) => setConfirm(txt)}
				secureTextEntry={true}
			/>
			{errors.confirm && (
				<Text
					style={{ color: 'red', marginBottom: 10, marginTop: -30 }}
				>
					{errors.confirm}
				</Text>
			)}

			<Button onPress={UpdatePwd}>
				<ButtonTitle>Confirmar nova senha</ButtonTitle>
			</Button>
		</Container>
	);
};