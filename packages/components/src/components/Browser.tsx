import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import { Box, Card, Flex, Grid, Paragraph, Text } from 'theme-ui'
import Button from './Button.js'
import Link from './Link.js'
import SVG from './SVG.js'

interface Breadcrumb {
  href: string;
  name: string;
}

interface Listing {
  name: string;
  size?: number;
  href: string;
}

interface BrowserResult {
  prev: boolean;
  next?: string;
  breadcrumbs: Breadcrumb[];
  items?: Listing[];
}

const defaultProps = {
  prev: false,
  next: null,
  breadcrumbs: [],
  items: null,
}

function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  )

  return bytes.toFixed(dp) + ' ' + units[u]
}

function FileIcon({ color }: { color: string }) {
  return (
    <SVG
      viewBox="0 0 16 16"
      sx={{
        height: '0.9em',
        fill: color,
        display: 'inline',
        color: { color },
        p: 0,
        textAlign: 'left',
        width: 'inherit',
        mr: 1,
      }}
    >
      <g>
        <path d="M5.526 10.273c-.542 0-.832.563-.832 1.612 0 .088.003.173.006.252l1.559-1.143c-.126-.474-.375-.72-.733-.72zm-.732 2.508c.126.472.372.718.732.718.54 0 .83-.563.83-1.614 0-.085-.003-.17-.006-.25l-1.556 1.146z" />
        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-2.45 8.385c0 1.415-.548 2.206-1.524 2.206C4.548 14.09 4 13.3 4 11.885c0-1.412.548-2.203 1.526-2.203.976 0 1.524.79 1.524 2.203zm3.805 1.52V14h-3v-.595h1.181V10.5h-.05l-1.136.747v-.688l1.19-.786h.69v3.633h1.125z" />
      </g>
    </SVG>
  )
}

function FolderIcon({ color }: { color: string }) {
  return (
    <SVG
      viewBox="0 0 16 16"
      sx={{
        height: '0.9em',
        fill: color,
        display: 'inline',
        color: { color },
        p: 0,
        textAlign: 'left',
        width: 'inherit',
        mr: 1,
      }}
    >
      <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
    </SVG>
  )
}

function Item(props: Listing) {
  const { name, size, href } = props

  if (!size) {
    return (
      <Link href={href}>
        <FolderIcon color={'primary'} />
        {name}
      </Link>
    )
  } else {
    return (
      <Link href={href}>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'inline' }}>
            <FileIcon color={'primary'} />
            <Text>{name}</Text>
          </Box>
          <Text>{humanFileSize(size)}</Text>
        </Flex>
      </Link>
    )
  }
}

export default function Browser(props: BrowserResult) {
  const { prev, next, breadcrumbs, items } = props
  const router = useRouter()

  return (
    <Box sx={{ py: 2 }}>
      <Paragraph
        sx={{
          fontFamily: 'mono',
          fontSize: 0,
          color: 'secondary',
          overflowWrap: 'break-word',
        }}
      >
        {breadcrumbs.length === 0 ?
          <Skeleton />
          :
          <>
            {breadcrumbs.map((breadcrumb, i) => {
              return (
                <>
                  <Link
                    key={`breadcrumb-${i}`}
                    variant="breadcrumb"
                    href={breadcrumb.href}
                  >
                    {breadcrumb.name}
                  </Link>
                  <Text>/</Text>
                </>
              )
            })}
          </>
        }
      </Paragraph>
      <Card variant="code" sx={{ fontSize: 1, fontFamily: 'mono' }}>
        {!items ?
          Array(10)
            .fill(1)
            .map((_, y) => {
              return (
                <Box sx={{ width: '100%' }} key={`skeleton-${y}`}>
                  <Skeleton />
                </Box>
              )
            })
          :
          <></>
        }
        {items?.map((item, i) => {
          if (item.size) {
            return <></>
          }
          return (
            <Box key={`dir-${i}`}>
              <Item name={item.name} size={item.size} href={item.href} />
            </Box>
          )
        })}
        {items?.map((item, i) => {
          if (!item.size) {
            return <></>
          }
          return (
            <Box key={`file-${i}`}>
              <Item name={item.name} size={item.size} href={item.href} />
            </Box>
          )
        })}
      </Card>
      <Grid
        sx={{
          pt: 2,
          gridTemplateColumns: 'auto auto',
        }}
      >
        <Box sx={{ textAlign: 'left' }}>
          <Button onClick={() => { router.back() }} disabled={!prev}>
            Prev
          </Button>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Button disabled={!items || !next} href={next}>
            Next
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}

Browser.defaultProps = defaultProps
