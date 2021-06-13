import React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import Logo from '../../assets/logo.svg'

import { Button } from '../../components/Login/Button'
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { Container, Content, Title, LoginText, Footer, ButtonContainer } from './styles';




export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const { signInGoogle, signInAple } = useAuth()
  async function handleSignInGoogle() {
    try {
      setIsLoading(true)
      return await signInGoogle()
    } catch (err) {
      Alert.alert('Login com google falhou, tente novamente!')
      setIsLoading(false)

    }
  }

  async function handleSignInApple() {
    try {
      setIsLoading(true)
      return await signInAple()
    } catch (err) {
      Alert.alert('Login com a Apple falhou, tente novamente!')
      setIsLoading(false)
    }
  }
  return (

    <Container>
      <Content>
        <Logo width={120} height={68} />
        <Title>
          Controle suas {"\n"}
          finanças de forma {"\n"}
          muito simples
        </Title>

        <LoginText>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </LoginText>
      </Content>
      <Footer>
        <ButtonContainer>

          <Button onPress={handleSignInGoogle} name='Google' />
          {Platform.OS === 'ios' && <Button onPress={handleSignInApple} name='Apple' />}
        </ButtonContainer>
        {isLoading && <ActivityIndicator style={{ marginTop: 18 }} color={theme.colors.shape} />}
      </Footer>
    </Container>

  )
}