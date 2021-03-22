const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig()

  const maxWorkersConfig = process.env.CI && {
    maxWorkers: 2,
  }

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: [...assetExts.filter(ext => ext !== 'svg'), 'txt'],
      sourceExts: [...sourceExts, 'svg'],
    },
    ...maxWorkersConfig,
  }
})()
