import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Box, Paragraph } from 'theme-ui'
import { SxProp } from '../../../lib/sx'
import { default as CodeBlock } from '../../CodeBlock'
import { FileProps } from '../types'

export function TextViewer(props: FileProps & SxProp) {
  const { url, sx, css, className } = props

  const [content, setContent] = useState<string | undefined>(undefined)

  async function fetchText(url: string) {
    const response = await fetch(url)
    if (!response.ok) {
	  setContent(`Error: ${response.status} ${response.statusText}`)
	  return
    }
    const text = await response.text()
    setContent(text)
  }
  useEffect(() => {
    fetchText(url).catch((error: unknown) => {
      setContent(`Error: ${error}`)
    })
  }, [url])

  if (!content) {
    return (
      <CodeBlock copyButton={false} sx={sx} css={css} className={className}>
        <Skeleton count={10} />
      </CodeBlock>
    )
  }

  return (
    <Box sx={sx} css={css} className={className}>
      <CodeBlock copyButton={true}>
        {content.split('\n').map((line, i) => {
          return (
            <Paragraph
              key={`line-${i}`}
              sx={{ fontFamily: 'mono', fontSize: 0 }}
            >
              {line}
            </Paragraph>
          )
        })}
      </CodeBlock>
    </Box>
  )
}
