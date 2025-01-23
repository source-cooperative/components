import { BaseLayout, ViewerId, ViewerLoader } from '@source-cooperative/components'
import { useState } from 'react'
import { Heading, Paragraph } from 'theme-ui'
import { sideNavLinks } from '../../../utils/constants'

export default function Loader() {
  const [viewerId, setViewerId] = useState<ViewerId | undefined>(undefined)
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">Viewer loader</Heading>
      <Paragraph>The ViewerLoader component proposes viewers based on the file extension.</Paragraph>
      <ViewerLoader
        url="/components/data/overture.md"
        viewerId={viewerId}
        onViewerSelected={setViewerId}
      ></ViewerLoader>
    </BaseLayout>
  )
}
