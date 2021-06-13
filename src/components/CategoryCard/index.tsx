import React from 'react';
import { Container, Name, Amount } from './styles';


interface CategoryProps {
  name: string;
  total: number;
  totalFormatted: string
  key: string;
  color: string;
}

interface Category {
  category: CategoryProps
}

export function CategoryCard({ category }: Category) {
  return (
    <Container color={category.color} >
      <Name>{category.name}</Name>
      <Amount>{category.totalFormatted}</Amount>
    </Container>
  )
}
