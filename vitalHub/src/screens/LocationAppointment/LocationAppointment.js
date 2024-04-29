import { useEffect, useState } from 'react';
import {
	ButtonSecundary,
	ButtonSecundaryTitle,
} from '../../components/Button/Style';
import {
	SmallGroupModal,
	SmallTextModal,
	SpaceView,
} from '../../components/ConfirmModal/Style';
import { Container } from '../../components/Container/Style';
import { Map } from '../../components/Maps/Maps';
import { Title } from '../../components/Title/Style';
import {
	ContentProfile,
	ContentRow,
	InputProfile,
	InputRow,
	RowContentProfile,
	TextProfileInput,
} from '../Profile/Style';
import { ImageLocation } from './Style';
import { api } from '../../services/Service';
import { ActivityIndicator } from 'react-native';

export const LocationAppointment = ({ navigation, route }) => {
	const [clinica, setClinica] = useState(null);

	useEffect(() => {
		if (clinica == null && route.params.clinicaid) {
			console.log(clinica);
			BuscarClinica();
		}
	}, [clinica, route.params.clinicaid]);

	async function BuscarClinica() {
<<<<<<< HEAD
		(await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaid}`))
=======
		await api
			.get(`/Clinica/BuscarPorId?id=${route.params.clinicaid}`)
>>>>>>> b7fd4de8fa4fe851da5300da6cc7366ef92155d9
			.then((response) => {
				setClinica(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<Container>
			{clinica !== null ? (
				<>
					<ImageLocation>
						<Map />
					</ImageLocation>

					<SpaceView>
						<Title>{clinica.nomeFantasia}</Title>
						<SmallTextModal>
							{clinica.endereco.cidade}-SP
						</SmallTextModal>
					</SpaceView>

					<ContentProfile>
						<TextProfileInput>Address</TextProfileInput>
						<InputProfile placeholder={'Rua Vincenso, 97'}>
							{clinica.endereco.logradouro}
						</InputProfile>
					</ContentProfile>
					<ContentRow>
						<RowContentProfile>
							<TextProfileInput>Number</TextProfileInput>
							<InputRow placeholder={'97'}>
								{clinica.endereco.numero}
							</InputRow>
						</RowContentProfile>
						{/*  */}
						<RowContentProfile>
							<TextProfileInput>neighborhood</TextProfileInput>
							<InputRow placeholder={'Jerumenha-PI'}>
								{clinica.endereco.cidade}-SP
							</InputRow>
						</RowContentProfile>
					</ContentRow>
					<ButtonSecundary onPress={() => navigation.replace('Main')}>
						<ButtonSecundaryTitle>Back</ButtonSecundaryTitle>
					</ButtonSecundary>
				</>
			) : (
				<ActivityIndicator />
			)}
		</Container>
	);
};