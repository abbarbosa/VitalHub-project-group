import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export const DateSelector = ({ date, setDate, editable }) => {
	const [open, setOpen] = useState(false);

	const handleConfirm = (selectedDate) => {
		setOpen(false);
		setDate(moment(selectedDate).format('YYYY-MM-DD'));
	};

	return (
		<View>
			<TouchableOpacity
				onPress={() => editable && setOpen(true)}
				style={{ borderBottomWidth: 1, padding: 10 }}
			>
				<Text>{moment(date).format('DD/MM/YYYY')}</Text>
			</TouchableOpacity>
			<DatePicker
				modal
				open={open}
				date={new Date(date)}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={() => setOpen(false)}
			/>
		</View>
	);
};
