import { FileProps, ViewerMetadata } from '../types'
import { MarkdownViewer } from './viewer'

export const markdown: ViewerMetadata = {
  title: 'Markdown Viewer',
  description: 'A markdown viewer.',
  compatibilityCheck: (props: FileProps) => {
    if (props.filename.toLowerCase().endsWith('.md')) {
      return true
    }
    return false
  },
  viewer: MarkdownViewer,
}
