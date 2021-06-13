import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  background-color: ${({theme})=> theme.colors.primary};
  height: 70%;
  align-items: center;
  justify-content: center;

`

export const Title = styled.Text`
  margin-top: 45px;
  font-size: ${RFValue(30)}px;
  color: ${({theme})=> theme.colors.shape};
  font-family: ${({theme})=> theme.fonts.medium};
  text-align: center;

`;
 
export const LoginText = styled.Text`
  margin-top: 80px;

  color: ${({theme})=> theme.colors.shape};
  font-family: ${({theme})=> theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  text-align: center;


`;

export const Footer = styled.View`
  background-color: ${({theme})=> theme.colors.secondary};
  height: 30%;
  width: 100%;
  padding: 0 32px;
`;

export const ButtonContainer = styled.View`
  margin-top: ${RFPercentage(-4)}px;
 `