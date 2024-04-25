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
import moment from "moment";
import { ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ButtonCamera, ContainerImage } from "../Login/Style";

// Definição do componente Profile
export const Profile = ({ navigation, route }) => {

  // Definição dos estados do componente
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userData, setUserData] = useState('')
  const [informations, setInformations] = useState(null)
  const [profile, setProfile] = useState('')
  const [userLogin, setUserLogin] = useState('')
  const [inputsBlocked, setInputsBlocked] = useState(true);
  const [photoUriRoute, setPhotoUriRoute] = useState(null)

  // Função assíncrona para carregar os dados do usuário
  async function profileLoad() {
    const token = await UserDecodeToken();

    setProfile(token);
    setUserLogin(token.role);

    await loggedUser(token)

    const { name } = token;

    const { email } = token;

    const limitedName = name.length > 16 ? name.substring(0, 16) + '...' : name;
    setUserName(limitedName);

    setUserEmail(email)
  }


  // Função assíncrona para carregar os dados do usuário logado
  async function loggedUser(token) {
    try {
      // Recuperação do token de acesso armazenado localmente
      // const token = JSON.parse(
      //   await AsyncStorage.getItem('token'),
      // ).token;

      // Verifica se o token existe
      // Requisição à API para obter dados do usuário logado
      const url = (token.role === 'Medico' ? 'Medicos' : 'Pacientes');

      await api.get(`${url}/BuscarPorId?id=${token.user}`
      ).then(response => {


        setInformations(response.data)

      }).catch(error => {
        console.log(error);
      })
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
    } catch (error) {
      console.log(error);
    }
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

  const formatarDataNascimento = (dataNascimento) => {
    return moment(dataNascimento).format('DD/MM/YYYY');
  };

  const handleEditButtonClick = () => {
    setInputsBlocked(false); // Desbloquear os inputs ao clicar no botão "Editar"
  }

  const handleEditButtonClickFalse = () => {
    setInputsBlocked(true);
  }
  // Efeito utilizado para carregar os dados do usuário ao montar o componente
  useEffect(() => {
    profileLoad()
  }, [])

  async function AlternateProfilePicture() {
    const formData = new FormData();
    formData.append("Arquivo", { 
      uri: route.params.photoUriRoute,
      name: `image.${route.params.photoUri.split(".")[1]}`,
      type: `image/${route.params.photoUri.split(".")[1]}`
    })

    console.log(`/Usuario/AlterarFotoPerfil?id=${profile.user}`)
    await api.put(`/Usuario/AlterarFotoPerfil?id=${profile.user}`, formData, {
      headers:{
        "Content-Type" : "multipart/form-data"
      }
    }).then(response =>{
      console.log(response);
    }).catch(error =>{
      console.log(error);
    })
}

useEffect(() => {
  if (route.params.photoUri) {
    AlternateProfilePicture()
  }
}, [route.params]);



// Retorno do componente
return (
  <ScrollContainer>
    {
      informations != null ? (
        <Container>
          <ContainerImage>
            <ProfilePicture source={{ uri: "https://github.com/marqzzs.png" }} />
            <ButtonCamera onPress={() => navigation.navigate('CameraPhoto', {})}>
              <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb" />
            </ButtonCamera>
          </ContainerImage>
          <ContentName>
            <TextProfileName> {userName} </TextProfileName>
            <TextProfileEmail>{userEmail}</TextProfileEmail>
          </ContentName>
          <ContentProfile>

            <TextProfileInput> {userLogin === 'Medico' ? 'Specialized' : 'Birthday date'}</TextProfileInput>
            <InputProfile editable={!inputsBlocked}>
              {userLogin === 'Medico' ? `${informations?.especialidade?.especialidade1}` : `${formatarDataNascimento(informations.dataNascimento)}`}

            </InputProfile>
          </ContentProfile>
          {/*  */}
          <ContentProfile>
            <TextProfileInput> {userLogin === 'Medico' ? 'CRM' : 'CPF'}</TextProfileInput>
            <InputProfile editable={!inputsBlocked}>
              {userLogin === 'Medico' ? `${informations.crm}` : `${informations?.cpf}`}
              {/* {userLogin === 'Medico' && informations?.crm ? informations.crm : ''} */}
            </InputProfile>
          </ContentProfile>
          {/*  */}
          <ContentProfile>
            <TextProfileInput>Address:</TextProfileInput>
            <InputProfile editable={!inputsBlocked}>
              {/* {userLogin ==='Medico' ? `${informations.endereco.logradouro}`: `${informations.endereco.logradouro}`} */}
              {`${informations.endereco.logradouro}`}
            </InputProfile>
          </ContentProfile>
          {/*  */}
          <ContentRow>
            <RowContentProfile>
              <TextProfileInput>CEP:</TextProfileInput>
              <InputRow editable={!inputsBlocked} //placeholder={"05545-333"}
              >
                {`${informations.endereco.cep}`}
              </InputRow>
            </RowContentProfile>
            {/*  */}
            <RowContentProfile>
              <TextProfileInput>City:</TextProfileInput>
              <InputRow editable={!inputsBlocked}
              //placeholder={"Capao Redondo - SP"}
              >
                {`${informations.endereco.cidade}`}
                {/* {userLogin === 'Medico' ? `${informations.endereco.cidade}`: `${informations.endereco.cidade}`} */}
              </InputRow>
            </RowContentProfile>
          </ContentRow>

          <Button onPress={handleEditButtonClickFalse}>
            <ButtonTitle>Save</ButtonTitle>
          </Button>

          <Button onPress={handleEditButtonClick}>
            <ButtonTitle>Edit</ButtonTitle>
          </Button>

          <ButtonExitApp onPress={() => Logout()}>
            <ButtonTitle>Exit the app</ButtonTitle>
          </ButtonExitApp>
        </Container>
      ) : (
        <ActivityIndicator />
      )
    }

  </ScrollContainer>
);
}; 
