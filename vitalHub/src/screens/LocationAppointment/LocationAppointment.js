import { useEffect } from 'react';
import {
	ButtonSecundary,
	ButtonSecundaryTitle,
} from '../../components/Button/Style';
import {
	SmallGroupModal,
	SmallTextModal,
	SpaceView,
} from '../../components/ConfirmModal/Style';
import { Container } from '../../components/Container/Style';
import { Map } from '../../components/Maps/Maps';
import { Title } from '../../components/Title/Style';
import {
	ContentProfile,
	ContentRow,
	InputProfile,
	InputRow,
	RowContentProfile,
	TextProfileInput,
} from '../Profile/Style';
import { ImageLocation } from './Style';

export const LocationAppointment = ({ navigation, route }) => {
	useEffect(() => {
		console.log(route);
	}, [route.params]);

	return (
		<Container>
			<ImageLocation>
				<Map />
			</ImageLocation>

			<SpaceView>
				<Title>Clinic Nature</Title>
				<SmallTextModal>Jerumenha-PI</SmallTextModal>
			</SpaceView>

			<ContentProfile>
				<TextProfileInput>Address</TextProfileInput>
				<InputProfile placeholder={'Rua Vincenso, 97'} />
			</ContentProfile>
			<ContentRow>
				<RowContentProfile>
					<TextProfileInput>Number</TextProfileInput>
					<InputRow placeholder={'97'} />
				</RowContentProfile>
				{/*  */}
				<RowContentProfile>
					<TextProfileInput>neighborhood</TextProfileInput>
					<InputRow placeholder={'Jerumenha-PI'} />
				</RowContentProfile>
			</ContentRow>
			<ButtonSecundary onPress={() => navigation.replace('Main')}>
				<ButtonSecundaryTitle>Back</ButtonSecundaryTitle>
			</ButtonSecundary>
		</Container>
	);
};
