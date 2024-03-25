import styled from "styled-components";

//import lib linear gradient
import {LinearGradient} from 'expo-linear-gradient'

export const Container = styled.SafeAreaView`
flex: 1;
align-items: center;
background-color: #FFFFFF;
`
export const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const ContainerHeader = styled(LinearGradient).attrs({
    colors: ['#60BFC5', '#496BBA'],
    start: {x: -0.05, y: 1.08},
    end: {x: 1, y: 0} 
})`
    width: 100%;
    height: 144px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`