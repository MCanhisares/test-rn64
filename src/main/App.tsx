import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import React, { useRef } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'

import { RootStack } from '@main/navigation/stacks/RootStack'
import { Colors } from '@resources/Colors'
enableScreens()

const App = () => {
  const navigationRef = useRef<NavigationContainerRef>(null)

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          translucent={true}
          backgroundColor={Colors.TRANSPARENT}
          barStyle="dark-content"
        />
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
