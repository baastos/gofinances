import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({theme})=> theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;

  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({theme})=> theme.colors.shape};
  font-family: ${({theme})=> theme.fonts.regular};
  font-size: ${RFValue(18)}px;

  margin-bottom: 19px;
`;