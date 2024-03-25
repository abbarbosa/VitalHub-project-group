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
import { Modal } from 'react-native';

export const ScheduleModal = ({
	visible,
	setShowModalSchedule,
	navigation,
	...rest
}) => {
	// Função para fechar o modal
	const closeModal = () => {
		setShowModalSchedule(false);
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
							<ButtonFilterModal>
								<ButtonTitleFilterModal>
									Checkup
								</ButtonTitleFilterModal>
							</ButtonFilterModal>
							{/*  */}
							<ButtonFilterModal>
								<ButtonTitleFilterModal>
									Exam
								</ButtonTitleFilterModal>
							</ButtonFilterModal>
							{/*  */}
							<ButtonFilterModal>
								<ButtonTitleFilterModal>
									Urgency
								</ButtonTitleFilterModal>
							</ButtonFilterModal>
						</ContentButton>
					</ContentProfile>
					{/*  */}
					<ContentProfile>
						<TextProfileInputModal>
							Enter the desired city
						</TextProfileInputModal>
						<InputModal placeholder="Enter the city" />
					</ContentProfile>
					<Button onPress={() => navigation.navigate('SelectClinic')}>
						<ButtonTitle>Continue</ButtonTitle>
					</Button>

					<ButtonSecundary onPress={closeModal}>
						<ButtonSecundaryTitle>Cancel</ButtonSecundaryTitle>
					</ButtonSecundary>
				</ContentSModal>
			</AgendModal>
		</Modal>
	);
};
