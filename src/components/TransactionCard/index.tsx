import React from 'react'

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles'

export interface TransactionProps {
  id: string;
  title: string;
  type: 'income' | 'outcome';
  amount: number;
  category: {
    name: string;
    icon: string;
    color: string;
    key: string;
  }
  date: Date;
  formattedDate: string;
  formattedAmount: string;
}

interface Props {
  data: TransactionProps
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === 'outcome' && '- '}
        {data.formattedAmount}
      </Amount>
      <Footer>
        <Category>
          <Icon color={data.category.color} name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.formattedDate}</Date>
      </Footer>
    </Container>
  )
}