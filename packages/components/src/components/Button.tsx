import Link from 'next/link'
import { MouseEventHandler, ReactNode, Ref, forwardRef } from 'react'
import { Box, Button as ThemeButton } from 'theme-ui'
import type { UrlObject } from 'url'
type Url = string | UrlObject;

interface CommonProps {
	children: ReactNode;
	disabled?: boolean;
	variant?: string;
}

interface ButtonProps extends CommonProps {
	onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button = forwardRef(function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const { children, disabled, variant, onClick } = props
  return <ThemeButton ref={ref} onClick={onClick} variant={variant ?? 'primary'} disabled={disabled}>
    {children}
  </ThemeButton>
})

interface LinkButtonProps extends CommonProps {
  href: Url;
}
const LinkButton = forwardRef(function LinkButton(props: LinkButtonProps, ref: Ref<HTMLButtonElement>) {
  const { children, href, disabled, variant } = props
  return <Box>
    <Link href={href}>
      <Button ref={ref} variant={variant} disabled={disabled}>
        {children}
      </Button>
    </Link>
  </Box>
})

type SourceButtonProps = ButtonProps | LinkButtonProps
export default forwardRef(function SourceButton(props: SourceButtonProps, ref: Ref<HTMLButtonElement>) {
  return 'href' in props && props.href ?
    <LinkButton {...props} ref={ref} /> :
    <Button {...props} ref={ref} />
})
