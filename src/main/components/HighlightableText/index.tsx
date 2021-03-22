import { Text, TextStyle } from 'react-native'
import { findAll } from 'highlight-words-core'
import React from 'react'

type HighlightableTextProps = {
  text: string
  highlightedText?: string
  textStyle?: TextStyle
  highlightedTextStyle?: TextStyle
}
export const HighlightableText: React.FC<HighlightableTextProps> = ({
  text,
  highlightedText,
  textStyle,
  highlightedTextStyle,
}) => {
  const chunks = highlightedText
    ? findAll({
        searchWords: [highlightedText],
        textToHighlight: text,
      })
    : []
  return (
    <Text style={textStyle}>
      {chunks.length > 0
        ? chunks.map((chunk, index) => {
            const chunkText = text.substr(chunk.start, chunk.end - chunk.start)

            return !chunk.highlight ? (
              chunkText
            ) : (
              <Text key={index} style={chunk.highlight && highlightedTextStyle}>
                {chunkText}
              </Text>
            )
          })
        : text}
    </Text>
  )
}
