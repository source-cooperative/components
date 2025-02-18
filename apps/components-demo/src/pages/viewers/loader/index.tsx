import BaseLayout from '@source-cooperative/components/BaseLayout.js'
import ViewerLoader from '@source-cooperative/components/ViewerLoader.js'
import { ViewerId } from '@source-cooperative/components/viewers.js'
import { useState } from 'react'
import { Divider, Heading, Paragraph, Select } from 'theme-ui'
import { sideNavLinks } from '../../../utils/constants'

const files = ['overture.md', 'prompts.csv', 'polygon-samples.geojson']
export default function Loader() {
  const [file, setFile] = useState<string | undefined>(files[0])
  const [viewerId, setViewerId] = useState<ViewerId | undefined>(undefined)
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">Viewer loader</Heading>
      <Paragraph>The ViewerLoader component proposes viewers based on the file extension.</Paragraph>
      <Select onChange={e => {
        setFile(e.target.value)
        setViewerId(undefined)
      }} value={file}>
        {files.map(f => <option key={f} value={f}>{f}</option> )}
      </Select>
      <Divider />
      <ViewerLoader
        url={`/components/data/${file}`}
        viewerId={viewerId}
        onViewerSelected={setViewerId}
      ></ViewerLoader>
    </BaseLayout>
  )
}
