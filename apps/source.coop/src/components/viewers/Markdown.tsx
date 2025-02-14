/** @jsxImportSource theme-ui */

import { mdxOptions } from '@/lib/md'
import { evaluate } from '@mdx-js/mdx'
import { SourceComponents } from '@source-cooperative/components'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import * as runtime from 'react/jsx-runtime'
import { Box, Grid, Text } from 'theme-ui'

export function Markdown({ url }) {
  const [mdxModule, setMdxModule] = useState(null)
  const Content = mdxModule ? mdxModule.default : <></>
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!url) {
      return
    }
    fetch(url).then((res) => {
      if (res.ok) {
        res.text().then((text) => {
          evaluate(text, {
            ...runtime,
            useMDXComponents: SourceComponents,
            ...mdxOptions,
          } as any).then((module) => {
            setMdxModule(module)
          })
        })
      } else {
        setNotFound(true)
      }
    })
  }, [url])

  if (notFound) {
    return (
      <Box>
        <Text variant="formTitle">README</Text>
        <Grid variant="form">
          <Box variant="cards.componentMessage">
            <Text>
              This Repository Does Not Contain a README. If you are the owner of
              this repository, follow the instructions{' '}
              <Link
                href={
                  'https://github.com/radiantearth/source-cooperative/wiki/Repositories#readme-markdown-files'
                }
              >
                here
              </Link>{' '}
              to create a README.md
            </Text>
          </Box>
        </Grid>
      </Box>
    )
  }

  if (mdxModule) {
    return (
      <Box sx={{
        width: '100%',
        '& img': { // Target all images within the markdown
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        },
      }}>
        <Content />
      </Box>
    )
  }

  return (
    <Box>
      <Skeleton count={10} />
    </Box>
  )
}
