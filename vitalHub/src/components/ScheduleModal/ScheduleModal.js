import { useState } from 'react';
import { ContentProfile, TextProfileInput } from '../../screens/Profile/Style';
import {
	Button,
	ButtonSecundary,
	ButtonSecundaryTitle,
	ButtonTitle,
} from '../Button/Style';
import {
	ButtonFilterModal,
	ButtonTitleFilterModal,
	ContentButton,
} from '../FilterButtons/Style';
import { Input } from '../Input/Style';
import { Title } from '../Title/Style';
import {
	AgendModal,
	ContentSModal,
	InputModal,
	TextProfileInputModal,
} from './Style';
import { Alert, Modal, TouchableOpacity } from 'react-native';
import { FormChoice } from '../Button/FormChoice';

export const ScheduleModal = ({
	visible,
	setShowModalSchedule,
	navigation,
	...rest
}) => {
	const nivelConsulta = [{ id: 0 }, { id: 1, id: 2 }];

	const [activeButton, setActiveButton] = useState(null);
	const [agendamento, setAgendamento] = useState({
		prioridadeId: null,
		localizacao: '',
	});

	const [prioridadeConsulta, setPrioridadeConsulta] = useState(
		'ADD341BE-8E85-40F1-BCA3-71C72A1585D3',
	);

	const handleContinue = () => {
		// Verifica se um botão foi selecionado e se a cidade foi digitada
		if (
			agendamento.prioridadeId &&
			agendamento.localizacao &&
			agendamento.localizacao.trim() !== ''
		) {
			// Se a validação for bem-sucedida, fecha o modal e navega para a próxima página
			setShowModalSchedule(false);
			navigation.replace('SelectClinic', { agendamento: agendamento });
		} else {
			// Caso contrário, exibe uma mensagem de erro ou toma outra ação apropriada
			Alert.alert('Please select a type of query or enter a city.');
		}
	};

	async function handleCancel() {
		setShowModalSchedule(false);
		navigation.replace('Main');
	}

	// Função para lidar com a pressão de um botão
	const handlePress = (buttonId, prioridadeId, prioridadeLabel) => {
		// Atualiza o estado do botão ativo
		setActiveButton(buttonId);
		// Atualiza o estado do agendamento com os novos valores
		setAgendamento({
			...agendamento,
			prioridadeId: prioridadeId,
			prioridadeLabel: prioridadeLabel,
		});
	};
	return (
		<Modal
			{...rest}
			visible={visible}
			transparent={true}
			animation={'fade'}
		>
			<AgendModal>
				<ContentSModal>
					<Title>Make an appointment</Title>

					<ContentProfile>
						<TextProfileInputModal>
							What level of consultation
						</TextProfileInputModal>
						<ContentButton>
							<FormChoice
								textButton={'Checkup'}
								actived={activeButton === 'Checkup'}
								onPress={() =>
									handlePress(
										'Checkup',
										'B39A70B7-4C20-498C-9629-EADC52E0F11A',
										'Checkup',
									)
								}
							/>

							<FormChoice
								textButton={'Exam'}
								actived={activeButton === 'Exam'}
								onPress={() =>
									handlePress(
										'Exam',
										'1C3C0584-8BD9-4AAD-BCF6-583D734CA65B',
										'Exam',
									)
								}
							/>

							<FormChoice
								textButton={'Urgency'}
								actived={activeButton === 'Urgency'}
								onPress={() =>
									handlePress(
										'Urgency',
										'5DD567DC-3F9B-4FD0-AD06-7C29C31D4789',
										'Urgency',
									)
								}
							/>
						</ContentButton>
					</ContentProfile>
					{/*  */}
					<ContentProfile>
						<TextProfileInputModal>
							Enter the desired city
						</TextProfileInputModal>
						<InputModal
							placeholder="Enter the city"
							onChangeText={(txt) =>
								setAgendamento({
									...agendamento,
									localizacao: txt,
								})
							}
							value={agendamento ? agendamento.localizacao : null}
						/>
					</ContentProfile>
					<Button onPress={() => handleContinue()}>
						<ButtonTitle>Continue</ButtonTitle>
					</Button>

					<ButtonSecundary onPress={() => handleCancel()}>
						<ButtonSecundaryTitle>Cancel</ButtonSecundaryTitle>
					</ButtonSecundary>
				</ContentSModal>
			</AgendModal>
		</Modal>
	);
};
