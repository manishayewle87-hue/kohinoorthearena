import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Market Insights | Mahalaxmi The Arena",
  description: "Read the latest insights and trends on the Pimpri Chinchwad and Pune real estate market.",
};

export const revalidate = 3600;

export default function BlogList() {
  const posts = getBlogPosts();

  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 0 4rem 0', minHeight: '80vh' }}>
        <div className="container">
          <h1 className="section-title text-center" style={{ marginBottom: '1rem' }}>Market Insights</h1>
          <p className="text-center" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
            Latest trends, tips, and news on the Pune Real Estate Market.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ padding: '2rem', height: '100%', transition: 'transform 0.3s ease' }}>
                  <div style={{ color: 'var(--neon-lime)', fontSize: '0.8rem', marginBottom: '1rem' }}>{post.date}</div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>{post.title}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{post.description}</p>
                  <div style={{ marginTop: '1.5rem', color: 'var(--neon-lime)', fontWeight: 'bold' }}>Read More &rarr;</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
