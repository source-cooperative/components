import { ThemeProviderProps } from '@theme-ui/core'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import Prism from '@theme-ui/prism'
import type { ComponentPropsWithoutRef, JSX, ReactNode } from 'react'
import { Card, Heading, Paragraph, ThemeUIProvider } from 'theme-ui'
import CodeBlock, { InlineCode } from '../components/CodeBlock.js'
import Link from '../components/Link.js'

function createLink(props: JSX.IntrinsicElements['a']) {
  const { href } = props
  return href ? <Link href={href}>{props.children}</Link> : props.children
}

function createHeadingWithLink(level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
  return function headingWithLink(props: ComponentPropsWithoutRef<typeof Heading>) {
    return (
      <Heading as={level} {...props}>
        {props.children}
      </Heading>)
  }
}

const components = {
  h1: createHeadingWithLink('h2'),
  h2: createHeadingWithLink('h3'),
  h3: createHeadingWithLink('h4'),
  h4: createHeadingWithLink('h5'),
  h5: createHeadingWithLink('h6'),
  h6: createHeadingWithLink('h6'),
  a: createLink,
  p: ({ children }: { children?: ReactNode }) => <Paragraph>{children}</Paragraph>,
  blockquote: ({ children }: { children?: ReactNode }) => <Card variant="blockquote">{children}</Card>,
  code: ({ children, className = '' }: { children?: ReactNode, className?: string }) => {
    if (typeof children !== 'string') {
      /// only implemented if children is a string
      return <></>
    }
    return children.includes('\n') ?
      <CodeBlock copyButton={true}>
        <Prism className={className}>{children}</Prism>
      </CodeBlock>
      :
      <InlineCode>
        <Prism className={className}>{children}</Prism>
      </InlineCode>

  },
}

export function SourceComponents() {
  return useThemedStylesWithMdx(components)
}

export function SourceProvider({ children, theme }: {children?: ReactNode, theme: ThemeProviderProps['theme']}) {
  return <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>
}
