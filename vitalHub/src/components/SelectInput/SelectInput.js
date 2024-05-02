import SelectDropdown from 'react-native-select-dropdown';
import { ContentProfile, TextProfileInput } from '../../screens/Profile/Style';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { SelectInputView } from './Style';
import moment from 'moment';
import { useEffect, useState } from 'react';

export const SelectInput = ({
	defaultText = '',
	handleSelectedFn = null,
	labelText = '',
	setSelectedTime,
}) => {
	const dataAtual = moment().format('YYYY-MM-DD');
	const [arrayOptions, setArrayOptions] = useState(null);

	function LoadOptions() {
		//conferir quantas horas ate as meia noite do dia de hoje
		const horasRestantes = moment(dataAtual)
			.add(24, 'hours')
			.diff(moment(), 'hours');
		console.log(horasRestantes);
		//criar um laco que rode a quantiade de horas que falta
		const options = Array.from({ length: horasRestantes }, (_, index) => {
			let valor = new Date().getHours() + (index + 1);

			return `${valor}:00`;
		});
		console.log(options);
		//deveolver a cada hora uma opcao no select
		setArrayOptions(options);
	}

	useEffect(() => {
		LoadOptions();
	}, []);

	return (
		<SelectInputView>
			<ContentProfile>
				<TextProfileInput>Select an available time</TextProfileInput>
				<SelectDropdown
					data={arrayOptions}
					defaultButtonText={defaultText}
					onSelect={(index) => {
						setSelectedTime(index);
					}}
					buttonStyle={styles.button}
					buttonTextStyle={styles.buttonText}
					renderDropdownIcon={() => (
						<AntDesign name="caretdown" size={24} color="#34898F" />
					)}
					dropdownIconPosition="right"
					rowTextStyle={styles.rowText}
					dropdownOverlayColor="transparent"
					dropdownStyle={styles.dropdown}
				/>
			</ContentProfile>
		</SelectInputView>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'transparent',
		borderRadius: 8,
		borderColor: '#60BFC5',
		borderWidth: 2,
		width: '100%',
		height: 54,
		paddingLeft: 16,
		paddingRight: 16,
	},
	buttonText: {
		color: '#34898F',
		fontSize: 14,
		fontFamily: 'MontserratAlternates_600SemiBold',
		textAlign: 'left',
	},
	dropdown: {
		backgroundColor: '#FBFBFB',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderWidth: 2,
		borderColor: '#60BFC5',
		marginTop: -30,
		borderTopWidth: 2,
		borderBottomWidth: 0,
	},
	rowText: {
		fontFamily: 'MontserratAlternates_600SemiBold',
		fontSize: 16,
		color: '#34898F',
	},
});
