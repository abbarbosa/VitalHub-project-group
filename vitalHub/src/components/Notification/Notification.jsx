import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import successIlustrator from './Assets/success-illustration.svg';
import warningIlustrator from './Assets/warning-illustration.svg';
import dangerIllustrator from './Assets/error-illustration.svg';
import defaultIllustrator from './Assets/default-image.jpeg';

function Notification({
	titleNote = 'Título não informado',
	textNote = 'Mensagem não informada',
	imgIcon = 'default',
	imgAlt = 'Icone da ilustração',
	showMessage = false,
	setNotifyUser,
}) {
	useEffect(() => {
		if (showMessage) {
			const hide = () => {
				setNotifyUser({});
			};
			const timeout = setTimeout(hide, 5000);

			return () => clearTimeout(timeout);
		}
	}, [showMessage, setNotifyUser]);

	function imageRender(nameImage) {
		let imgIllustrator;

		switch (nameImage.toLowerCase()) {
			case 'success':
				imgIllustrator = successIlustrator;
				break;
			case 'warning':
				imgIllustrator = warningIlustrator;
				break;
			case 'danger':
				imgIllustrator = dangerIllustrator;
				break;
			default:
				imgIllustrator = defaultIllustrator;
				break;
		}

		return imgIllustrator;
	}

	if (!showMessage) {
		return null;
	}

	return (
		<View style={styles.notification}>
			<TouchableOpacity
				style={styles.notificationClose}
				onPress={() => setNotifyUser({})}
			>
				<Text>x</Text>
			</TouchableOpacity>
			<Image
				style={styles.notificationIcon}
				source={imageRender(imgIcon)}
				alt={imgAlt}
			/>
			<View style={styles.notificationMessageBox}>
				<Text style={styles.notificationTitle}>{titleNote}</Text>
				<Text style={styles.notificationText}>{textNote}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	notification: {
		position: 'absolute',
		top: 50,
		left: 0,
		right: 0,
		padding: 10,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ddd',
		zIndex: 1000,
	},
	notificationClose: {
		position: 'absolute',
		top: 5,
		right: 15,
	},
	notificationIcon: {
		width: 50,
		height: 50,
	},
	notificationMessageBox: {
		marginLeft: 60,
	},
	notificationTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	notificationText: {
		fontSize: 14,
	},
});

export default Notification;
