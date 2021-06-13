import 'styled-components'
import theme from './theme'

declare module 'styled-components'{
  type TypeTheme = typeof theme

  export interface DefaultTheme extends TypeTheme {}
}