import { useState } from 'react'
import { Box } from 'theme-ui'
import { SxProp } from '../lib/sx'
import Button from './Button'
import SVG from './SVG'

function DownArrow() {
  return (
    <>
      <SVG
        viewBox="0 0 16 16"
        sx={{
          ml: 0,
          width: ['8px', '8px', '12px', '12px'],
          height: ['8px', '8px', '12px', '12px'],
          fill: 'background',
          transform: [
            'translate(0, 0px)',
            'translate(0, 0px)',
            'translate(0, 1px)',
            'translate(0, 1px)',
          ],
        }}
      >
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      </SVG>
    </>
  )
}

interface Link {
	href: string;
	text: string;
}

type AccountDropdownProps = {
	name?: string;
	signedIn: boolean;
	verified: boolean;
	usernameClaimed: boolean;
	links?: Link[];
} & SxProp

export default function AccountDropdown( { name, signedIn = false, verified = false, usernameClaimed = false, links, sx, css, className }: AccountDropdownProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  if (!signedIn) {
    return <Button variant="nav">Sign In</Button>
  }

  if (!verified) {
    return <Button variant="nav">Verify Email</Button>
  }

  if (!usernameClaimed) {
    return <Button variant="nav">Claim Username</Button>
  }

  return (
    <Box sx={sx} css={css} className={className}>
      <Box
        onMouseOut={() => { setMenuOpen(false) }}
        onMouseOver={() => { setMenuOpen(true) }}
        sx={{
          display: ['none', 'none', 'block', 'block'],
        }}
      >
        <Button
          variant="nav"
          onClick={() => {
            setMenuOpen(!menuOpen)
          }}
        >
          {name} <DownArrow />
        </Button>
        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'primary',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'background',
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? 'all' : 'none',
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            {links?.map((link, i) => {
              return (
                <Button
                  variant="nav"
                  key={`account-dropdown-nav-${i}`}
                  href={link.href}
                >
                  {link.text}
                </Button>
              )
            })
            }
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: ['block', 'block', 'none', 'none'],
        }}
      >
        <Button
          variant="nav"
          onClick={() => {
            setMenuOpen(!menuOpen)
          }}
        >
          {name} <DownArrow />
        </Button>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'primary',
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? 'all' : 'none',
            height: '100vh',
            width: '100vw',
            pt: 2,
          }}
        >
          <Button
            variant="nav"
            onClick={() => {
              setMenuOpen(!menuOpen)
            }}
          >
						Close Menu
          </Button>
          {links ?
            links.map((link, i) => {
              return (
                <Button
                  variant="nav"
                  key={`account-menu-nav-${i}`}
                  href={link.href}
                >
                  {link.text}
                </Button>
              )
            })
					 :
            <></>
          }
        </Box>
      </Box>
    </Box>
  )
}
