import { FileProps, ViewerMetadata } from '../types'
import { TableViewer } from './viewer'

export const table: ViewerMetadata = {
  title: 'Table Viewer',
  description: 'A table viewer.',
  compatibilityCheck: (props: FileProps) => {
    return ['.csv', '.tsv'].some((key) => props.filename.toLowerCase().endsWith(key) )
  },
  viewer: TableViewer,
}
