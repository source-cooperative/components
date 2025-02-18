import { transparentize } from '@theme-ui/color'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Box, Card, Text } from 'theme-ui'
import { SxProp } from './sx'

type TagProps={
	children: ReactNode;
	color: string;
	href?: string;
} & SxProp

export default function Tag(props: TagProps) {
  const { children, color, href, sx, css, className } = props
  if (href) {
    return (
      <Box sx={{ display: 'inline-block', ...sx }} css={css} className={className}>
        <Link href={href}>
          <Card
            variant="tag"
            sx={{
              color: color,
              backgroundColor: transparentize(color, 0.7),
              '&:hover': {
                backgroundColor: transparentize(color, 0.4),
              },
            }}
          >
            <Text variant="tag">{children}</Text>
          </Card>
        </Link>
      </Box>
    )
  }

  return (
    <Card
      variant="tag"
      sx={{
        color: color,
        backgroundColor: transparentize(color, 0.7),
        cursor: 'default',
        display: 'inline',
        ...sx,
      }}
      css={css}
      className={className}
    >
      <Text variant="tag">{children}</Text>
    </Card>
  )
}
