import { evaluate } from '@mdx-js/mdx'
import type { EvaluateOptions } from '@mdx-js/mdx/lib/util/resolve-evaluate-options.js'
import type { MDXComponents } from 'mdx/types.js'
import { MDXModule } from 'mdx/types.js'
import * as runtime from 'react/jsx-runtime'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export function generateContent(text: string, components: MDXComponents): Promise<MDXModule> {
  const evaluateOptions: Readonly<EvaluateOptions> = {
    Fragment: undefined, // see https://github.com/mdx-js/mdx/pull/2465#issuecomment-2203046535
    ...runtime,
    useMDXComponents: () => components,
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm],
  }
  return evaluate(text, evaluateOptions)
}
