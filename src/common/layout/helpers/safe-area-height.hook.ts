import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const useSafeAreaHeight = () => {
  const insets = useSafeAreaInsets()

  return {
    heightTop: insets.top,
    heightLeft: insets.left,
    heightRight: insets.right,
    heightBottom: insets.bottom,
  }
}
