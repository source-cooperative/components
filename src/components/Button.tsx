import React, { forwardRef } from "react";
import { Box, Button as ThemeButton } from "theme-ui";
import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode;
    suffix?: React.ReactNode;
    href?: string;
    disabled?: boolean,
    variant?: string,
    onClick?: (e: any) => void;
}

const Button = (props: ButtonProps, ref) => {
    const { children, suffix, href, disabled, variant, onClick } = props;
    if (href) {
        return (
            <Box>
                <Link href={href}>
                    <ThemeButton ref={ref} variant={variant ? variant : "primary"} disabled={disabled}>
                        <>{children}{suffix ? suffix : <></>}</>
                    </ThemeButton>
                </Link>
            </Box>
        );
    } else {
        return (
            <ThemeButton ref={ref} onClick={onClick} variant={variant ? variant : "primary"} disabled={disabled}>
                <>{children}</>
            </ThemeButton>
    );
  }
};

export default forwardRef(Button);