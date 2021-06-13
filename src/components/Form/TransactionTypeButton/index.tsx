import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title, Icon } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  isActive: boolean;
  type: 'income' | 'outcome'
}

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
}

export function TransactionTypeButton({ title, isActive, type, ...rest }: Props) {
  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon type={type} name={icons[type]} />
      <Title>{title}</Title>
    </Container>
  )
}