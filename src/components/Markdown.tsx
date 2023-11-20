import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { SourceComponents } from "../lib/provider";
import provider from "@mdx-js/react";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

const mdxOptions = {
  rehypePlugins: [rehypeSlug],
  remarkPlugins: [remarkGfm],
};

async function loadMdxSource({ source }) {
  return await serialize(source, {
    mdxOptions: mdxOptions,
  });
}

interface MarkdownProps {
    content?: string,
    skeleton?: React.ReactNode
}

const defaultProps = {
    content: null,
    skeleton: null
}

export default function Markdown(props: MarkdownProps) {
    const { content, skeleton } = props;
    const [mdxModule, setMdxModule] = useState(null);


    useEffect(() => {
        if (!content) {
            return;
        }
        evaluate(content, {
            ...provider,
            ...runtime,
            useMDXComponents: SourceComponents,
            ...mdxOptions,
        } as any).then((module) => {
            setMdxModule(module);
        });
    }, [content]);

    if (!content || !mdxModule) {
        return skeleton ? skeleton : <Skeleton count={10} />
    }

    const Content = mdxModule ? mdxModule.default : <></>;
    return <Content />
}

Markdown.defaultProps = defaultProps;