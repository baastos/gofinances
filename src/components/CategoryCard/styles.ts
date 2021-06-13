import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

interface Props{
  color: string
}

export const Container = styled.View<Props>`
  width: 100%;
  padding: 13px 20px;
  background-color: ${({theme})=> theme.colors.shape};
  border-radius: 5px;

  border-left-color: ${({color})=> color};
  border-left-width: 4px;
  margin-bottom: 8px;

  flex-direction: row;
  justify-content: space-between;

`
export const Name = styled.Text`
 font-size: ${RFValue(15)}px;
 font-family: ${({theme})=> theme.fonts.regular};
 color: ${({theme})=> theme.colors.title};
`;

export const Amount = styled.Text`
 font-size: ${RFValue(15)}px;
 font-family: ${({theme})=> theme.fonts.bold};
 color: ${({theme})=> theme.colors.title};
`;