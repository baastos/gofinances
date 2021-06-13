import styled, { css } from 'styled-components/native';

import {Feather} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps{
  type: 'income' | 'outcome' | 'total'
  isFucked?: boolean
}

export const Container= styled.View<TypeProps>`
  background-color: ${({theme,type})=> type === 'total' 
  ? theme.colors.secondary : theme.colors.shape};
  
  ${({isFucked})=> isFucked && css`
  background-color: ${({theme}) => theme.colors.attention};
  `}
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type})=> type === 'income' && css`
    color: ${({theme}) => theme.colors.success};
  `} 

  ${({ type})=> type === 'outcome' && css`
    color: ${({theme}) => theme.colors.attention};
  `} 

  ${({ type})=> type === 'total' && css`
    color: ${({theme}) => theme.colors.shape};
  `} 
`

export const Title = styled.Text<TypeProps>`
  font-size: ${RFValue(14)}px;
  color: ${({theme,type})=> type === 'total' 
  ? theme.colors.shape : theme.colors.text_dark};
  font-family: ${({theme})=> theme.fonts.regular};

`

export const Footer = styled.View`
  margin-top: 38px;
`

export const Money = styled.Text<TypeProps>`
    font-size: ${RFValue(32)}px;
    color: ${({theme,type})=> type === 'total' 
  ? theme.colors.shape : theme.colors.text_dark};
    font-family: ${({theme})=> theme.fonts.regular};
`

export const LastIncome = styled.Text<TypeProps>`
    font-size: ${RFValue(12)}px;
    color: ${({theme,type})=> type === 'total' 
  ? theme.colors.shape : theme.colors.text};
    font-family: ${({theme})=> theme.fonts.regular};
`
