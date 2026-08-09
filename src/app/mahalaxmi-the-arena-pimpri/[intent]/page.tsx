import MainLayout from "@/components/MainLayout";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

type Props = { params: Promise<{ intent: string }> };

export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const intentStr = p.intent.replace(/-/g, ' ');
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  return {
    title: `Mahalaxmi The Arena Pimpri ${intentStr}`,
    description: `Mahalaxmi The Arena Pimpri ${intentStr}. Luxury residences in PCMC.`,
    alternates: { canonical: `${cfg.canonical}/mahalaxmi-the-arena-pimpri/${p.intent}` },
  };
}
export const revalidate = 3600;

export default async function Page({ params }: Props) {
  const p = await params;
  const intentStr = p.intent.replace(/-/g, ' ');
  return <MainLayout h1={`Mahalaxmi The Arena Pimpri ${intentStr}`} keyword={`mahalaxmi the arena pimpri ${intentStr}`} />;
}
