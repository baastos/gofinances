import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme})=> theme.colors.background};
  flex: 1;
  padding-bottom: ${getBottomSpace()}px;
`
export const Form = styled.View`
  flex:1;
  
  padding: 24px;
  width: 100%;
  justify-content: space-between;
`;
export const Fields = styled.View``;

export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 16px;
`;


