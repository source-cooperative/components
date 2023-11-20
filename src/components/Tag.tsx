import { Box, Text, Card } from "theme-ui";
import Link from "next/link";
import { transparentize } from "@theme-ui/color";

interface TagProps {
    children: React.ReactNode;
    color: string;
    href?: string;
}

export default function Tag(props : TagProps) {
    const {children, color, href} = props;
    if (href) {
        return (
            <Box sx={{display: "inline-block"}}>
                <Link href={href}>
                    <Card variant="tag" sx={{
                        color: color,
                        backgroundColor: transparentize(color, 0.7),
                        "&:hover": {
                            backgroundColor: transparentize(color, 0.4),
                        }
                    }}>
                        <Text variant="tag">{children}</Text>
                    </Card>
                </Link>
            </Box>
        )
    }

    return (
      <Card variant="tag" sx={{
        color: color,
        backgroundColor: transparentize(color, 0.7),
        cursor: "default",
        display: "inline",
      }}>
        <Text variant="tag">{children}</Text>
      </Card>
    )
}