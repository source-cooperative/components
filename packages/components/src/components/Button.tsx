import Link from 'next/link'
import React, { forwardRef } from 'react'
import { Box, Button as ThemeButton } from 'theme-ui'

interface ButtonProps {
	children: React.ReactNode;
	suffix?: React.ReactNode;
	href?: string;
	disabled?: boolean;
	variant?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const { children, suffix, href, disabled, variant, onClick } = props
  if (href) {
    return (
      <Box>
        <Link href={href}>
          <ThemeButton
            ref={ref}
            variant={variant ? variant : 'primary'}
            disabled={disabled}
          >
            <>
              {children}
              {suffix ? suffix : <></>}
            </>
          </ThemeButton>
        </Link>
      </Box>
    )
  } else {
    return (
      <ThemeButton
        ref={ref}
        onClick={onClick}
        variant={variant ? variant : 'primary'}
        disabled={disabled}
      >
        <>{children}</>
      </ThemeButton>
    )
  }
}

export default forwardRef(Button)
