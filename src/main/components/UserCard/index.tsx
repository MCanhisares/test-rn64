import React, { useMemo } from 'react'
import { User } from '@main/search/types/user'
import { Image, StyleSheet, View, ViewStyle } from 'react-native'
import { Colors, getColorWithTransparency } from '@resources/Colors'
import { HighlightableText } from '../HighlightableText'
import { SearchContext } from '@main/search/SearchContext'

type UserCardProps = {
  user: User
}
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { searchQuery } = SearchContext.useContainer()

  return useMemo(() => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <HighlightableText
            textStyle={styles.titleTextStyle}
            text={user.name}
            highlightedText={searchQuery}
            highlightedTextStyle={styles.highlightedTextStyle}
          />
          <HighlightableText
            textStyle={styles.paragraphTextStyle}
            text={user.email}
            highlightedText={searchQuery}
            highlightedTextStyle={styles.highlightedTextStyle}
          />
          <HighlightableText
            textStyle={styles.paragraphTextStyle}
            text={user.title}
            highlightedText={searchQuery}
            highlightedTextStyle={styles.highlightedTextStyle}
          />
          <HighlightableText
            textStyle={styles.paragraphTextStyle}
            text={`${user.address}, ${user.city}`}
            highlightedText={searchQuery}
            highlightedTextStyle={styles.highlightedTextStyle}
          />
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: user.avatar,
              height: 68,
              width: 68,
            }}
          />
        </View>
      </View>
    )
  }, [searchQuery])
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    padding: 8,
    borderRadius: 8,
    shadowColor: getColorWithTransparency(Colors.BLACK, 0.1),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 12,
    shadowOpacity: 1,
  } as ViewStyle,
  textWrapper: {
    flexDirection: 'column',
    flex: 0.8,
  } as ViewStyle,
  imageWrapper: {
    flex: 0.2,
    flexDirection: 'row-reverse',
  } as ViewStyle,
  titleTextStyle: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 30,
  },
  paragraphTextStyle: {
    color: Colors.BLACK,
    fontSize: 13,
    lineHeight: 20,
  },
  highlightedTextStyle: {
    backgroundColor: 'yellow',
  },
})
