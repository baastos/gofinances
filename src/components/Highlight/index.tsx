import React from 'react'
import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Money,
  LastIncome
} from './styles'

interface HightlightProps {
  title: string;
  type: 'income' | 'outcome' | 'total'
  money: string;
  description: string | null;
  isFucked?: boolean
}

export function Hightlight({ description, isFucked, money, title, type }: HightlightProps) {
  const iconType = {
    income: 'arrow-up-circle',
    outcome: 'arrow-down-circle',
    total: 'dollar-sign'
  }

  return (
    <Container type={type} isFucked={isFucked}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={iconType[type]} type={type} />
      </Header>

      <Footer>
        <Money type={type}>{money}</Money>
        <LastIncome type={type}>{description}</LastIncome>
      </Footer>
    </Container>
  )
}

