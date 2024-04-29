import { SmallTextModal } from '../../components/ConfirmModal/Style';
import { Container, ScrollContainer } from '../../components/Container/Style';
import { InputMedicalRecords, InputRecord } from '../../components/Input/Style';
import { BigGroupModal } from '../../components/LocationModal/Style';
import { Title } from '../../components/Title/Style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import {
	ContentName,
	ContentProfile,
	ProfilePicture,
	TextProfileInput,
} from '../Profile/Style';
import {
	ButtonTextVisualize,
	ContentSend,
	FileVisualize,
	FileVisualizeImage,
	TextSend,
	ViewPhotoSend,
} from './Style';
import { ButtonSecundaryTitle } from '../../components/Button/Style';
import { ButtonText } from '../../components/AppointmentCard/Style';
import { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { api } from '../../services/Service';

export const VisualizePrescription = ({ navigation, route }) => {
	const [photoUri, setPhotoUri] = useState(null);
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

	useEffect(() => {
		if (route.params && route.params.photoUri) {
			setPhotoUri(route.params.photoUri);
		}
	}, [route.params]);

	return (
		<ScrollContainer>
			<Container>
<<<<<<< HEAD
				<ProfilePicture
					source={{
						uri: 'https://i.ibb.co/pzb7dV8/4ac0d625-25c8-40b1-a39c-6389a4066e25.jpg',
					}}
				/>
				<ContentName>
					<Title>Dr. Hans Chucrute</Title>
					<BigGroupModal>
						<SmallTextModal>Plastic Surgeon</SmallTextModal>
						<SmallTextModal>CRM-15287</SmallTextModal>
					</BigGroupModal>
				</ContentName>
				<ContentProfile>
					<TextProfileInput>Query description:</TextProfileInput>
					<InputRecord placeholder={'Description here'} />
				</ContentProfile>
				<ContentProfile>
					<TextProfileInput>Patient diagnosis:</TextProfileInput>
					<InputMedicalRecords placeholder={'Diagnosis here'} />
				</ContentProfile>
				<ContentProfile>
					<TextProfileInput>Medical prescription:</TextProfileInput>
					<InputRecord placeholder={'Prescription here'} />
				</ContentProfile>
				<ContentProfile>
					{photoUri == null ? (
						<>
							<FileVisualize>
								<MaterialCommunityIcons
									name="image-filter-center-focus-strong"
									size={24}
									color="black"
								/>

								<Title>No photo informed</Title>
							</FileVisualize>
						</>
					) : (
						<>
							<FileVisualizeImage source={{ uri: photoUri }} />
						</>
					)}
				</ContentProfile>
				<ContentSend>
					<ViewPhotoSend
						onPress={() => navigation.navigate('CameraPhoto', )}
					>
						<MaterialIcons
							name="add-a-photo"
							size={24}
							color="white"
=======
				{consulta !== null ? (
					<>
						<ProfilePicture
							source={{
								uri: 'https://i.ibb.co/pzb7dV8/4ac0d625-25c8-40b1-a39c-6389a4066e25.jpg',
							}}
>>>>>>> b7fd4de8fa4fe851da5300da6cc7366ef92155d9
						/>
						<ContentName>
							<Title>
								{
									consulta?.medicoClinica?.medico
										?.idNavigation?.nome
								}
							</Title>
							<BigGroupModal>
								<SmallTextModal>
									{
										consulta?.medicoClinica?.medico
											?.especialidade?.especialidade1
									}
								</SmallTextModal>
								<SmallTextModal>
									CRM: {consulta?.medicoClinica?.medico?.crm}
								</SmallTextModal>
							</BigGroupModal>
						</ContentName>
						<ContentProfile>
							<TextProfileInput>
								Query description:
							</TextProfileInput>
							<InputRecord
								placeholder={'Description here'}
								multiline={true}
								editable={false}
							>
								{consulta.descricao}
							</InputRecord>
						</ContentProfile>
						<ContentProfile>
							<TextProfileInput>
								Patient diagnosis:
							</TextProfileInput>
							<InputMedicalRecords
								placeholder={'Diagnosis here'}
								editable={false}
							>
								{consulta.diagnostico}
							</InputMedicalRecords>
						</ContentProfile>
						<ContentProfile>
							<TextProfileInput>
								Medical prescription:
							</TextProfileInput>
							<InputRecord
								placeholder={'Prescription here'}
								editable={false}
							>
								{consulta.receita?.medicamento}
							</InputRecord>
						</ContentProfile>
						<ContentProfile>
							{photoUri == null ? (
								<>
									<FileVisualize>
										<MaterialCommunityIcons
											name="image-filter-center-focus-strong"
											size={24}
											color="black"
										/>
										<Title>No photo informed</Title>
									</FileVisualize>
								</>
							) : (
								<>
									<FileVisualizeImage
										source={{ uri: photoUri }}
									/>
								</>
							)}
						</ContentProfile>
						<ContentSend>
							<ViewPhotoSend
								onPress={() =>
									navigation.navigate('CameraPhoto', {})
								}
							>
								<MaterialIcons
									name="add-a-photo"
									size={24}
									color="white"
								/>
								<TextSend>Send</TextSend>
							</ViewPhotoSend>
							<TouchableOpacity>
								<ButtonTextVisualize>
									Cancel
								</ButtonTextVisualize>
							</TouchableOpacity>
						</ContentSend>
						<ContentProfile>
							<InputRecord
								placeholder={'Blood test result: all normal'}
								editable={false}
							/>
						</ContentProfile>
						<ButtonSecundaryTitle
							onPress={() => navigation.navigate('Home')}
						>
							Back
						</ButtonSecundaryTitle>
					</>
				) : (
					<ActivityIndicator />
				)}
			</Container>
		</ScrollContainer>
	);
};
