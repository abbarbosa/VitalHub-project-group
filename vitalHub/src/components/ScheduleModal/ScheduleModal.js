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
import { Modal, TouchableOpacity } from 'react-native';
import { FormChoice } from '../Button/FormChoice';

export const ScheduleModal = ({
	visible,
	setShowModalSchedule,
	navigation,
	...rest
}) => {
	const nivelConsulta = [
		{ id: 'B39A70B7-4C20-498C-9629-EADC52E0F11A', prioridade: 'Rotina' },
		{ id: '1C3C0584-8BD9-4AAD-BCF6-583D734CA65B', prioridade: 'Exame' },
		{ id: '5DD567DC-3F9B-4FD0-AD06-7C29C31D4789', prioridade: 'Urgencia' },
	];

	const [checkupActive, setCheckupActive] = useState(false);
	const [examActive, setExamActive] = useState(false);
	const [urgencyActive, setUrgencyActive] = useState(false);

	const [agendamento, setAgendamento] = useState(null);

	const [prioridadeConsulta, setPrioridadeConsulta] = useState(
		'ADD341BE-8E85-40F1-BCA3-71C72A1585D3',
	);

	async function handleContinue() {
		setShowModalSchedule(false);

		navigation.replace('SelectClinic', { agendamento: agendamento });
	}
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
								actived={nivelConsulta.prioridade === 'Rotina'}
								onPress={() => {
									setAgendamento({
										...agendamento,
										prioridadeId:
											'B39A70B7-4C20-498C-9629-EADC52E0F11A',
										prioridadeLabel: 'Checkup',
									});
								}}
							/>
							{/*  */}
							<FormChoice
								textButton={'Exam'}
								actived={nivelConsulta.prioridade === 'Exame'}
								onPress={() =>
									setAgendamento({
										...agendamento,
										prioridadeId:
											'1C3C0584-8BD9-4AAD-BCF6-583D734CA65B',
										prioridadeLabel: 'Exam',
									})
								}
							/>
							{/* <ButtonFilterModal>
								<ButtonTitleFilterModal
									onPress={() =>
										setAgendamento({
											...agendamento,
											prioridadeId:
												'1C3C0584-8BD9-4AAD-BCF6-583D734CA65B',
											prioridadeLabel: 'Exam',
										})
									}
								>
									Exam
								</ButtonTitleFilterModal>
							</ButtonFilterModal> */}
							{/*  */}
							<FormChoice
								textButton={'Urgency'}
								actived={
									nivelConsulta.prioridade === 'Urgencia'
								}
								onPress={() =>
									setAgendamento({
										...agendamento,
										prioridadeId:
											'5DD567DC-3F9B-4FD0-AD06-7C29C31D4789',
										prioridadeLabel: 'Urgency',
									})
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

					<ButtonSecundary
						onPress={() => setShowModalSchedule(false)}
					>
						<ButtonSecundaryTitle>Cancel</ButtonSecundaryTitle>
					</ButtonSecundary>
				</ContentSModal>
			</AgendModal>
		</Modal>
	);
};
