import { FileProps, ViewerMetadata } from '../types'

const text: ViewerMetadata = {
  title: 'Text Viewer',
  description: 'A text viewer.',
  compatibilityCheck: (props: FileProps) => {
    return ['.md', '.mdx', '.txt', '.csv', '.tsv'].some((key) => props.filename.toLowerCase().endsWith(key) )
  },
}

export default text
