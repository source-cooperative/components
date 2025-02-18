import BaseLayout from '@source-cooperative/components/components/BaseLayout.js'
import { text } from '@source-cooperative/components/components/viewers/text/index.js'
import { Heading, Paragraph } from 'theme-ui'
import { sideNavLinks } from '../../../utils/constants'

export default function Text() {
  const { title, description, viewer: TextViewer } = text
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <TextViewer url='/components/data/overture.md' filename="overture.md" />
    </BaseLayout>
  )
}
