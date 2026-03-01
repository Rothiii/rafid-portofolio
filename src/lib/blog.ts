export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
};

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const SHEET_NAME = "Posts";

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!SHEET_ID || !API_KEY) {
    return [];
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    console.error("Failed to fetch blog posts:", response.statusText);
    return [];
  }

  const data = await response.json();
  const rows: string[][] = data.values;

  if (!rows || rows.length <= 1) return [];

  // First row is headers: title, slug, date, tags, summary, content
  const [, ...dataRows] = rows;

  return dataRows
    .map((row) => ({
      title: row[0] || "",
      slug: row[1] || "",
      date: row[2] || "",
      tags: (row[3] || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      summary: row[4] || "",
      content: row[5] || "",
    }))
    .filter((post) => post.title && post.slug);
}

export async function fetchBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const posts = await fetchBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function calculateReadingTime(content: string): string {
  const text = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
    .replace(/[#*_~>\-|]/g, "")
    .trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}
