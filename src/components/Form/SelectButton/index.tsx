import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title, Icon } from './styles';

interface Props {
  category: {
    key: string;
    name: string;
    icon: string;
  }
  onPress: () => void;
}

export function SelectButton({ onPress, category }: Props) {
  return (
    <Container onPress={onPress}>
      <Title>{category.name}</Title>
      <Icon name={category.icon} />
    </Container>
  )
}
