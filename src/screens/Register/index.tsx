import React, { useState } from 'react';
import uuid from 'react-native-uuid'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { SelectCategory } from '../SelectCategory'
import { Header } from '../../components/Header';
import { Button } from '../../components/Form/Button';
import { SelectButton } from '../../components/Form/SelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Container, Form, Fields, TransactionTypes } from './styles';
import { InputForm } from '../../components/Form/InputForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { categories } from '../../utils/categories';
import { useAuth } from '../../hooks/useAuth';


const schema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  amount: yup.number().typeError('Apenas números').positive("O valor deve ser positivo").required("Valor obrigatório"),
});

export function Register() {
  const { user } = useAuth()
  const [transactionType, setTransactionType] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: 'chevron-down'
  })
  const storageKey = `@gofinances:transactions_user:${user.id}`
  const navigation = useNavigation()

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function handleOpenModal() {
    setModalIsOpen(true)
  }
  function handleCloseModal() {
    setModalIsOpen(false)
  }


  function handleSelectTransactionType(type: 'income' | 'outcome') {
    if (transactionType === type) {
      setTransactionType('')
      return;
    }
    setTransactionType(type)
  }
  async function handleRegister(form: any) {

    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const transaction = {
      id: uuid.v4(),
      title: form.name,
      amount: form.amount,
      category: categories.find(categoryData => categoryData.name === category.name),
      type: transactionType,
      date: new Date()
    }

    try {
      const hasTransaction = await AsyncStorage.getItem(storageKey)

      const data = hasTransaction ? JSON.parse(hasTransaction) : []

      const newTransaction = [...data, transaction]

      await AsyncStorage.setItem(storageKey, JSON.stringify(newTransaction))

      setCategory({
        key: 'category',
        name: 'Categoria',
        icon: 'chevron-down'
      })
      setTransactionType('')
      reset()
      navigation.navigate('Listagem')

    } catch (e) {
      Alert.alert('Erro ao cadastrar uma transação, tente novamente!')

    }

  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <Container>
        <Header title="Cadastro" />
        <Form>
          <Fields>

            <InputForm
              error={errors.name && errors.name.message}
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="words"
              autoCorrect={false}
            />

            <InputForm
              keyboardType="numbers-and-punctuation"
              error={errors.amount && errors.amount.message}
              name="amount"
              control={control}
              placeholder="Preço"
            />
            <TransactionTypes>
              <TransactionTypeButton onPress={() => handleSelectTransactionType('income')} title="Income" type="income" isActive={transactionType === 'income'} />
              <TransactionTypeButton onPress={() => handleSelectTransactionType('outcome')} title="Outcome" type="outcome" isActive={transactionType === 'outcome'} />
            </TransactionTypes>
            <SelectButton category={category} onPress={handleOpenModal} />
          </Fields>
          <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
        </Form>
        <Modal visible={modalIsOpen}>
          <SelectCategory currentCategoryKey={category.key} onSetCategory={setCategory} onCloseModal={handleCloseModal} />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>

  )
}