import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  // Disallow all programmatic ad brokers (pure official real estate direct portal)
  const content = `# ads.txt — Official Real Estate Portal
# No third-party programmatic ad inventory is authorized for this domain.
contact=info@kohinoorthearena.in
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=604800, s-maxage=604800',
    },
  });
}
