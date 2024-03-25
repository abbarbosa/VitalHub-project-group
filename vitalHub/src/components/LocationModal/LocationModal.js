import { Modal } from 'react-native';
import { BigGroupModal, ContentLocationModal } from './Style';
import { ImageModal } from '../AppointmentModal/Style';
import { PatientModal } from '../CancellationModal/Style';
import { Title } from '../Title/Style';
import {
	SmallGroupModal,
	SmallTextModal,
	SpaceView,
} from '../ConfirmModal/Style';
import { Button, ButtonSecundaryTitle, ButtonTitle } from '../Button/Style';

export const LocationModal = ({
	situacao,
	visible,
	setShowModalLocationAppointment,
	...rest
}) => {
	const closeModal = () => {
		setShowModalLocationAppointment(false); // Correção do método para fechar o modal
	};

	return (
		<Modal visible={visible} transparent={true} animationType="fade">
			<PatientModal>
				<ContentLocationModal>
					<ImageModal
						source={{
							uri: 'https://pm1.aminoapps.com/7094/45370330cc1b879888e5ebc043f7aa4364527c92r1-609-634v2_00.jpg',
						}}
					/>
					<Title>Dr. Hans Chucrute</Title>
					<BigGroupModal>
						<SmallTextModal>Plastic Surgeon</SmallTextModal>
						<SmallTextModal>CRM-15287</SmallTextModal>
					</BigGroupModal>
					<Button>
						<ButtonTitle>
							{situacao !== 'pendente'
								? 'View appointment location'
								: 'Insert medical record'}
						</ButtonTitle>
					</Button>

					<ButtonSecundaryTitle onPress={closeModal}>
						Cancelar
					</ButtonSecundaryTitle>
				</ContentLocationModal>
			</PatientModal>
		</Modal>
	);
};
