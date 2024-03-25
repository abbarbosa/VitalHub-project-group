import { Button, ButtonTitle } from '../../components/Button/Style';
import { Container } from '../../components/Container/Style';
import { Input, RecoverInput } from '../../components/Input/Style';
import { MiniLink } from '../../components/Links/Style';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { ContentIconSetinha, SubText } from '../RecoverPassword/Style';
import { AntDesign } from '@expo/vector-icons';

export const CreateAccount = ({ navigation }) => {
	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.navigate('Login')}>
				<AntDesign name="closecircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Create Account</Title>
			<SubText>
				Enter your e-mail address and password to register.
			</SubText>
			<Input placeholder={'Username or E-mail'} />
			<Input placeholder={'Password'} secureTextEntry={true} />
			<RecoverInput
				placeholder={'Confirm Password'}
				secureTextEntry={true}
			/>
			<Button>
				<ButtonTitle>Register</ButtonTitle>
			</Button>
			<MiniLink onPress={() => navigation.navigate('Login')}>
				Cancel
			</MiniLink>
		</Container>
	);
};
