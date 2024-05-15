import { useState } from 'react';
import { ContentProfile, TextProfileInput } from '../../screens/Profile/Style';
import {
	Button,
	ButtonCity,
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
import { Alert, Modal, Text, TouchableOpacity } from 'react-native';
import { FormChoice } from '../Button/FormChoice';
import { InputCitySelect } from '../Input/InputCitySelect';
import * as Yup from 'yup';

export const ScheduleModal = ({
	visible,
	setShowModalSchedule,
	navigation,
	...rest
}) => {
	const [activeButton, setActiveButton] = useState(null);
	const [agendamento, setAgendamento] = useState({
		prioridadeId: null,
		localizacao: '',
	});

	const [errors, setErrors] = useState({ prioridadeId: '', localizacao: '' });

	const validationSchema = Yup.object().shape({
		prioridadeId: Yup.string().required('Selecione um tipo de consulta!'),
		localizacao: Yup.string().required('Selecione a cidade'),
	});

	const handleContinue = async () => {
		try {
			await validationSchema.validate(agendamento, { abortEarly: false });
			setShowModalSchedule(false);
			navigation.replace('SelectClinic', { agendamento: agendamento });
		} catch (error) {
			if (error.name === 'ValidationError') {
				const validationErrors = {};
				error.inner.forEach((e) => {
					validationErrors[e.path] = e.message;
				});
				setErrors(validationErrors);
			}
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
	const handleCitySelect = (selectedCity) => {
		setAgendamento({
			...agendamento,
			localizacao: selectedCity,
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
					{errors.prioridadeId ? (
						<Text style={styles.errorText}>
							{errors.prioridadeId}
						</Text>
					) : null}
					{/*  */}

					<InputCitySelect
						setSelectedCity={handleCitySelect}
						labelText="Selecione uma cidade"
						defaultText="Selecione uma cidade"
					/>
					{errors.localizacao ? (
						<Text style={styles.errorTextCity}>
							{errors.localizacao}
						</Text>
					) : null}

					<ButtonCity onPress={() => handleContinue()}>
						<ButtonTitle>Continue</ButtonTitle>
					</ButtonCity>

					<ButtonSecundary onPress={() => handleCancel()}>
						<ButtonSecundaryTitle>Cancel</ButtonSecundaryTitle>
					</ButtonSecundary>
				</ContentSModal>
			</AgendModal>
		</Modal>
	);
};

const styles = {
	errorText: {
		color: 'red',
		marginTop: 5,
	},
	errorTextCity: {
		color: 'red',
		marginTop: 5,
	},
};
