import { fetchBlogPosts } from "@/lib/blog";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Rafid Al Khairy",
  description:
    "Thoughts, learnings, and findings from my journey as a software engineer.",
};

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <section className="min-h-screen py-12 xl:py-24">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Blog</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Documenting my learnings, findings, and thoughts on software
            engineering.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center">
            <p className="text-white/60 text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/50 hover:scale-[1.02] transition-all duration-300 h-full">
                  <p className="text-accent text-sm mb-2">{post.date}</p>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
