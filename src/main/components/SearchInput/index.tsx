import React, { useRef, RefObject } from 'react'
import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native'
import { Icons } from '@resources/Icons'
import { Colors, getColorWithTransparency } from '@resources/Colors'

interface ISearchInputProps {
  style?: StyleProp<ViewStyle>
  initialText?: string
  onTextChange: (text: string) => void
  onSubmitPressed: () => void
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export const SearchInput: React.FC<ISearchInputProps> = ({
  style,
  initialText,
  onTextChange,
  onSubmitPressed,
}) => {
  const searchInputRef: RefObject<TextInput> = useRef(null)

  const handleAnimatedPress = () => {
    searchInputRef.current?.focus()
  }

  return (
    <AnimatedTouchable
      onPress={handleAnimatedPress}
      activeOpacity={1}
      style={[styles.wrapper, style]}
    >
      <View style={styles.inputWrapper}>
        <View style={{ paddingRight: 18 }}>
          <Icons.Search width={16} height={16} fill={Colors.GREY_B9} />
        </View>

        <TextInput
          ref={searchInputRef}
          underlineColorAndroid={Colors.TRANSPARENT}
          onChange={args => onTextChange(args.nativeEvent.text)}
          placeholder="Search"
          defaultValue={initialText}
          placeholderTextColor={Colors.BLACK}
          style={[styles.text, styles.alignTextLeft]}
          onSubmitEditing={() => onSubmitPressed()}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>
    </AnimatedTouchable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 30,
    borderRadius: 4,
    shadowColor: getColorWithTransparency(Colors.BLACK, 0.1),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 12,
    shadowOpacity: 1,
    backgroundColor: Colors.WHITE,
  } as ViewStyle,
  rightButtonWrapper: { marginRight: 8 } as ViewStyle,
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  } as ViewStyle,
  text: {
    color: Colors.BLACK,
    padding: 0,
    fontSize: 14,
    lineHeight: 16,
  } as TextStyle,
  alignTextLeft: { textAlign: 'left' } as TextStyle,
  selectedText: { flex: 1 } as TextStyle,
})
