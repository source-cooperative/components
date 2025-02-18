import BaseLayout from '@source-cooperative/components/BaseLayout.js'
import metadata from '@source-cooperative/components/table/metadata.js'
import TableViewer from '@source-cooperative/components/table/viewer.js'
import { Heading, Paragraph } from 'theme-ui'
import { sideNavLinks } from '../../../utils/constants'

export default function Text() {
  const { title, description } = metadata
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <TableViewer url='/components/data/prompts.csv' filename="prompts.csv" />
    </BaseLayout>
  )
}
