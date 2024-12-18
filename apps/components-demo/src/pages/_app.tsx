import type { AppProps } from 'next/app'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/globals.css'
import { theme } from '../utils/theme'

import { SourceProvider } from '@source-cooperative/components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SourceProvider theme={theme}>
      <SkeletonTheme
        baseColor="var(--theme-ui-colors-muted)"
        highlightColor="var(--theme-ui-colors-highlight)"
        borderRadius={0}
      >
        <Component {...pageProps} />
      </SkeletonTheme>
    </SourceProvider>
  )
}
