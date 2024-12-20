import { BaseLayout, table } from '@source-cooperative/components'
import { Heading, Paragraph } from 'theme-ui'
import { sideNavLinks } from '../../../utils/constants'

export default function Text() {
  const { title, description, viewer: TableViewer } = table
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <TableViewer url='/components/data/prompts.csv' filename="prompts.csv" />
    </BaseLayout>
  )
}
