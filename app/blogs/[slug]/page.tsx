import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BLOG_POSTS } from "@/lib/content/blogs";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "EasyCred" },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden pb-8 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-grad-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-8">
          <Reveal direction="up">
            <Link href="/blogs" className="text-sm font-medium text-signal-300 hover:text-signal-200">
              ← Back to Blog
            </Link>
            <span className="mt-6 block text-xs font-medium text-signal-300">{post.category}</span>
            <h1 className="mt-2 font-display text-3xl font-bold text-frost-50 sm:text-4xl">{post.title}</h1>
            <div className="mt-4 flex items-center gap-3 text-xs text-frost-400">
              <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <div className="mx-auto max-w-2xl space-y-5 text-sm leading-relaxed text-frost-300 sm:text-base">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-xl2 border border-hairline/10 bg-ink-800/30 p-6 text-center">
          <p className="font-display text-base font-semibold text-frost-50">Ready to see what you qualify for?</p>
          <Link href="/eligibility-calculator" className="mt-4 inline-block rounded-xl bg-grad-signal px-6 py-3 text-sm font-semibold text-white shadow-glow">
            Check Eligibility
          </Link>
        </div>
      </Section>
    </div>
  );
}
