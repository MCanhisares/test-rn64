import { Platform, StatusBar } from 'react-native'

export const STATUS_BAR_HEIGHT_TO_WORRY_ABOUT = Platform.select({
  ios: 0,
  android: StatusBar.currentHeight,
})

export const RAW_APP_BAR_HEIGHT = 48
export const APP_BAR_HEIGHT =
  RAW_APP_BAR_HEIGHT + STATUS_BAR_HEIGHT_TO_WORRY_ABOUT
