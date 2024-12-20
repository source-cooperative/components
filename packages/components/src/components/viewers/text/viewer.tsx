import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Box, Paragraph } from 'theme-ui'
import { default as CodeBlock } from '../../CodeBlock'
import { FileProps } from '../types'

export function TextViewer(props: FileProps) {
  const { url } = props

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
      <CodeBlock copyButton={false}>
        <Skeleton count={10} />
      </CodeBlock>
    )
  }

  return (
    <Box>
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
