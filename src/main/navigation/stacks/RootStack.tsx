import React from 'react'
import { HomeScreen } from '@main/screens/Home'
import { StackScreenProps } from '@react-navigation/stack'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { RootScreens } from '../types'
import { SearchContext } from '@main/search/SearchContext'

type RootStackParamsList = {
  [RootScreens.Home]: undefined
}

export type RootStackScreenProp<
  Screen extends keyof RootStackParamsList
> = React.FC<StackScreenProps<RootStackParamsList, Screen>>

const Stack = createNativeStackNavigator<RootStackParamsList>()

export const RootStack: React.FC = () => {
  return (
    <SearchContext.Provider>
      <Stack.Navigator
        initialRouteName={RootScreens.Home}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={RootScreens.Home} component={HomeScreen} />
      </Stack.Navigator>
    </SearchContext.Provider>
  )
}
