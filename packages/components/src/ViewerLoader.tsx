import { JSX, useCallback, useEffect, useState } from 'react'
import { Box, Grid, Heading, Text } from 'theme-ui'
import { default as Button } from './Button'
import MapViewer from './map/viewer'
import MarkdownViewer from './markdown/viewer'
import { SxProp } from './sx'
import TableViewer from './table/viewer'
import TextViewer from './text/viewer'
import { FileProps, ViewerMetadata } from './types'
import { ViewerId, viewers } from './viewers'

type Viewer = (props: FileProps & SxProp) => JSX.Element

// TODO(SL): dynamically import the viewers (or do it in viewers.ts?)
const viewerLU: Record<ViewerId, Viewer> = {
  map: MapViewer,
  markdown: MarkdownViewer,
  table: TableViewer,
  text: TextViewer,
}

type ViewerLoaderProps ={
  url: string;
  viewerId?: ViewerId;
  onViewerSelected?: (viewerId: ViewerId | undefined) => void;
} & SxProp

interface CompatibleViewer {
  id: ViewerId;
  metadata: ViewerMetadata;
}

interface State {
  fileProps: FileProps;
  compatibleViewers: CompatibleViewer[];
}

export default function ViewerLoader(props: ViewerLoaderProps) {
  const { url, viewerId, onViewerSelected, sx, css, className } = props
  const [state, setState] = useState<State | undefined>(undefined)

  const onClick = useCallback((id?: ViewerId) => {
    return () => {
      onViewerSelected?.(id)
    }
  }, [onViewerSelected])

  useEffect(() => {
    if (!url) {
      return
    }
    const fileProps: FileProps = {
      url: url,
      filename: url.split('/').pop() ?? url,
    }

    const compatibleViewers: CompatibleViewer[] = []
    for (const [viewerId, metadata] of Object.entries(viewers)) {
      const id = viewerId as ViewerId
      if (metadata.compatibilityCheck(fileProps)) {
        compatibleViewers.push({ id, metadata })
      }
    }

    setState({ fileProps, compatibleViewers })
  }, [url])

  if (!state) {
    return (
      <Box
        sx={{
          py: 2,
          justifyContent: 'center',
          display: 'flex', ...sx,
        }}
        css={css}
        className={className}
      >
        <Text
          sx={{
            fontFamily: 'mono',
            fontSize: 3,
          }}
        >Loading...</Text>
      </Box>
    )
  }

  const { fileProps, compatibleViewers } = state

  if (viewerId) {
    const viewer = { component: viewerLU[viewerId] }
    return (
      <Box sx={{ py: 2, ...sx }} css={css} className={className}>
        {
          <viewer.component
            url={fileProps.url}
            filename={fileProps.filename}
          />
        }
        <Box sx={{ py: 2 }}>
          <Button onClick={onClick()}>Change View</Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 2, ...sx }} css={css} className={className}>
      <Heading as="h2">Select a Viewer</Heading>
      <Grid sx={{ gridTemplateColumns: '1fr' }}>
        {compatibleViewers.length === 0 ?
          <Text>No compatible viewers found.</Text>
          :
          compatibleViewers.map((viewer, i) => {
            const { id, metadata } = viewer
            return <Button key={`viewer-${i}`} onClick={onClick(id)}>{metadata.title}</Button>
          })
        }
      </Grid>
    </Box>
  )
}
