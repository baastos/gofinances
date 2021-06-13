import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Hightlight } from '../../components/Highlight';
import { TransactionCard, TransactionProps } from '../../components/TransactionCard';
import { dateFormat, numberFormat } from '../../utils/formatHelper';
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  Greetings,
  GreetingsText,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
}
  from "./styles";
import { useAuth } from '../../hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';
import theme from '../../global/styles/theme';



export function Dashboard() {
  const { user, logout, userStorageLoading } = useAuth()
  const storageKey = `@gofinances:transactions_user:${user.id}`

  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  async function loadTransactions() {
    const hasTransactions = await AsyncStorage.getItem(storageKey)
    if (hasTransactions) {
      const response: TransactionProps[] = JSON.parse(hasTransactions)
      const formattedTransactions = response.map(tran => {
        return {
          ...tran,
          formattedAmount: numberFormat(tran.amount),
          formattedDate: dateFormat(new Date(tran.date), false)
        }
      })
      return setTransactions(formattedTransactions)
    }
    setTransactions([])
  }

  function getLastDateByType(transactions: TransactionProps[], type: string): string | null {
    const allDatesIncome = transactions.filter(transaction => transaction.type === type).map(transaction => new Date(transaction.date).getTime())
    const lastDateIncome = Math.max(...allDatesIncome)
    return String(lastDateIncome) === '-Infinity' ? null : `Última entrada ${dateFormat(new Date(lastDateIncome), true)}`
  }
  function getRangeTransactionDates(transactions: TransactionProps[]): string | null {
    const allDates = transactions.filter(transaction => transaction.date).map(transaction => new Date(transaction.date).getTime())
    const firstTransactionDate = new Date(Math.min(...allDates))
    const lastTransactionDate = dateFormat(new Date(Math.max(...allDates)), true)
    const formattedFirstTransactionDay = `${firstTransactionDate.toLocaleString('pt-BR', { day: 'numeric' })}`

    return String(firstTransactionDate) === 'Invalid Date' ? null : `${formattedFirstTransactionDay} à ${lastTransactionDate}`
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => { loadTransactions() }, []))

  const hightLightCard = useMemo(() => {
    const values = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.outcome += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc
    }, {
      income: 0,
      outcome: 0,
      total: 0
    })
    const formattedlastDateIncome = getLastDateByType(transactions, 'income')
    const formattedlastDateOutcome = getLastDateByType(transactions, 'outcome')
    const formattedFirstLastDateTransactions = getRangeTransactionDates(transactions)

    const hightLightData = {
      income: numberFormat(values.income),
      outcome: numberFormat(values.outcome),
      total: values.total,
      totalFormatted: numberFormat(values.total),
      formattedlastDateIncome,
      formattedlastDateOutcome,
      formattedFirstLastDateTransactions
    }

    return hightLightData
  }, [transactions.length])


  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: user.photo }} />
            <Greetings>
              <GreetingsText>Olá,</GreetingsText>
              <UserName>{user.name}</UserName>
            </Greetings>
          </UserInfo>
          <LogoutButton onPress={logout}>

            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <Hightlight
          title="Entradas"
          type="income"
          money={hightLightCard.income}
          description={hightLightCard.formattedlastDateIncome}
        />

        <Hightlight
          title="Saídas"
          type="outcome"
          money={hightLightCard.outcome}
          description={hightLightCard.formattedlastDateOutcome}
        />

        <Hightlight
          title="Total"
          type="total"
          money={hightLightCard.totalFormatted}
          description={hightLightCard.formattedFirstLastDateTransactions}
          isFucked={hightLightCard.total < 0}
        />

      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionCard data={item} />
          )}

        />
      </Transactions>
    </Container>
  )
}