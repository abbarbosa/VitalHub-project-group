import styled from 'styled-components';

export const LinkMedium = styled.Text`
	font-size: 14px;
	font-family: 'MontserratAlternates_500Medium';
	color: #8c8a97;
	margin-top: 10px;
	align-self: flex-start;
	margin-left: 20px;
	text-decoration: underline;
	margin-bottom: 30px;
`;

export const LinkBold = styled(LinkMedium)`
	font-size: 14px;
	font-family: 'MontserratAlternates_600SemiBold';
	color: #4d659d;
`;

export const TextEmail = styled(LinkMedium)`
	text-decoration: none;
	font-size: 16px;
	align-self: center;
	margin: 0px 0px 15px 0px;
	color: #496bba;
`;

export const MiniLink = styled(LinkMedium)`
	font-family: 'MontserratAlternates_600SemiBold';
	align-self: center;
	margin: 15px 0px 0px 0px;
	color: #344f8f;
	font-size: 16px;
`;
