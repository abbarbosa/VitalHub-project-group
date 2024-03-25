import { useState } from 'react';
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

export const SelectDate = ({ navigation }) => {
	const [selectedDate, setSelectedDate] = useState();
	const [selectedTime, setSelectedTime] = useState();
	const [showModalConfirm, setShowModalConfirm] = useState(false);

	return (
		<Container>
			<TitleSelection>Select Date</TitleSelection>

			<FullCalendar
				selectedDate={selectedDate}
				handleSelectedDateFn={setSelectedDate}
			/>

			<SelectInput
				labelText="Select an available time slot"
				defaultText="Select a time"
				handleSelectedFn={setSelectedTime}
			/>

			<Button onPress={() => setShowModalConfirm(true)}>
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
			/>
		</Container>
	);
};
