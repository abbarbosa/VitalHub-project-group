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
import moment from 'moment';

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

		console.log(consulta);

		if (consulta) {
			if (screen === 'LocationAppointment') {
				navigation.replace(screen, {
					clinicaid: consulta.medicoClinica.clinicaId,
				});
			} else if (screen === 'VisualizePrescription') {
				navigation.replace(screen, {
					consultaid: consulta?.id,
				});
			} else if (screen === 'MedicalRecords') {
				navigation.replace(screen, {
					consultaid: consulta?.id,
				});
			}
		} else {
			navigation.replace(screen);
		}
	}


	const calcularIdade = (dataNascimento) => {
		const hoje = moment();
		const nascimento = moment(dataNascimento);
		return hoje.diff(nascimento, 'years');
	};

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
							uri: `${
								roleUsuario === 'Paciente'
									? consulta?.medicoClinica?.medico
											?.idNavigation?.foto
									: consulta?.paciente?.idNavigation?.foto
							}`,
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
								? `${consulta?.medicoClinica?.medico?.crm}`
								: `${calcularIdade(
										consulta?.paciente?.dataNascimento,
								  )} anos`}
						</TextAge>
						<TextBold>
							{roleUsuario === 'Paciente'
								? `${consulta?.medicoClinica?.medico?.especialidade?.especialidade1}`
								: `${consulta?.paciente?.idNavigation?.email}`}
						</TextBold>
					</ProfileData>

					{situacao !== 'Pendentes' ? (
						roleUsuario === 'Paciente' ? (
							<ButtonModal
								onPress={() =>
									handleClose('VisualizePrescription')
								}
							>
								<ButtonTitle>View medical record</ButtonTitle>
							</ButtonModal>
						) : (
							<ButtonModal
								onPress={() => handleClose('MedicalRecords')}
							>
								<ButtonTitle>Insert medical record</ButtonTitle>
							</ButtonModal> // Se não for 'Paciente', renderiza um fragmento vazio
						)
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