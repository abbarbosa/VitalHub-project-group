import { Text } from 'react-native';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { Container } from '../../components/Container/Style';
import { ContentIconSetinha, SubText } from '../RecoverPassword/Style';
import { Input, RecoverInput } from '../../components/Input/Style';
import { Button, ButtonTitle } from '../../components/Button/Style';
import { AntDesign } from '@expo/vector-icons';

export const ResetPassword = ({ navigation }) => {
	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.navigate('Login')}>
				<AntDesign name="closecircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Reset Password</Title>
			<SubText>Insert and confirm your new password</SubText>
			<Input placeholder={'New Password'} />
			<RecoverInput placeholder={'Confirm new password'} />
			<Button onPress={() => navigation.navigate('Login')}>
				<ButtonTitle>Confirm new password</ButtonTitle>
			</Button>
		</Container>
	);
};
