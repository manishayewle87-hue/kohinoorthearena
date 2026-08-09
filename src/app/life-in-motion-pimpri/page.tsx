import MainLayout from "@/components/MainLayout";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  return {
    title: `Life in Motion Pimpri | Premium Sports Township by Mahalaxmi Group`,
    description: `Discover Life in Motion in Pimpri, a premium sports township by Mahalaxmi Group and Kohinoor Group offering 2, 3 & 4 BHK luxury residences.`,
    alternates: { canonical: `${cfg.canonical}/life-in-motion-pimpri` },
  };
}
export const revalidate = 3600;

export default function Page() {
  return <MainLayout h1="Life in Motion Pimpri" keyword="life in motion pimpri pune" />;
}
