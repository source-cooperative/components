import NextLink from 'next/link'
import { ReactNode } from 'react'
import { Link as ThemeLink } from 'theme-ui'

type LinkProps = {
  children: ReactNode;
  variant?: string;
} & ({
  href: string;
} | {
  onClick: () => void;
})
export default function Link(props: LinkProps) {
  if ('onClick' in props) {
    return (
      <ThemeLink
        onClick={props.onClick}
        sx={{ variant: `links.${props.variant ?? 'default'}` }}
      >
        {props.children}
      </ThemeLink>
    )
  }

  return (
    <NextLink
      href={props.href}
      sx={{ variant: props.variant ? `links.${props.variant}` : 'links' }}
    >
      {props.children}
    </NextLink>
  )
}
