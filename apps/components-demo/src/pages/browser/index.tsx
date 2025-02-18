import BaseLayout from '@source-cooperative/components/BaseLayout.js'
import Browser from '@source-cooperative/components/Browser.js'
import { Box, Heading } from 'theme-ui'
import { sideNavLinks } from '../../utils/constants'

export default function BrowserPage() {
  const loadedData = {
    prev: true,
    next: '/browser?page=2',
    breadcrumbs: [
      {
        name: 'home',
        href: '/',
      },
      {
        name: 'folder',
        href: '/browser',
      },
    ],
    items: [
      {
        name: 'FooBar',
        size: undefined,
        href: '/',
      },
      {
        name: 'README.md',
        size: 1234,
        href: '/',
      },
    ],
  }

  const loadingData = {
    prev: false,
    next: undefined,
    breadcrumbs: [],
    items: [],
  }

  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">Browser</Heading>

      <Heading as="h2">Loading</Heading>
      <Box>
        <Browser
          prev={loadingData.prev}
          next={loadingData.next}
          breadcrumbs={loadingData.breadcrumbs}
          items={loadingData.items}
        />
      </Box>

      <Heading as="h2">Loaded</Heading>
      <Box>
        <Browser
          prev={loadedData.prev}
          next={loadedData.next}
          breadcrumbs={loadedData.breadcrumbs}
          items={loadedData.items}
        />
      </Box>
    </BaseLayout>
  )
}
