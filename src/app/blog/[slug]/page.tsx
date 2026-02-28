import { fetchBlogPostBySlug, fetchBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import BlogContent from "@/components/BlogContent";
import { BsArrowLeft } from "react-icons/bs";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} - Rafid Al Khairy Blog`,
    description: post.summary,
  };
}

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="min-h-screen py-12 xl:py-24">
      <div className="container mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
        >
          <BsArrowLeft />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-accent text-sm mb-2">{post.date}</p>
          <h1 className="text-3xl xl:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Markdown Content */}
        <article>
          <BlogContent content={post.content} />
        </article>
      </div>
    </section>
  );
}
