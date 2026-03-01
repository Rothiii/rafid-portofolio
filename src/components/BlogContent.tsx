"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";

type Props = {
  content: string;
};

const BlogContent = ({ content }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4 mt-8">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold mb-3 mt-8">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mb-2 mt-6">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-theme-fg/80 mb-4 leading-relaxed">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-theme-fg/10 px-1.5 py-0.5 rounded text-accent text-sm">
                {children}
              </code>
            );
          }
          return <code className={className}>{children}</code>;
        },
        pre: ({ children }) => (
          <pre className="bg-stone-100 dark:bg-black/50 rounded-xl p-4 overflow-x-auto mb-4 border border-theme-fg/10">
            {children}
          </pre>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-theme-fg/80 mb-4 space-y-1">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-theme-fg/80 mb-4 space-y-1">
            {children}
          </ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-accent pl-4 italic text-theme-fg/70 mb-4">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-theme-fg/20">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-theme-fg/20 px-4 py-2 bg-theme-fg/10 font-semibold text-left">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-theme-fg/20 px-4 py-2 text-theme-fg/80">
            {children}
          </td>
        ),
        hr: () => <hr className="border-theme-fg/20 my-8" />,
        img: ({ src, alt }) => {
          if (!src) return null;
          return (
            <span className="block relative w-full my-4">
              <Image
                src={src}
                alt={alt || ""}
                width={800}
                height={400}
                sizes="(max-width: 768px) 100vw, 768px"
                className="rounded-xl max-w-full h-auto"
              />
            </span>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default BlogContent;
