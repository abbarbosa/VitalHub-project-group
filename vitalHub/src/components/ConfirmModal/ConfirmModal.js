import { Modal } from 'react-native';
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

export const ConfirmModal = ({
	navigation,
	visible,
	setShowModalConfirm,
	...rest
}) => {
	// Correção na definição do componente
	const closeModal = () => {
		setShowModalConfirm(false); // Correção do nome da função
	};

	return (
		<Modal visible={visible} transparent={true} animationType="fade">
			<PatientModal>
				<ContentConfirmModal>
					<Title>Schedule an appointment</Title>
					<ModalText>
						Consult the data selected for your query
					</ModalText>
					<SmallGroupModal>
						<SubTitleModal>Appointment Date</SubTitleModal>
						<SmallTextModal>30 de fevereiro de 2024</SmallTextModal>
					</SmallGroupModal>
					<SmallGroupModal>
						<SubTitleModal>Doctor</SubTitleModal>
						<SmallTextModal>Dr. Hans Chucrute</SmallTextModal>
						<SmallTextModal>PLastic Surgeon</SmallTextModal>
					</SmallGroupModal>
					<SmallGroupModal>
						<SubTitleModal>Appoitment location</SubTitleModal>
						<SmallTextModal>Soau pailo - SP</SmallTextModal>
					</SmallGroupModal>
					<SmallGroupModal>
						<SubTitleModal>Appointment type</SubTitleModal>
						<SmallTextModal>Rotina</SmallTextModal>
					</SmallGroupModal>
					<Button onPress={() => navigation.navigate('Home')}>
						<ButtonTitle>Continue</ButtonTitle>
					</Button>
					<ButtonSecundaryTitle onPress={closeModal}>
						Cancel
					</ButtonSecundaryTitle>
				</ContentConfirmModal>
			</PatientModal>
		</Modal>
	);
};
