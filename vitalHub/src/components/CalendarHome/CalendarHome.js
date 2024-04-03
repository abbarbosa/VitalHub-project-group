import React from 'react';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { StyledCalendarStrip } from '../../screens/Home/Style';

const CalendarHome = ({ setDateSelected }) => {
	// Atualização das configurações de localização do momento
	moment.updateLocale('pt-br', {
		months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split(
			'_',
		),
		monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split(
			'_',
		),
		weekdays:
			'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split(
				'_',
			),
		weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
		weekdaysMin: 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
	});

	// Instância da data atual
	const currentDate = new Date();

	// Define a data inicial como sendo o primeiro dia do mês
	const startingDate = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1,
	);

	// Define a data final como sendo o último dia do mês
	const endingDate = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0,
	);

	return (
		<StyledCalendarStrip
			// Animação e seleção de cada data
			calendarAnimation={{ type: 'sequence', duration: 30 }}
			daySelectionAnimation={styles.selectedAnimationStyle}
			// Seta esquerda e direita para avançar e voltar (aqui como display none)
			iconLeftStyle={styles.iconsStyle}
			iconRightStyle={styles.iconsStyle}
			onDateSelected={(date) =>
				setDateSelected(moment(date).format('YYYY-MM-DD'))
			}
			// Deixa uma marcação default - data atual
			selectedDate={currentDate}
			// Dia que começamos a visualizar a barra
			startingDate={moment()}
			// Data min e max - início do mês e final do mês
			minDate={startingDate}
			maxDate={endingDate}
			// Estilização dos itens que não estão selecionados
			calendarHeaderStyle={styles.calendarHeaderStyle}
			dateNumberStyle={styles.numberDateStyle}
			dateNameStyle={styles.nameDateStyle}
			// Estilização do item que está selecionado - efeito do item marcado
			highlightDateNameStyle={styles.selectedDateNameStyle}
			highlightDateNumberStyle={styles.selectedDateNumberStyle}
			highlightDateContainerStyle={styles.selectedContainerStyle}
			// Tamanho do container
			iconContainer={{ flex: 0.1 }}
			// Scroll da barra
			scrollable={true}
		/>
	);
};

const styles = StyleSheet.create({
	iconsStyle: {
		display: 'none',
	},
	calendarHeaderStyle: {
		fontSize: 22,
		textAlign: 'center',
		alignSelf: 'flex-start',
		color: '#4E4B59',
		fontFamily: 'MontserratAlternates_600SemiBold',
		paddingHorizontal: 16,
	},
	nameDateStyle: {
		color: '#ACABB7',
		fontSize: 12,
		textTransform: 'capitalize',
	},
	numberDateStyle: {
		color: '#5F5C6B',
		fontSize: 16,
	},
	selectedDateNameStyle: {
		color: 'white',
		fontSize: 12,
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	selectedDateNumberStyle: {
		color: 'white',
		fontSize: 14,
	},
	selectedContainerStyle: {
		backgroundColor: `#60BFC5`,
	},
	selectedAnimationStyle: {
		type: 'border',
		duration: 200,
		borderWidth: 2,
		borderHighlightColor: '#49B3BA',
	},
});

export default CalendarHome;
