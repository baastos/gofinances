import styled from 'styled-components/native'
import {Feather} from '@expo/vector-icons'
import {FlatList} from 'react-native'
import { RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper'

import {TransactionProps} from '../../components/TransactionCard'
import { BorderlessButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.colors.background};

`
export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(48)}px;
  background-color: ${({theme})=> theme.colors.primary};
  padding-top: ${getStatusBarHeight() + RFValue(20)}px;

`
export const UserWrapper = styled.View`
 padding: 0 24px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;
export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const Greetings = styled.View`
  margin-left: 17px;
`;

export const GreetingsText = styled.Text`
  color: ${({theme})=> theme.colors.shape};
  font-family: ${({theme})=> theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  
`
export const UserName = styled.Text`
  color: ${({theme})=> theme.colors.shape};
  font-family: ${({theme})=> theme.fonts.bold};
  font-size: ${RFValue(18)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({theme})=> theme.colors.secondary};

`
export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true, 
  showsHorizontalScrollIndicator:false, 
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(21)}px;
`
export const Transactions = styled.View`
  padding: 0 24px;
  flex: 1;
  margin-top: ${RFPercentage(6)}px;


`
export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme })=> theme.colors.text_dark};
  font-family: ${({ theme })=> theme.fonts.regular};

  margin-bottom: 16px;
`

export const TransactionList = styled(
  FlatList as new () => FlatList<TransactionProps>
  ).attrs({
  showsVerticalScrollIndicator:false,
  contentContainerStyle:{ paddingBottom: getBottomSpace() }
})``

export const LogoutButton = styled(BorderlessButton)``