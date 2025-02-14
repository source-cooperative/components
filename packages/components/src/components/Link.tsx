import Link from 'next/link'
import { ReactNode } from 'react'
import { Link as ThemeLink } from 'theme-ui'

interface CommonProps {
  children: ReactNode;
  variant?: string;
}

interface HrefProps extends CommonProps {
  href: string;
}
function HrefLink(props: HrefProps) {
  return <Link passHref legacyBehavior href={props.href}>
    <ThemeLink variant={props.variant ?? 'link'} {...props} />
  </Link>
}

interface OnClickProps extends CommonProps {
  onClick?: () => void;
}
type LinkProps = OnClickProps | HrefProps;
export default function SourceLink(props: LinkProps) {
  return 'href' in props ? <HrefLink {...props} /> : <ThemeLink {...props} />
}
