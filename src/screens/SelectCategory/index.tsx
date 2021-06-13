import React from 'react'
import { Header } from '../../components/Header'
import { Container, Categories, Category, Icon, Name, Divider, Footer } from './styles'
import { categories } from '../../utils/categories'
import { Button } from '../../components/Form/Button'

interface Category {
  key: string;
  name: string;
  icon: string;
}

interface SelectCategoryProps {
  onCloseModal: () => void;
  onSetCategory: (category: Category) => void
  currentCategoryKey: string;
}

export function SelectCategory({ onCloseModal, onSetCategory, currentCategoryKey }: SelectCategoryProps) {
  return (
    <Container>
      <Header title="Categorias" />
      <Categories
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category isActive={item.key === currentCategoryKey} onPress={() => onSetCategory(item)}>
            <Icon color={item.color} name={item.icon} />
            <Name >{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
      <Footer>
        <Button onPress={onCloseModal} title="Selecionar" />

      </Footer>
    </Container>
  )
}