import { Modal } from 'react-native';
import { ImageModal, RecordsModal } from './Style';
import { ModalContent, PatientModal } from '../CancellationModal/Style';
import { Title } from '../Title/Style';
import {
	ButtonModal,
	ButtonSecundary,
	ButtonSecundaryTitle,
	ButtonTitle,
} from '../Button/Style';
import { ProfileData, TextAge, TextBold } from '../AppointmentCard/Style';
import { useEffect } from 'react';

export const AppointmentModal = ({
	visible,
	situacao,
	navigation,
	setShowModalAppointment, // Função para controlar a exibição do modal
	roleUsuario,
	consulta,
	...rest
}) => {
	// Função para fechar o modal
	const closeModal = () => {
		setShowModalAppointment(false);
	};

	async function handleClose(screen) {
		await setShowModalAppointment(false);

		console.log(' consulta ');
		console.log(consulta);

		if (screen == 'LocationAppointment') {
			navigation.replace(screen, {
				clinicaid: consulta.medicoClinica.clinicaId,
			});
		} else {
			navigation.replace(screen);
		}
	}

	useEffect(() => {
		console.log(consulta);
	}, [visible]);

	return (
		<Modal
			{...rest}
			visible={visible}
			transparent={true}
			animationType="fade"
		>
			<PatientModal>
				<ModalContent>
					<ImageModal
						source={{
							uri: 'https://img.elo7.com.br/product/600x380/3473C40/dobby-harry-potter-hogwarts.jpg',
						}}
					/>
					<Title>Joao</Title>
					<ProfileData>
						<TextAge>45 years</TextAge>
						<TextBold>joao@gmail.com</TextBold>
					</ProfileData>

					{situacao !== 'Pendentes' ? (
						<ButtonModal
							onPress={() => handleClose('VisualizePrescription')}
						>
							<ButtonTitle>View medical record</ButtonTitle>
						</ButtonModal>
					) : (
						<ButtonModal
							onPress={() => handleClose('LocationAppointment')}
						>
							<ButtonTitle>View appointment location</ButtonTitle>
						</ButtonModal>
					)}
					<ButtonSecundary onPress={closeModal}>
						<ButtonSecundaryTitle>Cancel</ButtonSecundaryTitle>
					</ButtonSecundary>
				</ModalContent>
			</PatientModal>
		</Modal>
	);
};