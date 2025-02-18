import { FileProps, ViewerMetadata } from '../types'

const table: ViewerMetadata = {
  title: 'Table Viewer',
  description: 'A table viewer.',
  compatibilityCheck: (props: FileProps) => {
    return ['.csv', '.tsv'].some((key) => props.filename.toLowerCase().endsWith(key) )
  },
}

export default table
