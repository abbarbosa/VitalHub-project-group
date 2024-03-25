import { Button, View } from 'react-native';

export const Navigation = ({ navigation }) => {
	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Button
				title="Login"
				onPress={() => navigation.navigate('Login')}
			/>
			<Button
				title="RecoverPassword"
				onPress={() => navigation.navigate('RecoverPassword')}
			/>
			<Button
				title="CheckEmail"
				onPress={() => navigation.navigate('CheckEmail')}
			/>
			<Button
				title="ResetPassword"
				onPress={() => navigation.navigate('ResetPassword')}
			/>
			<Button
				title="CreateAccount"
				onPress={() => navigation.navigate('CreateAccount')}
			/>
			<Button
				title="Profile"
				onPress={() => navigation.navigate('Profile')}
			/>
			<Button title="Home" onPress={() => navigation.navigate('Home')} />
			<Button
				title="MedicalRecords"
				onPress={() => navigation.navigate('MedicalRecords')}
			/>
			<Button
				title="SelectClinic"
				onPress={() => navigation.navigate('SelectClinic')}
			/>
			<Button
				title="SelectDoctor"
				onPress={() => navigation.navigate('SelectDoctor')}
			/>
			<Button
				title="SelectDate"
				onPress={() => navigation.navigate('SelectDate')}
			/>
			<Button
				title="LocationAppointment"
				onPress={() => navigation.navigate('LocationAppointment')}
			/>
			<Button
				title="VisualizePrescription"
				onPress={() => navigation.navigate('VisualizePrescription')}
			/>
			<Button
				title="CameraPhoto"
				onPress={() => navigation.navigate('CameraPhoto')}
			/>
		</View>
	);
};
