import { Alert, Text } from 'react-native';
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
<<<<<<< HEAD



export const RecoverPassword = ({ navigation }) => {

	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');


	 async function SendEmail() {
    // Verifica se o e-mail é nulo ou vazio
    if (!email) {
      setError('Por favor, digite seu e-mail.');
	  Alert.alert('Atenção', 'É necessário digitar o e-mail')
      return;
    }

    setLoading(true);
    try {
      await api.post(`/RecuperarSenha?email=${email}`);
      navigation.replace('CheckEmail', { emailRecuperacao: email });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('E-mail não encontrado. Verifique e tente novamente.');
        Alert.alert('Atenção', 'O e-mail digitado nao foi encontrado')
      } else {
        console.log(error);
        alert('Ocorreu um erro. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }
=======

export const RecoverPassword = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function SendEmail() {
		// Verifica se o e-mail é nulo ou vazio
		if (!email) {
			setError('Por favor, digite seu e-mail.');
			Alert.alert('Atenção', 'É necessário digitar o e-mail');
			return;
		}

		setLoading(true);
		try {
			await api.post(`/RecuperarSenha?email=${email}`);
			navigation.replace('CheckEmail', { emailRecuperacao: email });
		} catch (error) {
			if (error.response && error.response.status === 404) {
				setError('E-mail não encontrado. Verifique e tente novamente.');
				Alert.alert('Atenção', 'O e-mail digitado nao foi encontrado');
			} else {
				console.log(error);
				alert('Ocorreu um erro. Por favor, tente novamente.');
			}
		} finally {
			setLoading(false);
		}
	}
>>>>>>> 386569977ea7e7c73ce08ad3f05ae84bf3697cf4
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
<<<<<<< HEAD
				value={email} onChangeText={(text) => setEmail(text)} />
			<Button onPress={() => SendEmail()} >
=======
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<Button onPress={() => SendEmail()}>
>>>>>>> 386569977ea7e7c73ce08ad3f05ae84bf3697cf4
				{loading ? (
					<ActivityIndicator size="small" color="#ffffff" />
				) : (
					<ButtonTitle>Continue</ButtonTitle>
				)}
			</Button>
		</Container >
	);
};
