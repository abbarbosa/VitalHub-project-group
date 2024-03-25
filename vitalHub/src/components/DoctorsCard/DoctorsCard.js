import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ContainerCardList, TextBold } from '../AppointmentCard/Style';
import { ContentNameDoctorCard, TitleCard } from '../ClinicCard/Style';
import { DoctorCardImage } from './Style';

export const DoctorsCard = ({ id, nome, image, especialidade, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <ContainerCardList style={{ borderWidth: selected ? 2 : 0, borderColor: '#496BBA' }}>
        {/* Utilize o componente Image para exibir a imagem */}
        <DoctorCardImage source={{ uri: image }} />
        <ContentNameDoctorCard>
          <TitleCard>{nome}</TitleCard>
          <TextBold>{especialidade}</TextBold>
        </ContentNameDoctorCard>
      </ContainerCardList>
    </TouchableOpacity>
  );
};
