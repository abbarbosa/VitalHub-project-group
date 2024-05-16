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
import { api } from '../../services/Service';

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


	async function handleConfirmSchedule() {
		try {
			const response = await api.put(
				`/Consultas/Status?idConsulta=${
					consulta.id
				}&status=${'E2B80175-539F-42C3-9D72-D5B281ED81DC'}`,
			);

			console.log('Consulta realizada com sucesso \n\n');
			console.log(response.data);

			navigation.replace('Main');
		} catch (error) {
			// Lidar com o erro
			console.error('Erro ao realizar consulta:', error);
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
								<ButtonTitle>Inserir prontuário</ButtonTitle>
							</ButtonModal>
						) : (
							<ButtonModal
								onPress={() => handleClose('MedicalRecords')}
							>
								<ButtonTitle>Inserir prontuário</ButtonTitle>
							</ButtonModal> // Se não for 'Paciente', renderiza um fragmento vazio
						)
					) : roleUsuario === 'Medico' ? (
						<ButtonModal onPress={() => handleConfirmSchedule()}>
							<ButtonTitle>Confirmar agendameto</ButtonTitle>
						</ButtonModal>
					) : (
						<ButtonModal
							onPress={() => handleClose('LocationAppointment')}
						>
							<ButtonTitle>Ver local da consulta</ButtonTitle>
						</ButtonModal>
					)}

					<ButtonSecundary onPress={closeModal}>
						<ButtonSecundaryTitle>Cancelar</ButtonSecundaryTitle>
					</ButtonSecundary>
				</ModalContent>
			</PatientModal>
		</Modal>
	);
};