import { BaseLayout, Link } from '@source-cooperative/components'
import { Heading, Paragraph } from 'theme-ui'
import { sideNavLinks } from '../../utils/constants'

export default function Viewers() {
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">Viewers</Heading>
      <Paragraph>Choose a viewer:</Paragraph>
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
      <Paragraph>See also the viewer loader, that propose viewers based on the file extension: <Link href="/viewers/loader">Viewer Loader</Link></Paragraph>
    </BaseLayout>
  )
}
