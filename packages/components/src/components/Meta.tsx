import Head from 'next/head'
import { useThemeUI } from 'theme-ui'

export default function Meta({ title, description, card }: { title?: string; description?: string; card?: string }) {
  const { colorMode } = useThemeUI()
  if (!description) {
    console.warn(
      'a custom description should be used for search engine optimization',
    )
  }
  if (!title) {
    console.warn(
      'a custom title should be used for search engine optimization',
    )
  }
  const titleProp = title ?? 'Source Cooperative'

  return (
    <Head>
      <title>{titleProp}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, maximum-scale=1"
      />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/img/ms-icon-144x144.png" />
      <meta
        name="color-scheme"
        content={colorMode === 'light' ? 'light' : 'dark'}
      />
      <meta property="og:title" content={titleProp} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={card} />
      <meta property="og:url" content="https://source.coop" />
      <meta name="twitter:title" content={titleProp} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={card} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  )
}
