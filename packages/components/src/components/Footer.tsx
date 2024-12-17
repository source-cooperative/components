import { useCallback } from 'react'
import { Box, Grid, Text, useColorMode } from 'theme-ui'
import Link from './Link'

interface FooterLink {
	href: string;
	text: string;
}

interface FooterProps {
	links: FooterLink[];
	text: string[];
}

const defaultProps = {
  links: [],
  text: [],
}

export default function Footer(props: FooterProps) {
  const [colorMode, setColorMode] = useColorMode()

  const toggle = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }, [colorMode])

  return (
    <Grid
      sx={{
        py: 3,
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 1,
      }}
    >
      {props.links.map((link, index) => {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Link key={index} href={link.href} variant="footer">
              {link.text}
            </Link>
          </Box>
        )
      })}
      <Box
        sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
      >
        <Link
          onClick={(e) => {
            toggle()
          }}
          variant="footer"
        >
					Toggle Dark Mode
        </Link>
      </Box>

      {props.text.map((text, index) => {
        return (
          <Box
            key={`footer-text-${index}`}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Text variant="footer">{text}</Text>
          </Box>
        )
      })}
    </Grid>
  )
}

Footer.defaultProps = defaultProps
