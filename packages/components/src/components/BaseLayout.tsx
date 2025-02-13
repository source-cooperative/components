import { Toaster } from 'react-hot-toast'
import { Alert, Box, Container, Grid, Select } from 'theme-ui'
import Link from './Link'
import Meta, { MetaProps } from './Meta'

import { useRouter } from 'next/router'
import React from 'react'
import { Flex } from 'theme-ui'
import Logo from './Logo'

export interface SideNavLink {
	title: string;
	href: string;
}

interface AlertData {
	text: string;
	variant: string;
}

type LayoutProps = {
	children: React.ReactNode;
	logo?: React.ReactNode;
	topMenu?: React.ReactNode;
	footer?: React.ReactNode;
	dropDown?: React.ReactNode;
	sideNavLinks?: SideNavLink[];
	alerts?: AlertData[];
	messages?: AlertData[];
} & MetaProps;

export default function BaseLayout(props: LayoutProps) {
  const {
    title = 'Source Cooperative',
    description = 'Source Cooperative is a neutral, non-profit data-sharing utility that allows trusted organizations to share data without purchasing a data portal SaaS subscription or managing infrastructure. Source allows organizations to share data using standard HTTP methods rather than requiring proprietary APIs or SaaS interfaces. It is currently in private beta.',
    siteName,
    baseUrl,
    image,
    children,
    logo,
    topMenu,
    footer,
    dropDown,
    sideNavLinks,
    alerts,
    messages,
  } = props
  const router = useRouter()

  const toastOptions = {
    className: '',
    style: {
      border: '1px solid var(--theme-ui-colors-text)',
      borderRadius: '0',
      padding: '8px',
      color: 'var(--theme-ui-colors-text)',
      backgroundColor: 'var(--theme-ui-colors-background)',
    },
    success: {
      iconTheme: {
        primary: 'var(--theme-ui-colors-primary)',
        secondary: 'var(--theme-ui-colors-background)',
      },
    },
  }

  return (
    <main>
      <Box sx={{ zIndex: 999999 }}>
        <Toaster position="bottom-right" toastOptions={toastOptions} />
      </Box>

      <Meta description={description} title={title} siteName={siteName} baseUrl={baseUrl} image={image} />

      <Flex
        sx={{
          minHeight: '100vh;',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Box sx={{ zIndex: 99999 }}>
            {alerts?.map((alert, i) => {
              return (
                <Alert key={`alert-${i}`} variant={alert.variant}>
                  {alert.text}
                </Alert>
              )
            })}
            {messages?.map((message, i) => {
              return (
                <Alert key={`message-${i}`} variant={message.variant}>
                  {message.text}
                </Alert>
              )
            })}
          </Box>

          <Container
            sx={{
              position: 'sticky',
              backgroundColor: 'background',
              zIndex: 9999,
              top: 0,
              py: 2,
            }}
          >
            <Box
              sx={{
                width: ['100%', '100%', '100%', '70%'],
                margin: '0 auto',
              }}
            >
              <Grid
                sx={{
                  gridTemplateColumns: [
                    'auto 1fr',
                    'auto 3fr auto',
                    'auto 1fr 1fr',
                    'auto 1fr 1fr',
                  ],
                  gap: 1,
                }}
              >
                <Flex
                  sx={{
                    alignItems: 'center',
                    alignContent: 'center',
                    justifySelf: ['left', 'left', 'left', 'left'],
                    gridColumnStart: [1, 1, 1, 1],
                    gridRowStart: [1, 1, 1, 1],
                  }}
                >
                  {logo ?? <Link href="/">
                    <Logo
                      sx={{
                        height: ['45px', '45px', '55px', '55px'],
                        fill: 'background',
                        backgroundColor: 'primary',
                        p: 2,
                        '&:hover': {
                          fill: 'highlight',
                        },
                      }}
                    />
                  </Link>
                  }
                </Flex>
                <Flex
                  sx={{
                    gridColumnStart: [1, 1, 2, 2],
                    gridColumnEnd: ['end', 'end', 2, 2],
                    gridRowStart: [2, 2, 1, 1],
                    alignItems: 'center',
                    pl: [0, 0, 2, 2],
                  }}
                >
                  {topMenu}
                </Flex>
                <Flex
                  sx={{
                    justifySelf: 'right',
                    alignContent: 'center',
                    gridColumnEnd: 'end',
                    gridRowStart: [1, 1, 1, 1],
                  }}
                >
                  <Box sx={{ alignSelf: 'center' }}>{dropDown}</Box>
                </Flex>
              </Grid>
            </Box>
          </Container>
          <Container>
            <Grid
              sx={{
                gridTemplateColumns: ['100%', '100%', '15% 85%', '15% 70% 15%'],
                gridGap: 0,
              }}
            >
              <Flex
                sx={{
                  flexDirection: 'column',
                  alignContent: 'center',
                  justifyContent: 'right',
                  mr: [0, 0, 3, 3],
                  pb: [0, 0, 0, 0],
                  top: [
                    topMenu ? '105px' : '69px',
                    topMenu ? '105px' : '69px',
                    null,
                    null,
                  ],
                  position: ['sticky', 'sticky', null, null],
                }}
              >
                <Box
                  sx={{
                    display: ['none', 'none', 'initial', 'initial'],
                    borderStyle: 'none solid none none',
                    pr: 3,
                    borderWidth: '1px',
                    position: 'sticky',
                    top: '74.5px',
                  }}
                >
                  {sideNavLinks ?
                    sideNavLinks.map((sideNavLink, i) => {
                      return (
                        <Box
                          key={`sidenav-${i}`}
                          sx={{ justifyContent: 'right', display: 'flex' }}
                        >
                          <Link
                            href={sideNavLink.href}
                            variant={
                              router.pathname === sideNavLink.href
                                ? 'sideNavActive'
                                : 'sideNav'
                            }
                          >
                            {sideNavLink.title}
                          </Link>
                        </Box>
                      )
                    })
									 :
                    <></>
                  }
                </Box>

                <Box
                  sx={{
                    display: sideNavLinks
                      ? ['initial', 'initial', 'none', 'none']
                      : 'none',
                    backgroundColor: 'background',
                    pb: 2,
                  }}
                >
                  <Select
                    value={router.pathname}
                    onChange={(e) => {
                      router.push(e.target.value).catch((e: unknown) => { console.error(e) })
                    }}
                  >
                    {sideNavLinks ?
                      sideNavLinks.map((sideNavLink, i) => {
                        return (
                          <option key={`sidenav-${i}`} value={sideNavLink.href}>
                            {sideNavLink.title}
                          </option>
                        )
                      })
										 :
                      <></>
                    }
                  </Select>
                </Box>
              </Flex>
              <Box
                sx={{
                  gridRowStart: [2, 2, 1, 1],
                  gridColumnStart: [1, 1, sideNavLinks ? 2 : 1, 2],
                  gridColumnEnd: [null, null, sideNavLinks ? null : 3, null],
                }}
              >
                {children}
              </Box>
            </Grid>
          </Container>
        </Box>

        <Grid
          sx={{
            gridTemplateColumns: [
              null,
              null,
              sideNavLinks ? '1fr 5fr' : '1fr 5fr 1fr',
              '1fr 3fr 1fr',
            ],
            gridTemplateRows: ['1fr', '1fr', null, null],
            height: 'max-content',
            gridGap: [0, 0, 3, 3],
          }}
        >
          <Box
            sx={{
              gridColumnStart: [null, null, '1', '2'],
              gridColumnEnd: [null, null, '4', '3'],
              mx: [0, 0, 0, 2],
            }}
          >
            {footer}
          </Box>
        </Grid>
      </Flex>
    </main>
  )
}
