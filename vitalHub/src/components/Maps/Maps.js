import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';

//importacao da biblioteca mapsView
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import {
	requestForegroundPermissionsAsync, //solicita o acesso a localizacao
	getCurrentPositionAsync, // recebe a localizacao atual
	watchPositionAsync, //monitorar o posicionamento
	LocationAccuracy,
} from 'expo-location';

import MapViewDirections from 'react-native-maps-directions';

import { mapskey } from '../../services/Utils/mapKey';

export const Map = () => {
	const mapReference = useRef(null);

	const [initialPosition, setInitialPosition] = useState(null);
	const [finalPosition, setFinalPosition] = useState({
		latitude: -7.2451,
		longitude: -43.9304,
	});

	async function CapturarLocalizacao() {
		const { granted } = await requestForegroundPermissionsAsync();

		if (granted) {
			const captureLocation = await getCurrentPositionAsync();

			setInitialPosition(captureLocation);
		}
	}

	useEffect(() => {
		CapturarLocalizacao();

		watchPositionAsync(
			{
				accuracy: LocationAccuracy.Highest,
				timeInterval: 1000,
				distanceInterval: 1,
			},
			async (response) => {
				setInitialPosition(response);
				mapReference.current?.animateCamera({
					pitch: 60,
					center: response.coords,
				});
			},
		);
	}, [1000]);

	async function RecarrecarVisualizacaoMapa() {
		if (mapReference.current && initialPosition) {
			await mapReference.current.fitToCoordinates(
				[
					{
						latitude: initialPosition.coords.Latitude,
						longitude: initialPosition.coords.longitude,
					},
					{
						latitude: finalPosition.latitude,
						longitude: finalPosition.longitude,
					},
				],
				{
					edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
					animatedCamera: true,
				},
			);
		}
	}

	useEffect(() => {
		RecarrecarVisualizacaoMapa();
	}, [initialPosition]);

	return (
		<View style={styles.container}>
			{initialPosition != null ? (
				<MapView
					ref={mapReference}
					style={styles.map}
					customMapStyle={grayMapStyle}
					provider={PROVIDER_GOOGLE}
					initialRegion={{
						latitude: initialPosition.coords.latitude,
						longitude: initialPosition.coords.longitude,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}}
				>
					<Marker
						coordinate={{
							latitude: initialPosition.coords.latitude,
							longitude: initialPosition.coords.longitude,
						}}
						title="Posicao Inicial"
						description="Estou aqui"
						pinColor={'blue'}
					/>
					<MapViewDirections
						origin={initialPosition.coords}
						destination={{
							latitude: finalPosition.latitude,
							longitude: finalPosition.longitude,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						}}
						apikey={mapskey}
						strokeWidth={5}
						strokeColor="#496BBA"
					/>
					<Marker
						coordinate={{
							latitude: finalPosition.latitude,
							longitude: finalPosition.longitude,
						}}
						title="Posicao inicial"
						description="Estou aqui"
					/>
				</MapView>
			) : (
				<>
					<Text>Localizao nao encontrada</Text>

					<ActivityIndicator />
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 324,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		flex: 1,
		width: '100%',
	},
});

const grayMapStyle = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: '#E1E0E7',
			},
		],
	},
	{
		elementType: 'geometry.fill',
		stylers: [
			{
				saturation: -5,
			},
			{
				lightness: -5,
			},
		],
	},
	{
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#FBFBFB',
			},
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#33303E',
			},
		],
	},
	{
		featureType: 'administrative',
		elementType: 'geometry',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'administrative.country',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'administrative.land_parcel',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'administrative.locality',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'poi.business',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#66DA9F',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#1B1B1B',
			},
		],
	},
	{
		featureType: 'road',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#C6C5CE',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#FBFBFB',
			},
		],
	},
	{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [
			{
				color: '#ACABB7',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#8C8A97',
			},
		],
	},
	{
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry',
		stylers: [
			{
				color: '#8C8A97',
			},
		],
	},
	{
		featureType: 'road.local',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'transit',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#8EA5D9',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
];
