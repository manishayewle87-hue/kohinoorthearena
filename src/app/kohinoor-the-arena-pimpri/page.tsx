import MainLayout from "@/components/MainLayout";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  return {
    title: `Kohinoor The Arena Pimpri | Luxury Flats in PCMC`,
    description: `Kohinoor The Arena in Pimpri Chinchwad. Premium 2, 3 & 4 BHK residences by Kohinoor Group in an 80,000 sq.ft. sports township.`,
    alternates: { canonical: `${cfg.canonical}/kohinoor-the-arena-pimpri` },
  };
}
export const revalidate = 3600;

export default function Page() {
  return <MainLayout h1="Kohinoor The Arena Pimpri" keyword="kohinoor the arena pimpri" />;
}
