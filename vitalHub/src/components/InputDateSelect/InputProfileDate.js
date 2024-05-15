import React, { useState } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import { DateSelector } from './InputDateSelect';

const InputProfileDate = ({ dados, edicaoHabilitada }) => {
	const [dateBirth, setDateBirth] = useState(
		moment(dados.dataNascimento).format('YYYY-MM-DD'),
	);

	return (
		<View>
			<DateSelector
				date={dateBirth}
				setDate={setDateBirth}
				editable={edicaoHabilitada}
			/>
		</View>
	);
};

export default InputProfileDate;
