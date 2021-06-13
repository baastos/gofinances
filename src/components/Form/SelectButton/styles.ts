import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons';

import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  background-color: ${({theme})=> theme.colors.shape};
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  padding: 18px 16px;
  align-items: center;

  margin-top: 16px; 
`
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme})=> theme.colors.text};
  font-family: ${({theme})=> theme.fonts.regular};
`
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({theme})=> theme.colors.text};
`;