import MainLayout from "@/components/MainLayout";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  return {
    title: `Mahalaxmi The Arena Pimpri | Premium Sports Township`,
    description: `Mahalaxmi The Arena in Pimpri. A premium 2, 3 & 4 BHK lifestyle project by Mahalaxmi Group in PCMC, Pune.`,
    alternates: { canonical: `${cfg.canonical}/mahalaxmi-the-arena-pimpri` },
  };
}
export const revalidate = 3600;

export default function Page() {
  return <MainLayout h1="Mahalaxmi The Arena Pimpri" keyword="mahalaxmi the arena pimpri" />;
}
