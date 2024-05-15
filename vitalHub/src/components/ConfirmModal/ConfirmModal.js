import { ActivityIndicator, Modal } from 'react-native';
import { AgendModal } from '../ScheduleModal/Style';
import { Title } from '../Title/Style';
import { Button, ButtonSecundaryTitle, ButtonTitle } from '../Button/Style';
import {
	ContentConfirmModal,
	SmallGroupModal,
	SmallTextModal,
	SpaceView,
	SubTitleModal,
} from './Style';
import { ModalText, PatientModal } from '../CancellationModal/Style';
import { ContentProfile } from '../../screens/Profile/Style';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { api } from '../../services/Service';
import { UserDecodeToken } from '../../services/Utils/Auth';

export const ConfirmModal = ({
	navigation,
	visible,
	setShowModalConfirm,
	agendamento,
	...rest
}) => {
	const [profile, setProfile] = useState();

	async function profileLoad() {
		const token = await UserDecodeToken();

		if (token) {
			setProfile(token);
		}
	}

	async function ConfirmarConsulta() {
		await api
			.post(`/Consultas/Cadastrar`, {
				...agendamento,
				pacienteId: profile.user,
				situacaoId: 'C791219B-0327-48BA-8B4E-1C2C1F1A8571',
			})
			.then(async (response) => {
				await setShowModalConfirm(false);

				navigation.replace('Main');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// Correção na definição do componente
	const closeModal = () => {
		setShowModalConfirm(false); // Correção do nome da função
		navigation.replace('SelectDate');
	};

	useEffect(() => {
		profileLoad();
	}, [visible]);

	return (
		<Modal visible={visible} transparent={true} animationType="fade">
			{agendamento != null ? (
				<PatientModal>
					<ContentConfirmModal>
						<Title>Schedule an appointment</Title>
						<ModalText>
							Consult the data selected for your query
						</ModalText>
						<SmallGroupModal>
							<SubTitleModal>Appointment Date</SubTitleModal>
							<SmallTextModal>
								{moment(agendamento.dataConsulta).format(
									'DD/MM/YYYY HH:mm',
								)}
							</SmallTextModal>
						</SmallGroupModal>
						<SmallGroupModal>
							<SubTitleModal>Doctor</SubTitleModal>
							<SmallTextModal>
								{agendamento.medicoLabel}
							</SmallTextModal>
							<SmallTextModal>
								{agendamento.clinicaLabel}
							</SmallTextModal>
						</SmallGroupModal>
						<SmallGroupModal>
							<SubTitleModal>Appoitment location</SubTitleModal>
							<SmallTextModal>
								{agendamento.localizacao}
							</SmallTextModal>
						</SmallGroupModal>
						<SmallGroupModal>
							<SubTitleModal>Appointment type</SubTitleModal>
							<SmallTextModal>
								{agendamento.prioridadeLabel}
							</SmallTextModal>
						</SmallGroupModal>
						<Button onPress={() => ConfirmarConsulta()}>
							<ButtonTitle>Continue</ButtonTitle>
						</Button>
						<ButtonSecundaryTitle onPress={closeModal}>
							Cancel
						</ButtonSecundaryTitle>
					</ContentConfirmModal>
				</PatientModal>
			) : (
				<ActivityIndicator />
			)}
		</Modal>
	);
};
