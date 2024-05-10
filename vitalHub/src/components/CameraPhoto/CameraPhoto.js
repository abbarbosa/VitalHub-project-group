// Importações necessárias
import { useState, useEffect, useRef } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Modal,
	Image,
	Alert,
} from 'react-native';
import { FontAwesome, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { ButtonGallery, ImageGallery } from './Style';

// Componente CameraPhoto
export const CameraPhoto = ({ navigation, route }) => {
	// Referência para a câmera
	const cameraRef = useRef(null);

	// Estado para armazenar a foto tirada
	const [photo, setPhoto] = useState(null);

	// Estado para controlar a abertura do modal
	const [openModal, setOpenModal] = useState(false);

	// Estado para definir o tipo da câmera (traseira ou frontal)
	const [tipoCamera, setTipoCamera] = useState('back');

	//satete pra permissao da camera
	const [permission, requestPermission] = useCameraPermissions();



	// Estado para controlar o modo de flash (ligado ou desligado)
	const [flashMode, setFlashMode] = useState('off');

	// Estado para controlar o foco automático (ligado ou desligado)
	const [autoFocus, setAutoFocus] = useState('off');

	const [lastedPhoto, setLastedPhoto] = useState(null)


	// Função para capturar a foto
	async function CapturePhoto() {
		// Ativar o foco automático antes de tirar a foto
		setAutoFocus('on');

		// Esperar um curto período de tempo para permitir que o foco automático seja aplicado
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Tirar a foto após o foco automático ser aplicado
		if (cameraRef) {
			const photo = await cameraRef.current.takePictureAsync({
				quality: 1,
			});
			await setPhoto(photo.uri);
			setOpenModal(true);
		}
	}

	async function SendPhoto() {
		if (route.params && route.params.isProfile) {
			navigation.navigate(
				route.params.isProfile === true
					? 'Profile'
					: 'VisualizePrescription',
				{ photoUri: photo },
			);
		} else {
			// Se isProfile não estiver definido ou for falso, navegue de volta para VisualizePrescription
			navigation.navigate('VisualizePrescription', { photoUri: photo });
		}
	}

	// Função para limpar a foto
	function ClearPhoto() {
		setPhoto(null);
		setOpenModal(false);
	}

	// Função para alternar o modo de flash
	function ToggleFlashMode() {
		setFlashMode(
			flashMode === 'on'
				? 'off'
				: 'on',
		);
	}

	// Função para salvar a foto na galeria
	async function SavePhoto() {
		if (photo) {
			await MediaLibrary.createAssetAsync(photo)
				.then(() => {
					Alert.alert('Sucesso', 'Foto salva na galeria');
				})
				.catch((error) => {
					alert('Erro ao salvar foto');
				});
		}
	}

	async function GetLastPhoto() {
		const { assets } = await MediaLibrary.getAssetsAsync({
			sortBy: [[MediaLibrary.SortBy.creationTime, false]],
			first: 1,
		});

		console.log(assets);

		if (assets.length > 0) {
			setLastedPhoto(assets[0].uri);
		}
	}

	async function SelectImageGallery() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		});

		console.log(result.assets[0].uri);

		if (!result.canceled) {
			setPhoto(result.assets[0].uri);
			setOpenModal(true);
		}
	}

	// Solicitar permissões da câmera e da galeria ao montar o componente
	useEffect(() => {
		GetLastPhoto();
	}, []);


	// if (!permission) {
	// 	alert('carregando permissao');
	// }

	// if (!permission.granted) {
	// 	return(
	// 		<></>
	// 	)
	// }

	function toggleCameraFacing() {
		setTipoCamera(current => (current === 'back' ? 'front' : 'back'));
	}

	// Renderização do componente
	return (
		<View style={styles.container}>
			<CameraView
				style={styles.camera}
				facing={tipoCamera}
				ratio={'16:9'}
				ref={cameraRef}
				flash={flashMode}
				autoFocus={autoFocus}
			>
				<View style={styles.viewFlip}>
					<TouchableOpacity
						style={styles.btnFlip}
						onPress={toggleCameraFacing}
					>
						<FontAwesome6
							name="camera-rotate"
							size={36}
							color="#fff"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btnCaptura}
						onPress={CapturePhoto}
					>
						<FontAwesome name="camera" size={36} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity onPress={ToggleFlashMode}>
						<MaterialIcons
							style={[
								styles.btnFlash,
								flashMode === 'on'
									? styles.flashOn
									: styles.flashOff,
							]}
							name={
								flashMode === 'on'
									? 'flash-on'
									: 'flash-off'
							}
							size={36}
							color={
								flashMode === 'on'
									? '#007bff'
									: '#fff'
							}
						/>
					</TouchableOpacity>
					<ButtonGallery onPress={() => SelectImageGallery()}>
						{lastedPhoto != null ? (
							<ImageGallery source={{ uri: lastedPhoto }} />
						) : null}
					</ButtonGallery>
				</View>
			</CameraView>

			{/* Modal para exibir a foto */}
			<Modal
				animationType="slide"
				transparent={false}
				visible={openModal}
			>
				<View style={styles.modalContainer}>
					<Image
						style={styles.imagePreview}
						source={{ uri: photo }}
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.button}
							onPress={ClearPhoto}
						>
							<FontAwesome
								name="trash"
								size={23}
								color={'#ff0000'}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={SendPhoto}
						>
							<FontAwesome
								name="save"
								size={23}
								color={'#121212'}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};


// Estilos do componente
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
		height: '80%',
		width: '100%',
	},
	viewFlip: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-around',
		width: '100%',
		marginBottom: 15,
	},
	btnFlip: {
		padding: 20,
		borderRadius: 15,
		backgroundColor: '#121212',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnCaptura: {
		padding: 20,
		borderRadius: 15,
		backgroundColor: '#121212',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnFlash: {
		padding: 20,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	flashOn: {
		backgroundColor: '#121212', // Cor de fundo quando o flash está ativado
	},
	flashOff: {
		backgroundColor: '#121212', // Cor de fundo quando o flash está desativado
	},
	modalContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 30,
	},
	imagePreview: {
		width: '100%',
		height: 500,
		borderRadius: 10,
	},
	buttonContainer: {
		margin: 15,
		flexDirection: 'row',
	},
	button: {
		padding: 20,
		borderRadius: 15,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
