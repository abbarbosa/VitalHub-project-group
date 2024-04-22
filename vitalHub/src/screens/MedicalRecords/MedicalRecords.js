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
import { useEffect, useState } from 'react';
import { api } from '../../services/Service';

export const MedicalRecords = ({ navigation, route }) => {
	const [consulta, setConsulta] = useState(null);

	useEffect(() => {
		if (consulta == null && route.params.consultaid) {
			console.log(consulta);

			BuscarConsulta();
		}
	}, [consulta, route.params.consultaid]);

	async function BuscarConsulta() {
		await api
			.get(`/Consultas/BuscarPorId?id=${route.params.consultaid}`)
			.then((response) => {
				setConsulta(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return (
		<ScrollContainer>
			<Container>
				<ProfilePicture
					source={{
						uri: 'https://i.ibb.co/pzb7dV8/4ac0d625-25c8-40b1-a39c-6389a4066e25.jpg',
					}}
				/>
				<ContentName>
					{/* <TextProfileName>
						{consulta.paciente.idNavigation.nome}
					</TextProfileName>
					<TextProfileEmail>
						{consulta.paciente.idNavigation.email}
					</TextProfileEmail> */}
				</ContentName>
				<ContentProfile>
					<TextProfileInput>Query description:</TextProfileInput>
					<InputRecord placeholder={'Description'} multiline={true}>
						{consulta.exames[0]?.descricao}
					</InputRecord>
				</ContentProfile>
				<ContentProfile>
					<TextProfileInput>Patient diagnosis:</TextProfileInput>
					<InputMedicalRecords placeholder={'Diagnosis'}>
						{consulta.diagnostico}
					</InputMedicalRecords>
				</ContentProfile>
				<ContentProfile>
					<TextProfileInput>Medical prescription:</TextProfileInput>
					<InputRecord placeholder={'Prescription'}>
						{consulta.receita?.medicamento}
					</InputRecord>
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
