import Link from 'next/link'
import { MouseEventHandler, ReactNode, Ref, forwardRef } from 'react'
import { Box, Button as ThemeButton } from 'theme-ui'
import type { UrlObject } from 'url'
import { SxProp } from './sx'

type Url = string | UrlObject;

type CommonProps = {
	children: ReactNode;
	disabled?: boolean;
	variant?: string;
} & SxProp

interface ButtonProps extends CommonProps {
	onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button = forwardRef(function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const { children, disabled, variant, onClick, sx, css, className } = props
  return <ThemeButton ref={ref} onClick={onClick} variant={variant ?? 'primary'} disabled={disabled} sx={sx} css={css} className={className}>
    { children }
  </ThemeButton>
})

interface LinkButtonProps extends CommonProps {
  href: Url;
}
const LinkButton = forwardRef(function LinkButton(props: LinkButtonProps, ref: Ref<HTMLButtonElement>) {
  const { children, href, disabled, variant, sx, css, className } = props
  return <Box sx={sx} css={css} className={className}>
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
