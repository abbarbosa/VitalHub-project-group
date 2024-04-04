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
		if (clinica == null) {
			console.log(clinica);
			BuscarClinica();
		}
	}, [clinica]);

	async function BuscarClinica() {
		(await api.get(`/Clinica/BuscarPorId?id=${route.params.clinica}`))
			.then((response) => {
				setClinica(response.data);

				console.log(response.data);
			})
			.cacth((error) => {
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
						<SmallTextModal>Jerumenha-PI</SmallTextModal>
					</SpaceView>

					<ContentProfile>
						<TextProfileInput>Address</TextProfileInput>
						<InputProfile
							placeholder={'Rua Vincenso, 97'}
							editable={false}
						/>
					</ContentProfile>
					<ContentRow>
						<RowContentProfile>
							<TextProfileInput>Number</TextProfileInput>
							<InputRow placeholder={'97'} />
						</RowContentProfile>
						{/*  */}
						<RowContentProfile>
							<TextProfileInput>neighborhood</TextProfileInput>
							<InputRow placeholder={'Jerumenha-PI'} />
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
