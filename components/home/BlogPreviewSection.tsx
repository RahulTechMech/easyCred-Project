import Link from "next/link";
import { Section, SectionIntro } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { BLOG_POSTS } from "@/lib/content/blogs";

export function BlogPreviewSection() {
  const latest = BLOG_POSTS.slice(0, 3);

  return (
    <Section className="bg-ink-900/30">
      <SectionIntro eyebrow="Blog" title="Latest from EasyCred" subtitle="Guides on loans, EMIs, and financial planning." />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {latest.map((post, i) => (
          <Reveal key={post.slug} direction="up" delay={i * 0.08}>
            <Link
              href={`/blogs/${post.slug}`}
              className="group flex h-full flex-col rounded-xl2 border border-hairline/10 bg-ink-800/30 p-6 transition-colors hover:border-signal-400/30"
            >
              <span className="text-xs font-medium text-signal-300">{post.category}</span>
              <p className="mt-3 font-display text-base font-semibold text-frost-50 transition-colors group-hover:text-signal-200">
                {post.title}
              </p>
              <p className="mt-2 flex-1 text-sm text-frost-400">{post.excerpt}</p>
              <span className="mt-4 text-xs text-frost-400/70">{post.readTime}</span>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/blogs" className="text-sm font-medium text-signal-300 hover:text-signal-200">
          View all articles →
        </Link>
      </div>
    </Section>
  );
}
