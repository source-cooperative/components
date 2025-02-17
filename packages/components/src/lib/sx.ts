import { ThemeUICSSObject } from 'theme-ui'

export interface SxProp {
  sx?: ThemeUICSSObject
  css?: string
  className?: string
}

/*
 * Merge class names passed as arguments
 */
export function cn(...classNames: (string | undefined)[]): string {
  return classNames.filter(d => d !== undefined).join(' ')
}
