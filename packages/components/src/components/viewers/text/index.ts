import { FileProps, ViewerMetadata } from '../types'
import { TextViewer } from './viewer'

export const text: ViewerMetadata = {
  title: 'Text Viewer',
  description: 'A text viewer.',
  compatibilityCheck: (props: FileProps) => {
    return ['.md', '.mdx', '.txt'].some((key) => props.filename.toLowerCase().endsWith(key) )
  },
  viewer: TextViewer,
}
