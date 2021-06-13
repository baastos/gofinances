import styled, {css} from 'styled-components/native'
import { TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons'

import { RFValue } from 'react-native-responsive-fontsize'

interface IconProps{
  type: 'income' | 'outcome'
}

interface ContainerProps{
  type: 'income' | 'outcome';
  isActive: boolean
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  border-radius: 5px;
  border-width: ${({isActive})=> isActive ? '0px' : '1.5px' };
  border-style: solid;
  border-color: ${({theme})=> theme.colors.border_button};
  padding: 18px;
  align-items: center;

  flex-direction: row;

  align-items: center;
  ${({isActive,type})=> isActive && type === 'income' && css`
    background-color: ${({theme})=> theme.colors.success_light}; ;
  `}

  ${({isActive,type})=> isActive && type === 'outcome' && css`
    background-color: ${({theme})=> theme.colors.attention_light}; ;
  `}

`
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme})=> theme.colors.title};
  font-family: ${({theme})=> theme.fonts.regular};

  margin-left: 14px;
`

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(20)}px;
  color: ${({theme, type})=> type === 'income' ? theme.colors.success : theme.colors.attention};
`