import { FileProps, ViewerMetadata } from '../types'
import { MarkdownViewer } from './viewer'

export const markdown: ViewerMetadata = {
  title: 'Markdown Viewer',
  description: 'A markdown viewer.',
  compatibilityCheck: (props: FileProps) => {
    return ['.md', '.mdx'].some((key) => props.filename.toLowerCase().endsWith(key) )
  },
  viewer: MarkdownViewer,
}
