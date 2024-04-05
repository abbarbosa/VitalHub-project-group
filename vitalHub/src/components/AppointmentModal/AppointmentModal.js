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
	setShowModalAppointment,
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

					{/* Renderização condicional baseada no tipo de usuário */}
					<Title>
						{roleUsuario === 'Paciente'
							? consulta?.medicoClinica?.medico?.idNavigation
									?.nome
							: consulta?.paciente?.idNavigation?.nome}
					</Title>

					<ProfileData>
						<TextAge>
							{roleUsuario === 'Paciente'
								? `CRM: ${consulta?.medicoClinica?.medico?.crm}`
								: `CPF: ${consulta?.paciente?.cpf}`}
						</TextAge>
						<TextBold>
							{roleUsuario === 'Paciente'
								? `Especialidade: ${consulta?.medicoClinica?.medico?.especialidade?.especialidade1}`
								: 'Data de Nascimento: '}
						</TextBold>
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
