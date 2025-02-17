import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { AspectRatio, Box, Text } from 'theme-ui'
import { SxProp } from '../../../lib/sx'
import { FileProps } from '../types'
import { fetchRows } from './formats'
import { TruncatedData, printNumRows, truncate } from './utils'

const maxNumRows = 100
const maxCellLength = 100

export function TableViewer(props: FileProps & SxProp) {
  const { url, filename, sx, css, className } = props

  const [error, setError] = useState<string | undefined>(undefined)
  const [data, setData] = useState<TruncatedData | undefined>(undefined)

  useEffect(() => {
    fetchRows({ url, filename })
      .then(
        (rows) => truncate({ rows, maxNumRows, maxCellLength }),
      )
      .then(
        (data: TruncatedData) => {
          setData(data)
          setError(undefined)
        },
      )
      .catch(
        (error: unknown) => {
          console.error(error)
          setError(error instanceof Error ? error.toString() : 'Failed to load data.')
          setData(undefined)
        })
  }, [url, filename])

  if (!data) {
    return (
      <AspectRatio
        ratio={4 / 1}
        sx={{
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        }}
        css={css}
        className={className}
      >
        {!error && <Skeleton count={10} />}
        {error && <Text>{error}</Text>}
      </AspectRatio>
    )
  }

  return (
    <figure sx={{ margin: 0, ...sx }} css={css} className={className}>
      <Box
        sx={{
          overflow: 'auto',
          width: '100%',
          maxHeight: '500px',
          border: '1px solid',
          borderColor: 'text',
        }}
      >
        <table
          sx={{
            minWidth: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'mono',
            fontSize: '0.8rem',

            'th, td': {
              padding: '0.5rem',
            },
          }}
        >
          <thead
            sx={{
              borderColor: 'text',
              backgroundColor: 'text',
              color: 'background',
              top: 0,
              position: 'sticky',
            }}
          >
            <tr>
              {data.rows.columns.map((column, i) =>
                <th scope="col" key={`column-${i}`}>
                  {column}
                </th>,
              )}
            </tr>
          </thead>
          <tbody
            sx={{
              td: {
                border: '1px solid',
                borderColor: 'text',
              },
              'td:first-child': {
                borderLeft: 'none',
              },
              'td:last-child': {
                borderRight: 'none',
              },
              'tr:last-child td': {
                borderBottom: 'none',
              },
            }}
          >
            {data.rows.map((row, i) => {
              return (
                <tr key={`row-${i}`}>
                  {data.rows.columns.map((column, j) => {
                    return (
                      <td
                        sx={{
                          textAlign: 'left',
                        }}
                        key={`cell-${i}-${j}`}
                      >
                        {row[column]}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </Box>
      <figcaption
        sx={{
          margin: '1rem 0',
        }}
      >
        File <code>{filename}</code>. {data.rows.columns.length} columns.{' '}{
          data.rows.length && data.originalLength !== data.rows.length
            ? `Showing the first ${data.rows.length.toLocaleString(
              'en-US',
            )} of ${printNumRows(data.originalLength)}.` : `${printNumRows(data.rows.length)}.`
        }
      </figcaption>
    </figure>
  )
}
