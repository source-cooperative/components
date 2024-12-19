import { FileProps, ViewerMetadata } from '../types'
import { TextViewer } from './viewer'

export const text: ViewerMetadata = {
  title: 'Text Viewer',
  description: 'A text viewer.',
  compatibilityCheck: (props: FileProps) => {
    if (props.filename.toLowerCase().endsWith('.md')) {
      return true
    }

    if (props.filename.toLowerCase().endsWith('.txt')) {
      return true
    }
    return false
  },
  viewer: TextViewer,
}
