import { ScreenWrapper } from '@common/components/ScreenWrapper'
import { UserCard } from '@main/components/UserCard'
import { RootStackScreenProp } from '@main/navigation/stacks/RootStack'
import { RootScreens } from '@main/navigation/types'
import { SearchContext } from '@main/search/contexts/SearchContext'
import { SearchInput } from '@main/components/SearchInput'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { Colors } from '@resources/Colors'
import { useDebouncedSearch } from '@main/search/hooks/useDebouncedSearch'

export const HomeScreen: RootStackScreenProp<RootScreens.Home> = ({
  route,
}) => {
  const { loading, data, find } = SearchContext.useContainer()
  const { debouncedSearchFunction } = useDebouncedSearch(find)
  const [initialQuery, setInitialQuery] = useState<string | undefined>(
    undefined
  )
  useEffect(() => {
    if (initialQuery) {
      debouncedSearchFunction(initialQuery)
    }
  }, [initialQuery])

  const query = route.params && route.params.query
  if (
    query !== undefined &&
    query.length > 0 &&
    (initialQuery === undefined || initialQuery !== query)
  ) {
    setInitialQuery(route.params.query)
  }

  const onSubmitPressed = () => {
    Keyboard.dismiss()
  }

  const onTextChange = (text: string) => {
    debouncedSearchFunction(text)
  }

  if (loading) {
    return <ActivityIndicator style={styles.loading} animating={true} />
  }

  return (
    <ScreenWrapper style={styles.wrapper}>
      <SearchInput
        initialText={query}
        onSubmitPressed={onSubmitPressed}
        onTextChange={onTextChange}
      />

      <FlatList
        data={data}
        renderItem={data => {
          return <UserCard user={data.item} key={data.index} />
        }}
        onScroll={() => {
          Keyboard.dismiss()
        }}
        keyExtractor={item => item.email}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.GREY_B9,
  } as ViewStyle,
  wrapper: {
    backgroundColor: Colors.GREY_B9,
  } as ViewStyle,
  footer: { marginBottom: 20 } as ViewStyle,
  separator: {
    height: 20,
  } as ViewStyle,
})
