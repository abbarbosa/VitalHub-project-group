import { StatusBar } from 'react-native';
import { Title } from '../../components/Title/Style';
import { Container, ScrollContainer } from '../../components/Container/Style';
import { ImageUser } from '../../components/Header/Style';
import {
	ContentName,
	ContentProfile,
	ProfilePicture,
	TextProfileEmail,
	TextProfileInput,
	TextProfileName,
} from '../Profile/Style';
import {
	Input,
	InputMedicalRecords,
	InputRecord,
	InputRecords,
} from '../../components/Input/Style';
import {
	Button,
	ButtonSecundaryTitle,
	ButtonTitle,
} from '../../components/Button/Style';

export const MedicalRecords = ({ navigation }) => {
	return (
		<ScrollContainer>
			<Container>
				<ProfilePicture
					source={{
						uri: 'https://i.ibb.co/pzb7dV8/4ac0d625-25c8-40b1-a39c-6389a4066e25.jpg',
					}}
				/>
				<ContentName>
					<TextProfileName>Richard Kosta</TextProfileName>
					<TextProfileEmail>richard.kosta@gmail.com</TextProfileEmail>
				</ContentName>
				<ContentProfile>
					<TextProfileInput>Query description:</TextProfileInput>
					<InputRecord placeholder={'Description'} />
				</ContentProfile>
				<ContentProfile>
					<TextProfileInput>Patient diagnosis:</TextProfileInput>
					<InputMedicalRecords placeholder={'Diagnosis'} />
				</ContentProfile>
				<ContentProfile>
					<TextProfileInput>Medical prescription:</TextProfileInput>
					<InputRecord placeholder={'Prescription'} />
				</ContentProfile>
				<Button>
					<ButtonTitle>Save</ButtonTitle>
				</Button>
				<Button disabled={true}>
					<ButtonTitle>Edit</ButtonTitle>
				</Button>
				<ButtonSecundaryTitle
					onPress={() => navigation.navigate('Home')}
				>
					Cancel
				</ButtonSecundaryTitle>
			</Container>
		</ScrollContainer>
	);
};
