import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'
import { Link as ThemeLink } from 'theme-ui'

export interface LinkProps {
  children?: ReactNode
  variant?: string
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

function HrefLink(props: LinkProps & { href: string }) {
  return <Link passHref legacyBehavior href={props.href}>
    <ThemeLink variant={props.variant ?? 'link'} {...props} />
  </Link>
}

export default function SourceLink(props: LinkProps) {
  return 'href' in props && props.href ?
    <HrefLink {...props} href={props.href} /> :
    <ThemeLink {...props} />
}
