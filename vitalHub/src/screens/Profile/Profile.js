import { useEffect, useState } from "react";
import { Button, ButtonExitApp, ButtonTitle } from "../../components/Button/Style";
import { Container, ScrollContainer } from "../../components/Container/Style";
import {
  AddresRow,
  ContentName,
  ContentProfile,
  ContentProfileRow,
  ContentRow,
  InputProfile,
  InputRow,
  ProfilePicture,
  RowContentProfile,
  TextProfileEmail,
  TextProfileInput,
  TextProfileName,
} from "./Style";

import { UserDecodeToken } from '../../services/Utils/Auth';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const Profile = ({navigation}) => {

  const [nameUser, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  //carregamento dos dados do usuario
  async function profileLoad(){
  try {
    
      const token = await UserDecodeToken()
  
      const {name} = token;
      const {email} = token;
  
      if(token){
        const {name, email} = token
      }
      // Limitamos o tamanho do nome a, por exemplo, 20 caracteres
      const limitedName = name.length > 16 ? name.substring(0, 16) + '...' : name;

      setUserName(limitedName);
      setUserEmail(email);
  
    } catch (error) {
      console.log(error); 
    }
  }
  
  async function Logout(){
    try {

      //obetendo o token
      const token = await AsyncStorage.getItem('token')

      //removendo o token
      await AsyncStorage.removeItem('token')

      navigation.navigate('Login');

      console.log('Token removido', token);
    } catch (error) {
      console.log(error);
    }
  }

	useEffect(() =>{
		profileLoad()
	},[])
  return (
    <ScrollContainer>
      <Container>
        <ProfilePicture source={{ uri: "https://github.com/marqzzs.png" }} />
        <ContentName>
          <TextProfileName> {nameUser} </TextProfileName>
          <TextProfileEmail>{userEmail}</TextProfileEmail>
        </ContentName>
        {/*  */}
        <ContentProfile>
          <TextProfileInput>Date of birth:</TextProfileInput>
          <InputProfile placeholder={"04/05/1999"} />
        </ContentProfile>
        {/*  */}
        <ContentProfile>
          <TextProfileInput>CPF:</TextProfileInput>
          <InputProfile placeholder={"859*********"} />
        </ContentProfile>
        {/*  */}
        <ContentProfile>
          <TextProfileInput>Address</TextProfileInput>
          <InputProfile placeholder={"Rua Vincenso Silva, 987"} />
        </ContentProfile>
        {/*  */}
        <ContentRow>
          <RowContentProfile>
            <TextProfileInput>CEP:</TextProfileInput>
            <InputRow placeholder={"05545-333"} />
          </RowContentProfile>
          {/*  */}
          <RowContentProfile>
            <TextProfileInput>City:</TextProfileInput>
            <InputRow placeholder={"Capao Redondo - SP"} />
          </RowContentProfile>
        </ContentRow>

        <Button>
          <ButtonTitle>Save</ButtonTitle>
        </Button>

        <Button>
          <ButtonTitle>Edit</ButtonTitle>
        </Button>

        <ButtonExitApp onPress={() => Logout()}>
          <ButtonTitle>Exit the app</ButtonTitle>
        </ButtonExitApp>
      </Container>
    </ScrollContainer>
  );
};
