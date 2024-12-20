import { BaseLayout, Link } from '@source-cooperative/components'
import { Heading } from 'theme-ui'
import { sideNavLinks } from '../../utils/constants'

export default function Viewers() {
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">Viewers</Heading>
      <ul>
        <li>
          <Link href="/viewers/markdown">Markdown</Link>
        </li>
        <li>
          <Link href="/viewers/map">Map</Link>
        </li>
        <li>
          <Link href="/viewers/text">Text</Link>
        </li>
        <li>
          <Link href="/viewers/table">Table</Link>
        </li>
      </ul>
    </BaseLayout>
  )
}
