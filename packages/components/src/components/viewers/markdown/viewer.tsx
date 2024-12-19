import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { FileProps } from '../types'
import { Content, generateContent } from './mdx'

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    return `Error: ${response.status} ${response.statusText}`
  }
  return response.text()
}

export function MarkdownViewer(props: FileProps) {
  const { url } = props

  const [error, setError] = useState<string | undefined>(undefined)
  const [content, setContent] = useState<Content | undefined>(undefined)

  useEffect(() => {
    async function fetchAndCreate() {
      const text = await fetchText(url)
      const content = await generateContent(text)
      setContent(content)
    }
    fetchAndCreate().catch((error: unknown) => { setError(`${error}`) })
  }, [url])

  if (error) {
    return <p>Error: {error}</p>
  }
  if (!content) {
    return <Skeleton count={10} />
  }
  return content()
}
