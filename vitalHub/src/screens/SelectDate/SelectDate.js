import { useEffect, useState } from 'react';
import { Container } from '../../components/Container/Style';
import { TitleSelection } from '../SelectClinic/Style';
import { FullCalendar } from '../../components/FullCalendar/FullCalendar';
import { SelectInput } from '../../components/SelectInput/SelectInput';
import {
	Button,
	ButtonSecundaryTitle,
	ButtonTitle,
} from '../../components/Button/Style';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';

export const SelectDate = ({ navigation, route }) => {
	const [selectedDate, setSelectedDate] = useState();
	const [selectedTime, setSelectedTime] = useState();
	const [agendamento, setAgendamento] = useState(null);
	const [showModalConfirm, setShowModalConfirm] = useState(false);

	useEffect(() => {
		console.log(route.params);
	});

	function handleContinue() {
		setAgendamento({
			...route.params.agendamento,
			dataConsulta: `${selectedDate} ${selectedTime}`,
		});

		setShowModalConfirm(true);
	}

	return (
		<Container>
			<TitleSelection>Select Date</TitleSelection>

			<FullCalendar
				setSelectedDate={setSelectedDate}
				selectedDate={selectedDate}
				handleSelectedDateFn={setSelectedDate}
			/>

			<SelectInput
				labelText="Select an available time slot"
				defaultText="Select a time"
				setSelectedTime={setSelectedTime}
				handleSelectedFn={setSelectedTime}
			/>

			<Button onPress={() => handleContinue()}>
				<ButtonTitle onPress={() => setShowModalConfirm(true)}>
					Confirm
				</ButtonTitle>
			</Button>
			<ButtonSecundaryTitle onPress={() => navigation.navigate('Home')}>
				Cancel
			</ButtonSecundaryTitle>

			<ConfirmModal
				navigation={navigation}
				visible={showModalConfirm}
				setShowModalConfirm={setShowModalConfirm}
				agendamento={agendamento}
			/>
		</Container>
	);
};
