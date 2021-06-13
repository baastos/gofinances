import React from 'react';
import { Container, Icon, Title } from './styles';

import GoogleIcon from '../../../assets/google.svg';
import AppleIcon from '../../../assets/apple.svg';
import { RectButtonProperties } from 'react-native-gesture-handler';

interface Props extends RectButtonProperties {
  name: string;
}

interface Icons {
  [key: string]: JSX.Element;
}
const icons: Icons = {
  Google: <GoogleIcon width={24} height={24} />,
  Apple: <AppleIcon width={24} height={24} />
}

export function Button({ name, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon>
        {icons[name]}
      </Icon>
      <Title>Entrar com {name}</Title>
    </Container>
  )
}