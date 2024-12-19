import { evaluate } from '@mdx-js/mdx'
import type { EvaluateOptions } from '@mdx-js/mdx/lib/util/resolve-evaluate-options.js'
import { useMDXComponents } from '@mdx-js/react'
import type { JSX } from 'react'
import * as runtime from 'react/jsx-runtime'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export type Content = () => JSX.Element
export async function generateContent(text: string): Promise<Content> {
  const evaluateOptions: Readonly<EvaluateOptions> = {
    Fragment: undefined, // see https://github.com/mdx-js/mdx/pull/2465#issuecomment-2203046535
    ...runtime,
    useMDXComponents, // is useful only if the context exists (eg, using <SourceProvider> from lib/provider.ts around the app)
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm],
  }
  const { default: content } = await evaluate(text, evaluateOptions)
  return () => content({}) // No props are needed
}
