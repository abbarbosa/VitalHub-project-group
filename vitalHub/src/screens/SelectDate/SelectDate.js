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
import { Alert } from 'react-native';

export const SelectDate = ({ navigation, route }) => {
	const [selectedDate, setSelectedDate] = useState();
	const [selectedTime, setSelectedTime] = useState();
	const [agendamento, setAgendamento] = useState(null);
	const [showModalConfirm, setShowModalConfirm] = useState(false);

	useEffect(() => {
		console.log(route.params);
	});

	function handleContinue() {
		if (selectedDate && selectedTime) {
			setAgendamento({
				...route.params.agendamento,
				dataConsulta: `${selectedDate} ${selectedTime}`,
			});

			setShowModalConfirm(true);
		} else {
			Alert.alert('Por favor selecione uma data e hora');
		}
	}

	return (
		<Container>
			<TitleSelection>Selecionar Data</TitleSelection>

			<FullCalendar
				setSelectedDate={setSelectedDate}
				selectedDate={selectedDate}
				handleSelectedDateFn={setSelectedDate}
			/>

			<SelectInput
				labelText="Selecione um horário disponível"
				defaultText="Selecinar horário"
				setSelectedTime={setSelectedTime}
				handleSelectedFn={setSelectedTime}
			/>

			<Button onPress={() => handleContinue()}>
				<ButtonTitle onPress={() => setShowModalConfirm(true)}>
					Confirmar
				</ButtonTitle>
			</Button>
			<ButtonSecundaryTitle onPress={() => navigation.navigate('Main')}>
				Cancelar
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
