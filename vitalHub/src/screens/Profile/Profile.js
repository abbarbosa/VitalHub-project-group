import { useEffect, useState } from "react";
import { Button, ButtonExitApp, ButtonTitle } from "../../components/Button/Style";
import { Container, ScrollContainer } from "../../components/Container/Style";
import {
  ContentName,
  ContentProfile,
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
import { api } from "../../services/Service";


export const Profile = ({navigation}) => {

  const [nameUser, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userData, setUserData] = useState('')

  //carregamento dos dados do usuario
  async function profileLoad(){
  try {
    
      const token = await UserDecodeToken()
  
      const {name} = token;
      const {email} = token;
      const {dateBirth} = token;
  
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

  async function loggedUser(){
    try {
      // Recuperação do token de acesso
			const token = JSON.parse(
				await AsyncStorage.getItem('token'),
			).token;

      if(token){
        await api.get('/Pacientes/PerfilLogado', {
          headers: {
						// Adicionando o token ao cabeçalho de autorização
						Authorization: `Bearer ${token}`
					}
          
        }).then(response => {
          // Formata a data de nascimento antes de definir no estado
          const formattedBirthDate = formatBirthDate(response.data.dataNascimento);
           // Formata o CPF antes de definir no estado
          const formattedCPF = formatCPF(response.data.cpf);
          // Define a data de nascimento formatada no estado
          setUserData({ ...response.data, dataNascimento: formattedBirthDate, cpf: formattedCPF});
        }).catch(error => {
          console.log(error);
        })
      }else{
        console.log(`deu erro no if`);
      }
    } catch (error) {
      console.log(`Deu erro nl catch: ${error}`);
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

// Função para formatar a data de nascimento
function formatBirthDate(dateString) {
  // Cria um objeto de data a partir da string da data de nascimento
  const birthDate = new Date(dateString);

  // Obtém o dia, mês e ano da data de nascimento
  const day = String(birthDate.getDate()).padStart(2, '0'); // Adiciona zeros à esquerda se necessário
  const month = String(birthDate.getMonth() + 1).padStart(2, '0'); // Adiciona zeros à esquerda se necessário
  const year = birthDate.getFullYear();

  // Formata a data no formato dd/mm/aaaa
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

// Função para formatar o CPF
function formatCPF(cpfString) {
  // Extrai os três primeiros dígitos do CPF
  const firstDigits = cpfString.substring(0, 3);
  // Oculta todos os demais dígitos com "*"
  const hiddenDigits = cpfString.substring(3).replace(/\d/g, '*');
  // Concatena os três primeiros dígitos com os demais ocultos
  const formattedCPF = `${firstDigits}${hiddenDigits}`;
  return formattedCPF;
}


	useEffect(() =>{
		profileLoad(),
    loggedUser()
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
          <InputProfile placeholder={"04/05/1999"}>
            {userData.dataNascimento}
          </InputProfile>
        </ContentProfile>
        {/*  */}
        <ContentProfile>
          <TextProfileInput>CPF:</TextProfileInput>
          <InputProfile placeholder={"859*********"}>
            {userData.cpf}
          </InputProfile>
        </ContentProfile>
        {/*  */}
        <ContentProfile>
          <TextProfileInput>Address:</TextProfileInput>
          <InputProfile placeholder={"Rua Vincenso Silva, 987"}>
            {userData.endereco ? userData.endereco.logradouro : ''}
          </InputProfile>
        </ContentProfile>
        {/*  */}
        <ContentRow>
          <RowContentProfile>
            <TextProfileInput>CEP:</TextProfileInput>
            <InputRow placeholder={"05545-333"}>
              {userData.endereco ? userData.endereco.cep : ""}
            </InputRow>
          </RowContentProfile>
          {/*  */}
          <RowContentProfile>
            <TextProfileInput>City:</TextProfileInput>
            <InputRow placeholder={"Capao Redondo - SP"}>
              {userData.endereco ? userData.endereco.cidade : ""}
            </InputRow>
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