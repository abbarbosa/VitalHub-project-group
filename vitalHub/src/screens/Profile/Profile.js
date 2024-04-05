// Importando os módulos necessários do React e do React Native
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
} from "./Style"; // Importando os estilos específicos para este componente

// Importando funções e componentes adicionais necessários
import { UserDecodeToken } from '../../services/Utils/Auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/Service";

// Definição do componente Profile
export const Profile = ({ navigation }) => {

  // Definição dos estados do componente
  const [nameUser, setNameUser] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userData, setUserData] = useState('')
  const [informations, setInformations] = useState('')
  const [profile, setProfile] = useState('')
  const [userLogin, setUserLogin] = useState('')



  // Função assíncrona para carregar os dados do usuário
  async function profileLoad() {
    const token = await UserDecodeToken();
    setProfile(token);
    setUserLogin(token.role);
  }

  // Função assíncrona para carregar os dados do usuário logado
  async function loggedUser() {
    try {
      // Recuperação do token de acesso armazenado localmente
      const token = JSON.parse(
        await AsyncStorage.getItem('token'),
      ).token;

      // Verifica se o token existe
      if (token) {
        // Requisição à API para obter dados do usuário logado
        await api.get('/Pacientes/PerfilLogado', {
          headers: {
            // Adicionando o token ao cabeçalho de autorização
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          // Formata a data de nascimento e o CPF antes de definir no estado
          const formattedBirthDate = formatBirthDate(response.data.dataNascimento);
          const formattedCPF = formatCPF(response.data.cpf);

          // Define os dados do usuário formatados no estado
          setUserData({ ...response.data, dataNascimento: formattedBirthDate, cpf: formattedCPF });
        }).catch(error => {
          console.log(error);
        })
      } else {
        console.log(`deu erro no if`);
      }
    } catch (error) {
      console.log(`Deu erro no catch: ${error}`);
    }
  }

  // Função assíncrona para realizar o logout do usuário
  async function Logout() {
    try {
      // Obtém o token de acesso armazenado localmente
      const token = await AsyncStorage.getItem('token')

      // Remove o token armazenado localmente
      await AsyncStorage.removeItem('token')

      // Navega para a tela de login
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

  async function ShowInformations() {
    const url = (informations.role === 'Medico' ? 'Medicos' : 'Pacientes');
    await api
      .get(`${url}/BuscarPorId?id=${profile.user}`)
      .then((response) => {
        console.log(response)

      })
    //   // await api
    //   //   .get(`${url}/BuscarPorData?data=${dateSelected}&id=${profile.user}`)
    //   //   .then((response) => {
    //   //     setListaConsulta(response.data);
    //   //   })
    //   //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  // Efeito utilizado para carregar os dados do usuário ao montar o componente
  useEffect(() => {
    profileLoad(),
      loggedUser()
  }, [])

  // Retorno do componente
  return (
    <ScrollContainer>
      <Container>
        <ProfilePicture source={{ uri: "https://github.com/marqzzs.png" }} />
        <ContentName>
          <TextProfileName> {nameUser} </TextProfileName>
          <TextProfileEmail>{userEmail}</TextProfileEmail>
        </ContentName>
        <ContentProfile>
          <TextProfileInput>Date of birth:</TextProfileInput>
          <InputProfile>
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
