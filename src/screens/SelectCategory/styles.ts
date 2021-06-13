import { getBottomSpace } from 'react-native-iphone-x-helper';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { CategoryProps } from '../../utils/category'
import {FlatList} from 'react-native'

interface IconProps{
  color: 'string'
}

interface Category{
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  background-color: ${({theme})=> theme.colors.background};
  flex: 1;
`
export const Categories = styled(
  FlatList as new () => FlatList<CategoryProps>
).attrs({
  showsVerticalScrollIndicator:false,
})``;

export const Category = styled.TouchableOpacity<Category>`
  background-color: ${({theme, isActive})=> isActive ? theme.colors.secondary_light : theme.colors.shape};
  padding: 24px;
  flex-direction: row;

  align-items: center;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(20)}px;
  color: ${({color})=> color};
`;

export const Name = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({theme})=>  theme.colors.text};
  font-family:${({theme})=> theme.fonts.regular};

  margin-left: 16px ;
`;

export const Divider = styled.View`
  height: 1px;

  width: 100%;

  background-color: ${({theme})=> theme.colors.border_button};
`
export const Footer = styled.View`
  padding: 0 24px;
  
  width: 100%;
  padding-bottom: ${getBottomSpace()}px;

`;

