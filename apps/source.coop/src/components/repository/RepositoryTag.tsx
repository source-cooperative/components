import { Link } from '@source-cooperative/components'
import { transparentize } from '@theme-ui/color'
import { Card, Text } from 'theme-ui'

const badgeColors = [
  {
    tags: ['Unlisted'],
    color: 'yellow',
    disabled: true,
  },
  {
    tags: ['Private'],
    color: 'orange',
    disabled: true,
  },
  {
    tags: ['Disabled'],
    color: 'red',
    disabled: true,
  },
  {
    tags: ['Featured'],
    color: 'green',
    disabled: true,
  },
]

export default function RepositoryTag({ tag }: { tag: any }) {
  let color = 'primary'
  let link = true
  for (const badge of badgeColors) {
    if (badge.tags.includes(tag)) {
      color = badge.color
      if (badge.disabled) {
        link = false
      }
      break
    }

  }

  if (link) {
    return (
      <Link variant="tag" href={'/repositories?tags=' + tag}>
        <Card variant="tag" sx={{
          color: color,
          backgroundColor: transparentize(color, 0.7),
          '&:hover': {
            backgroundColor: transparentize(color, 0.4),
          } }}>
          <Text variant="tag">{tag}</Text>
        </Card>
      </Link>
    )
  } else {
    return (
      <Card variant="tag" sx={{
        color: color,
        backgroundColor: transparentize(color, 0.7),
        cursor: 'default',
        display: 'inline',
        ml: 2,
      }}>
        <Text variant="tag">{tag}</Text>
      </Card>
    )
  }

}
