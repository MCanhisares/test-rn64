import { useSafeAreaHeight } from '@common/layout/helpers/safe-area-height.hook'
import React from 'react'
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { Colors } from '@resources/Colors'

interface IScreenWrapperProps {
  style?: ViewStyle
  hasSafeArea?: boolean
  statusBarColor?: string
  safeAreaColor?: string
  paddingForStatusBar?: boolean
  barStyle?: 'default' | 'dark-content' | 'light-content'
}

const InnerView: React.FC<IScreenWrapperProps> = ({
  children,
  style,
  barStyle = 'dark-content',
  paddingForStatusBar = false,
}) => {
  const { heightTop } = useSafeAreaHeight()

  return (
    <>
      <StatusBar barStyle={barStyle} />
      <View
        style={[
          styles.wrapper,
          paddingForStatusBar && { flex: 1, paddingTop: heightTop },
          style,
        ]}
      >
        {children}
      </View>
    </>
  )
}

export const ScreenWrapper: React.FC<IScreenWrapperProps> = ({
  hasSafeArea = true,
  paddingForStatusBar = false,
  statusBarColor = Colors.GREY_B9,
  safeAreaColor = Colors.GREY_B9,
  ...rest
}) => {
  if (Platform.OS === 'ios') {
    return hasSafeArea ? (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: statusBarColor }} />
        <SafeAreaView
          style={[styles.safeArea, { backgroundColor: safeAreaColor }]}
        >
          <InnerView {...rest} />
        </SafeAreaView>
      </>
    ) : (
      <InnerView {...rest} />
    )
  }

  return <InnerView {...rest} paddingForStatusBar={paddingForStatusBar} />
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20,
  } as ViewStyle,
  safeArea: { flex: 1 } as ViewStyle,
})
