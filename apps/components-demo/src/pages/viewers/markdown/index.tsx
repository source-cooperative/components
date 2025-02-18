import BaseLayout from '@source-cooperative/components/BaseLayout.js'
import metadata from '@source-cooperative/components/markdown/metadata.js'
import MarkdownViewer from '@source-cooperative/components/markdown/viewer.js'
import { Heading, Paragraph } from 'theme-ui'
import { sideNavLinks } from '../../../utils/constants'
// import { markdown } from './markdown'

export default function Map() {
  const { title, description } = metadata
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <MarkdownViewer url='/components/data/overture.md' filename="overture.md" />
    </BaseLayout>
  )
}
