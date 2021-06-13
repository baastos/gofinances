import styled from 'styled-components/native'

import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: ${RFValue(56)}px;
  background-color: ${({theme})=> theme.colors.shape};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`
export const Icon = styled.View`
  border-right-width : 1px;
  border-color:${({theme})=> theme.colors.background};
  border-style: solid;
  padding: ${RFValue(16)}px;
  height: 100%;
`

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme})=> theme.colors.title};
  font-family: ${({theme})=> theme.fonts.medium};
  flex: 1;
  text-align: center;
`