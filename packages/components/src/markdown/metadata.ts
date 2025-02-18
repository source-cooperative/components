import { FileProps, ViewerMetadata } from '../types'

const markdown: ViewerMetadata = {
  title: 'Markdown Viewer',
  description: 'A markdown viewer.',
  compatibilityCheck: (props: FileProps) => {
    return ['.md', '.mdx'].some((key) => props.filename.toLowerCase().endsWith(key) )
  },
}

export default markdown
