import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import Prism from '@theme-ui/prism'
import type { ComponentPropsWithoutRef } from 'react'
import { Card, Heading, Paragraph, ThemeUIProvider } from 'theme-ui'
import CodeBlock, { InlineCode } from '../components/CodeBlock'
import Link from '../components/Link'

function createLinks({ ...props }) {
  return <Link href={props.href}>{props.children}</Link>
}

const createHeadingWithLink =
	(Level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') =>
	  (props: ComponentPropsWithoutRef<typeof Heading>) =>

	      <Heading as={Level} {...props}>
	        {props.children}
	      </Heading>

export const components = {
  h1: createHeadingWithLink('h2'),
  h2: createHeadingWithLink('h3'),
  h3: createHeadingWithLink('h4'),
  h4: createHeadingWithLink('h5'),
  h5: createHeadingWithLink('h6'),
  h6: createHeadingWithLink('h6'),
  a: createLinks,
  p: ({ children }) => <Paragraph>{children}</Paragraph>,
  blockquote: ({ children }) => <Card variant="blockquote">{children}</Card>,
  code: ({ children, className }) => {
    return children.indexOf('\n') == -1 ?
      <InlineCode>
        <Prism children={children} className={className} />
      </InlineCode>
		 :
      <CodeBlock copyButton={true}>
        <Prism children={children} className={className} />
      </CodeBlock>

  },
}

export function SourceComponents() {
  return useThemedStylesWithMdx(components)
}

export function SourceProvider({ children, theme }) {
  return <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>
}
