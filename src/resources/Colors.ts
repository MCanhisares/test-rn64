export enum Colors {
  // GRAY SCALE
  BLACK = '#000000',
  GREY_B9 = '#b9b9b9',
  WHITE = '#FFFFFF',
  TRANSPARENT = 'transparent',
}

type ColorAlpha = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1

export const getColorWithTransparency = (
  color: Colors,
  alpha: ColorAlpha = 1
) => {
  const _opacity = Math.round(alpha * 255)
  return color + _opacity.toString(16).toUpperCase()
}
