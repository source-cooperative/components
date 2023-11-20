
import NextLink from 'next/link';
import { Text } from 'theme-ui';

interface LinkProps {
    children: React.ReactNode,
    href: string,
    variant?: string,
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const defaultProps = {
    children: null,
    href: null,
    variant: "link",
    onClick: null
}

export default function Link(props: LinkProps) {
    const {children, href, variant, onClick} = props;
    return (
        <NextLink href={href} onClick={onClick}>
            <Text variant={variant}>
                {children}
            </Text>
        </NextLink>
    )

}

Link.defaultProps = defaultProps;