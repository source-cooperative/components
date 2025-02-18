import { Box, Grid, Text, useColorMode } from 'theme-ui'
import Link from './Link'
import { SxProp } from './sx'

interface FooterLink {
	href: string;
	text: string;
}

type FooterProps = {
	links?: FooterLink[];
	text?: string[];
} & SxProp

export default function Footer({ links, text, sx, css, className }: FooterProps) {
  const setColorMode = useColorMode()[1]

  return (
    <Grid
      sx={{
        py: 3,
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 1,
        ...sx,
      }}
      css={css}
      className={className}
    >
      {links?.map((link, index) => {
        return (
          <Box key={index} sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }} >
            <Link href={link.href} variant="footer">
              {link.text}
            </Link>
          </Box>
        )
      })}
      <Box
        sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
      >
        <Link
          onClick={() => { setColorMode(colorMode => colorMode === 'light' ? 'dark' : 'light') }}
          variant="footer"
        >
					Toggle Dark Mode
        </Link>
      </Box>

      {text?.map((text, index) => {
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
