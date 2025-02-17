import { MDXModule } from 'mdx/types.js'
import { ReactNode, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Box } from 'theme-ui'
import { SourceComponents } from '../../../lib/provider'
import { SxProp } from '../../../lib/sx'
import { FileProps } from '../types'
import { generateContent } from './mdx'

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    return `Error: ${response.status} ${response.statusText}`
  }
  return response.text()
}

export function MarkdownViewer(props: FileProps & { errorChildren?: ReactNode } & SxProp) {
  const { url, errorChildren, sx, css, className } = props

  const [error, setError] = useState<string | undefined>(undefined)
  const [content, setContent] = useState<MDXModule | undefined>(undefined)
  // is useful only if the context exists (eg, using <SourceProvider> from lib/provider.ts around the app)
  const components = SourceComponents()

  useEffect(() => {
    async function fetchAndCreate() {
      const text = await fetchText(url)
      const content = await generateContent(text, components)
      setContent(content)
      setError(undefined)
    }
    fetchAndCreate().catch((error: unknown) => {
      setError(`${error}`)
      setContent(undefined)
    })
  }, [url, components])

  if (error) {
    return errorChildren ? <>{errorChildren}</> : <p>{error}</p>
  }
  return content ? <Box sx={{
    width: '100%',
    '& img': { // Target all images within the markdown
      maxWidth: '100%',
      height: 'auto',
      display: 'block',
      ...sx,
    },
  }} className={className} css={css}>
    <content.default />
  </Box> :
    <Box sx={sx} className={className} css={css}><Skeleton count={10} /></Box>
}
