import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { BLOG_POSTS } from "@/lib/content/blogs";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on personal loans, EMIs, loan approval tips, financial planning, and credit improvement from EasyCred.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <div>
      <section className="relative overflow-hidden pb-10 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-grad-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-8">
          <Reveal direction="up">
            <Eyebrow>Blog</Eyebrow>
            <h1 className="mt-5 font-display text-3xl font-bold text-frost-50 sm:text-4xl">EasyCred Blog</h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-frost-400 sm:text-base">
              Practical guides on loans, EMIs, approval tips, financial planning, and credit improvement.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group flex h-full flex-col rounded-xl2 border border-hairline/10 bg-ink-800/30 p-6 transition-colors hover:border-signal-400/30"
            >
              <span className="text-xs font-medium text-signal-300">{post.category}</span>
              <p className="mt-3 font-display text-lg font-semibold text-frost-50 transition-colors group-hover:text-signal-200">
                {post.title}
              </p>
              <p className="mt-2 flex-1 text-sm text-frost-400">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-frost-400/70">
                <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </StaggerGroup>
      </Section>
    </div>
  );
}
