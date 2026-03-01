"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { Search } from "lucide-react";

type Props = {
  posts: (BlogPost & { readingTime: string })[];
};

const BlogListClient = ({ posts }: Props) => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.summary.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, search, selectedTag]);

  return (
    <>
      {/* Search & Filter */}
      <div className="mb-10 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-fg/40" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-theme-fg/5 border border-theme-fg/10 rounded-xl text-theme-fg placeholder:text-theme-fg/40 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                !selectedTag
                  ? "bg-accent text-primary font-medium"
                  : "bg-theme-fg/5 text-theme-fg/70 hover:bg-theme-fg/10"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  selectedTag === tag
                    ? "bg-accent text-primary font-medium"
                    : "bg-theme-fg/5 text-theme-fg/70 hover:bg-theme-fg/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-theme-fg/60 text-lg">
            {posts.length === 0
              ? "No posts yet. Check back soon!"
              : "No posts match your search."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="bg-theme-fg/5 backdrop-blur-sm rounded-xl p-6 border border-theme-fg/10 hover:border-accent/50 hover:scale-[1.02] transition-all duration-300 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-accent text-sm">{post.date}</p>
                  <span className="text-theme-fg/40">·</span>
                  <p className="text-theme-fg/60 text-sm">{post.readingTime}</p>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {post.title}
                </h3>
                <p className="text-theme-fg/70 text-sm mb-4 line-clamp-3">
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
    </>
  );
};

export default BlogListClient;
