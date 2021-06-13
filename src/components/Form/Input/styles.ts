import styled from 'styled-components/native'
import {TextInput} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled(TextInput)`
  width: 100%;
  background-color: ${({theme})=> theme.colors.shape};
  margin-bottom: 8px;
  border-radius: 5px;

  padding: 18px 16px;

  font-size: ${RFValue(14)}px;
  color: ${({theme})=> theme.colors.text};
  font-family: ${({theme})=> theme.fonts.regular};
`