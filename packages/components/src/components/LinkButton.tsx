import Link from 'next/link'
import { ReactNode, Ref, forwardRef } from 'react'
import { Box, Button } from 'theme-ui'

interface ButtonProps {
	children: ReactNode;
	href: string;
	disabled?: boolean;
	variant?: string;
}

function LinkButton(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const { children, href, disabled, variant } = props
  return <Box>
    <Link href={href}>
      <Button
        ref={ref}
        variant={variant ?? 'primary'}
        disabled={disabled}
      >
        {children}
      </Button>
    </Link>
  </Box>
}

export default forwardRef(LinkButton)
