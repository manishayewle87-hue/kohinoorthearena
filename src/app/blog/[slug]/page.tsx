import { getPostBySlug, getBlogPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const post = getPostBySlug(p.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: `${post.title} | Mahalaxmi The Arena Insights`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const post = getPostBySlug(p.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 0 4rem 0', minHeight: '80vh' }}>
        <article className="container" style={{ maxWidth: '800px' }}>
          <div style={{ color: 'var(--neon-lime)', marginBottom: '1rem' }}>{post.date}</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{post.title}</h1>
          <div className="glass-card" style={{ padding: '2rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
            {/* Extremely basic markdown to HTML render for headers and paragraphs */}
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} style={{ color: '#fff', margin: '2rem 0 1rem 0', fontSize: '1.8rem' }}>{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('# ')) {
                return <h1 key={idx} style={{ color: '#fff', margin: '2rem 0 1rem 0' }}>{paragraph.replace('# ', '')}</h1>;
              }
              // Bold parsing `**text**`
              const parsedHtml = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              return <p key={idx} style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: parsedHtml }} />;
            })}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
