import { BaseLayout, markdown } from '@source-cooperative/components'
import { Heading, Paragraph } from 'theme-ui'
import { sideNavLinks } from '../../../utils/constants'
// import { markdown } from './markdown'

export default function Map() {
  const { title, description, viewer: MarkdownViewer } = markdown
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <MarkdownViewer url='/components/data/overture.md' filename="overture.md" />
    </BaseLayout>
  )
}
