import { SourceProvider } from '@source-cooperative/components/SourceThemeProvider.js'
import { theme } from '@source-cooperative/components/theme.js'
import type { AppProps } from 'next/app'
import { SkeletonTheme } from 'react-loading-skeleton'
import '../styles/globals.css' // TODO(SL): distribute in components package

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <SourceProvider theme={theme}>
        <SkeletonTheme
          baseColor="var(--theme-ui-colors-muted)"
          highlightColor="var(--theme-ui-colors-highlight)"
          borderRadius={0}
        >
          <Component {...pageProps} />
        </SkeletonTheme>
      </SourceProvider>
    </main>
  )
}
