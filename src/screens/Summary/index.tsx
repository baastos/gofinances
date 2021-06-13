import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { addMonths, subMonths, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CategoryCard } from '../../components/CategoryCard';
import { Header } from "../../components/Header";
import { TransactionProps } from '../../components/TransactionCard';
import { numberFormat } from '../../utils/formatHelper';
import { VictoryPie } from "victory-native";
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

import {
  Container,
  CategoriesList,
  ChartContainer,
  MonthSelect,
  MonthButtonSelect,
  MonthButtonIcon,
  Month,
  TextCat
} from "./styles";
import { useAuth } from '../../hooks/useAuth';



interface Category {
  name: string;
  total: number;
  key: string;
  color: string;
  percent: number;
  percentFormatted: string;
  totalFormatted: string

}

export function Summary() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  const STORAGE_KEY = `@gofinances:transactions_user:${user.id}`

  async function loadData() {
    const hasTransactions = await AsyncStorage.getItem(STORAGE_KEY)
    if (hasTransactions) {
      const response: TransactionProps[] = JSON.parse(hasTransactions)
      const outcomeTransactions = response.filter(outcomeTransaction => outcomeTransaction.type === 'outcome'
        && new Date(outcomeTransaction.date).getMonth() === selectedDate.getMonth()
        && new Date(outcomeTransaction.date).getFullYear() === selectedDate.getFullYear())
      const outcomeTransactionTotal = outcomeTransactions.reduce((acc: number, outcome: TransactionProps) => {
        return acc += outcome.amount
      }, 0)

      const transactionsCategories = outcomeTransactions.map(transaction => {
        return {
          name: transaction.category.name,
          key: transaction.category.key,
          color: transaction.category.color,
          total: transaction.amount,
          totalFormatted: numberFormat(transaction.amount),
          percent: (transaction.amount / outcomeTransactionTotal * 100),
          percentFormatted: `${(transaction.amount / outcomeTransactionTotal * 100).toFixed()}%`
        }
      })
      const keyCategories = transactionsCategories.map(transaction => transaction.key)

      const removedDuplicatedCategories = ([...new Set(keyCategories)])

      let allCategories: Category[] = []

      removedDuplicatedCategories.forEach(item => {
        transactionsCategories.find(category => category.key === item && allCategories.push(category))
      })

      let array: Category[] = []

      allCategories.forEach((item) => {
        let sumTotal = 0
        transactionsCategories.forEach(categoryData => {
          if (categoryData.key === item.key) {
            sumTotal += categoryData.total
          }
        })

        array.push({
          name: item.name,
          key: item.key,
          color: item.color,
          total: sumTotal,
          totalFormatted: numberFormat(sumTotal),
          percent: (sumTotal / outcomeTransactionTotal * 100),
          percentFormatted: `${(sumTotal / outcomeTransactionTotal * 100).toFixed()}%`
        })
      })
      setCategories(array)
    }
  }
  function handleSelectMonth(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))

    }
  }
  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const month = format(selectedDate, 'MMMM, yyyy', { locale: ptBR })
  const formattedMonth = capitalizeFirstLetter(month)


  useEffect(() => {
    loadData();

  }, [selectedDate])

  useFocusEffect(useCallback(() => { loadData() }, []))

  return (
    <Container>
      <Header title="Resumo por categoria" />

      <CategoriesList >
        <MonthSelect>
          <MonthButtonSelect onPress={() => handleSelectMonth('prev')}>
            <MonthButtonIcon name="chevron-left" />
          </MonthButtonSelect>

          <Month>{formattedMonth}</Month>

          <MonthButtonSelect onPress={() => handleSelectMonth('next')}>
            <MonthButtonIcon name="chevron-right" />
          </MonthButtonSelect>
        </MonthSelect>
        <ChartContainer>
          <VictoryPie
            data={categories}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape

              }
            }}
            colorScale={categories.map(category => category.color)}
            labelRadius={50}
            x="percentFormatted"
            y="total"
            scale={{}}
          />
        </ChartContainer>

        {categories.map(category => (
          <CategoryCard key={category.key} category={category} />

        ))}
      </CategoriesList >



    </Container >
  )
}