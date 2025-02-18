import BaseLayout from '@source-cooperative/components/BaseLayout.js'
import metadata from '@source-cooperative/components/map/metadata.js'
import MapViewer from '@source-cooperative/components/map/viewer.js'
import { Heading, Paragraph } from 'theme-ui'
import { sideNavLinks } from '../../../utils/constants'

export default function Map() {
  const { title, description } = metadata
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <article>
        <Heading as="h2">GeoJSON</Heading>
        <MapViewer url='/components/data/polygon-samples.geojson' filename="polygon-samples.geojson" />
      </article>
      <article>
        <Heading as="h2">PMTiles</Heading>
        <MapViewer url='/components/data/hmb.pmtiles' filename="hmb.pmtiles" />
      </article>
    </BaseLayout>
  )
}
