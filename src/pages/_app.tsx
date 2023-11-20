import "../styles/globals.css";
import theme from '@source-cooperative/theme'
import type { AppProps } from "next/app";
import { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

import { SourceProvider, components as SourceComponents } from "../lib/provider";

export default function App({ Component, pageProps }: AppProps) {
    return (
    <SourceProvider theme={theme} components={SourceComponents}>
      <SkeletonTheme baseColor="var(--theme-ui-colors-muted)" highlightColor="var(--theme-ui-colors-highlight)" borderRadius={0}>
        <Component {...pageProps} />
      </SkeletonTheme>
    </SourceProvider>
  );
}
