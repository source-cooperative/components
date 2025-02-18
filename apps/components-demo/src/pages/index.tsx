import BaseLayout from '@source-cooperative/components/BaseLayout.js'
import Footer from '@source-cooperative/components/Footer.js'
import Link from '@source-cooperative/components/Link.js'
import SearchBar from '@source-cooperative/components/SearchBar.js'
import { Box, Heading } from 'theme-ui'
import { sideNavLinks } from '../utils/constants'

const FOOTER_LINKS = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: 'about',
    text: 'About',
  },
  {
    href: 'https://github.com/source-cooperative/viewers/',
    text: 'GitHub Repository',
  },
  {
    href: 'https://github.com/source-cooperative/viewers/issues/',
    text: 'Support',
  },
  {
    href: 'https://beta.source.coop',
    text: 'Source Cooperative',
  },
  {
    href: 'https://radiant.earth',
    text: 'Radiant Earth',
  },
]

export default function Home() {
  return (
    <BaseLayout
      sideNavLinks={sideNavLinks}
      topMenu={
        <Box sx={{ width: '100%' }}>
          <SearchBar />
        </Box>
      }
      footer={<Footer links={FOOTER_LINKS} text={['v1.0.0']} />}
    >
      <Heading as="h1">Components</Heading>
      <ul>
        <li>
          <Link href="/button">Button</Link>
        </li>
        <li>
          <Link href="/browser">Browser</Link>
        </li>
        <li>
          <Link href="/form">Form</Link>
        </li>
        <li>
          <Link href="/viewers">Viewers</Link>
        </li>
      </ul>
    </BaseLayout>
  )
}
