import { useEffect, useState } from 'react';
import { SelectInputView } from '../SelectInput/Style';
import {
	ContentProfile,
	ContentProfileCity,
	TextProfileInput,
} from '../../screens/Profile/Style';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const InputCitySelect = ({
	defaultText = 'Selecione uma cidade',
	labelText = 'Selecione uma cidade',
	setSelectedCity,
}) => {
	const brazilianCapitals = [
		'Aracaju',
		'Belém',
		'Belo Horizonte',
		'Boa Vista',
		'Brasília',
		'Campo Grande',
		'Cuiabá',
		'Curitiba',
		'Florianópolis',
		'Fortaleza',
		'Goiânia',
		'João Pessoa',
		'Maceió',
		'Manaus',
		'Natal',
		'Palmas',
		'Porto Alegre',
		'Porto Velho',
		'Recife',
		'Rio Branco',
		'Rio de Janeiro',
		'Salvador',
		'São Luís',
		'São Paulo',
		'Teresina',
		'Vitória',
	];

	const [arrayOptions, setArrayOptions] = useState([]);

	useEffect(() => {
		// Inicializa o array com as capitais do Brasil
		setArrayOptions(brazilianCapitals);
	}, []);

	return (
		<SelectInputView>
			<ContentProfileCity>
				<TextProfileInput>{labelText}</TextProfileInput>
				<SelectDropdown
					data={arrayOptions}
					defaultButtonText={defaultText}
					onSelect={(selectedItem, index) => {
						setSelectedCity(selectedItem);
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
			</ContentProfileCity>
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
