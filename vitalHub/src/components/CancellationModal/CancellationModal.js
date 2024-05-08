import React, { useEffect } from 'react';
import { Modal, Alert } from 'react-native';
import { Title } from '../Title/Style';
import {
	ButtonModal,
	ButtonSecundary,
	ButtonSecundaryTitle,
	ButtonTitle,
} from '../Button/Style';
import { ModalContent, ModalText, PatientModal } from './Style';

// Importando a biblioteca de notificação
import * as Notifications from 'expo-notifications';
import { api } from '../../services/Service';

//solicitar as permissoes de notificacao ao iniciar o app
Notifications.requestPermissionsAsync();

//definir como as notificacoes devem ser tratados quando recebidos
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		//mostra o alerta quando a notificao for recebida
		shouldShowAlert: true,

		//reproduz ou nao som ao receber a notificao
		shouldPlaySound: true,

		//configura o numero de notificacoes no icone do app
		shouldSetBadge: true,
	}),
});

const CancellationModal = ({
	visible,
	setShowModalCancel,
	navigation,
	consulta,
	...rest
}) => {
	// Função para lidar com o fechamento do modal e navegação
	const handleClose = (screen) => {
		setShowModalCancel(false);
		navigation.replace(screen);
	};

	const handleCancel = async () => {
		console.log(
			api.put(
				`/Consultas/Status?idConsulta=${consulta.id}&status=1A4C4AAB-3097-45B1-9AD2-EEAE7CFD6BD2`,
			),
		);
		try {
			const response = await api.put(
				`/Consultas/Status?idConsulta=${
					consulta.id
				}&status=${'1A4C4AAB-3097-45B1-9AD2-EEAE7CFD6BD2'}`,
			);

			console.log('Consulta cancelada com sucesso \n\n');
			console.log(response.data);
		} catch (error) {
			// Lidar com o erro
			console.error('Erro ao cancelar consulta:', error);
		}
	};

	// Função para lidar com a chamada da notificação
	const handleCallNotifications = async () => {
		try {
			// Solicitar as permissões de notificação ao iniciar o app
			const { status } = await Notifications.requestPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert(
					'Permissão negada',
					'Você não permitiu notificações.',
				);
				return;
			}

			// Agendar uma notificação para ser exibida após 5 segundos
			await Notifications.scheduleNotificationAsync({
				content: {
					title: 'Status',
					body: 'Sua consulta foi cancelada.',
				},
				trigger: {
					seconds: 2,
				},
			});
		} catch (error) {
			console.error('Erro ao agendar notificação:', error);
		}
	};

	useEffect(() => {
		// Solicitar as permissões de notificação ao montar o componente
		Notifications.requestPermissionsAsync();
		console.log(consulta);
	}, []);

	return (
		<Modal
			{...rest}
			visible={visible}
			transparent={true}
			animationType="fade"
		>
			<PatientModal>
				<ModalContent>
					<Title>Cancelar consulta</Title>
					<ModalText>
						Ao cancelar essa consulta, abrirá uma possível
						disponibilidade no seu horário. Deseja mesmo cancelar
						essa consulta?
					</ModalText>
					<ButtonModal
						onPress={() => {
							handleCancel();
							handleClose('Main');
							handleCallNotifications(); // Chamando a função de notificação ao confirmar o cancelamento
						}}
					>
						<ButtonTitle>Confirmar</ButtonTitle>
					</ButtonModal>

					<ButtonSecundary onPress={() => setShowModalCancel(false)}>
						<ButtonSecundaryTitle>Cancelar</ButtonSecundaryTitle>
					</ButtonSecundary>
				</ModalContent>
			</PatientModal>
		</Modal>
	);
};

export default CancellationModal;
