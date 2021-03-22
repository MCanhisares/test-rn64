import { ScreenWrapper } from '@common/components/ScreenWrapper'
import { UserCard } from '@main/components/UserCard'
import { RootStackScreenProp } from '@main/navigation/stacks/RootStack'
import { RootScreens } from '@main/navigation/types'
import { SearchContext } from '@main/search/contexts/SearchContext'
import { SearchInput } from '@main/components/SearchInput'
import React from 'react'
import { FlatList, Keyboard, StyleSheet, View, ViewStyle } from 'react-native'
import { Colors } from '@resources/Colors'
import { useDebouncedSearch } from '@main/search/hooks/useDebouncedSearch'

export const HomeScreen: RootStackScreenProp<RootScreens.Home> = ({}) => {
  const { data, find } = SearchContext.useContainer()

  const { debouncedSearchFunction } = useDebouncedSearch(find)

  const onSubmitPressed = () => {
    Keyboard.dismiss()
  }

  const onTextChange = (text: string) => {
    debouncedSearchFunction(text)
  }

  return (
    <ScreenWrapper style={styles.wrapper}>
      <SearchInput
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
  wrapper: {
    backgroundColor: Colors.GREY_B9,
  },
  footer: { marginBottom: 20 } as ViewStyle,
  separator: {
    height: 20,
  } as ViewStyle,
})
