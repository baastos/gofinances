import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

interface Cate {
  selected: boolean;
}
export const Container = styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.colors.background};
`
export const CategoriesList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle:{paddingHorizontal: 24, paddingVertical: 32 }
})`
`

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const MonthButtonSelect = styled(BorderlessButton)``

export const MonthButtonIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`

export const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({theme})=> theme.fonts.regular};
  color: ${({theme})=> theme.colors.text_dark};
`
export const TextCat = styled.Text<Cate>`
color: ${({selected})=> selected ? 'red' : 'black'}
`