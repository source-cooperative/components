import { BaseLayout, map } from '@source-cooperative/components'
import { Heading, Paragraph } from 'theme-ui'
import { sideNavLinks } from '../../../utils/constants'

export default function Map() {
  const { title, description, viewer: MapViewer } = map
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <MapViewer url='/components/data/polygon-samples.geojson' filename="polygon-samples.geojson" />
    </BaseLayout>
  )
}
