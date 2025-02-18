import BaseLayout from '@source-cooperative/components/BaseLayout.js'
import metadata from '@source-cooperative/components/text/metadata.js'
import TextViewer from '@source-cooperative/components/text/viewer.js'
import { Heading, Paragraph } from 'theme-ui'
import { sideNavLinks } from '../../../utils/constants'

export default function Text() {
  const { title, description } = metadata
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <TextViewer url='/components/data/overture.md' filename="overture.md" />
    </BaseLayout>
  )
}
