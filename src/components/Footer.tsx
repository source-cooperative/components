import { Grid, Text, Box } from "theme-ui";
import Link from "./Link";
import { useColorMode } from "theme-ui";
import { useCallback } from "react";

interface FooterLink {
    href: string,
    text: string
}

interface FooterProps {
    links: FooterLink[]
}

const defaultProps = {
    links: []
}

export default function Footer(props: FooterProps) {
    const [colorMode, setColorMode] = useColorMode()

    const toggle = useCallback(() => {
        setColorMode(colorMode === 'light' ? 'dark' : 'light')
    }, [colorMode])

    return (
        <Grid sx={{py: 3, gridTemplateColumns: "1fr 1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 1}}>
        {
            props.links.map((link, index) => {
                return (
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Link key={index} href={link.href}><Text sx={{fontFamily: "mono", fontSize: 0, textTransform: "uppercase", fontWeight: "bold"}}>{link.text}</Text></Link>
                    </Box>
                )
            })
        }
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Link href="#" onClick={(e) => {toggle()}}>
                <Text sx={{fontFamily: "mono", fontSize: 0, textTransform: "uppercase", fontWeight: "bold"}}>Toggle Dark Mode</Text>
                </Link>
            </Box>
        </Grid>
    ) 
}

Footer.defaultProps = defaultProps;