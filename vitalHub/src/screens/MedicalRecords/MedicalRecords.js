import { StatusBar, Text } from 'react-native';
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
	const [descricao, setDescricao] = useState('');
	const [diagnostico, setDiagnostico] = useState('');
	const [prescricao, setPrescricao] = useState('');
	const [edicaoHabilitada, setEdicaoHabilitada] = useState(false);

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

	async function EditarProntuario() {
		try {
			await api
				.put(`/Consultas/Prontuario`, {
					consultaid: route.params.consultaid,
					medicamento: prescricao,
					descricao: descricao,
					diagnostico: diagnostico,
				})
				.then((response) => {
					setEdicaoHabilitada(false);
					console.log(`Sucesso na edicao: ${response}`);
				})
				.catch((error) => {
					console.log(`Deu erro no metodo: ${error}`);
				});
		} catch (error) {
			console.log(`Deu erro na chamada da api: ${error}`);
		}
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
					<TextProfileName>
						{consulta && consulta.paciente?.idNavigation?.nome}
					</TextProfileName>
					<TextProfileEmail>
						{consulta && consulta.paciente?.idNavigation?.email}
					</TextProfileEmail>
				</ContentName>
				<ContentProfile>
					<TextProfileInput>Query description:</TextProfileInput>
					<InputRecord
						placeholder={'Description'}
						multiline={true}
						onChangeText={(text) => setDescricao(text)}
						editable={edicaoHabilitada}
					>
						{consulta && consulta.descricao}
					</InputRecord>
				</ContentProfile>
				<ContentProfile>
					<TextProfileInput>Patient diagnosis:</TextProfileInput>
					<InputMedicalRecords
						placeholder={'Diagnosis'}
						onChangeText={(text) => setDiagnostico(text)}
						editable={edicaoHabilitada}
					>
						{consulta && consulta.diagnostico}
					</InputMedicalRecords>
				</ContentProfile>
				<ContentProfile>
					<TextProfileInput>Medical prescription:</TextProfileInput>
					<InputRecord
						placeholder={'Prescription'}
						onChangeText={(text) => setPrescricao(text)}
						editable={edicaoHabilitada}
					>
						{consulta && consulta.receita?.medicamento}
					</InputRecord>
				</ContentProfile>
				{edicaoHabilitada ? (
					<Button
						onPress={() => EditarProntuario()}
						disabled={!consulta}
					>
						<ButtonTitle>Save</ButtonTitle>
					</Button>
				) : (
					<Button
						disabled={!consulta}
						style={{ backgroundColor: '#CCCCCC' }}
					>
						<ButtonTitle>Save</ButtonTitle>
					</Button>
				)}
				<Button
					onPress={() => setEdicaoHabilitada(true)}
					disabled={edicaoHabilitada}
				>
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
