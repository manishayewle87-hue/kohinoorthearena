import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'The Arena — Luxury Residences';
  const sub   = searchParams.get('sub')   || 'Life in Motion | Pimpri, Pune';
  const brand = searchParams.get('brand') || 'Mahalaxmi Group & Kohinoor Group';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
          background: 'linear-gradient(135deg, #0D0818 0%, #1a0a2e 50%, #0D0818 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid pattern */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(223,254,0,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,240,255,0.06) 0%, transparent 50%)',
          display: 'flex',
        }} />

        {/* Top badge */}
        <div style={{
          position: 'absolute', top: '50px', left: '60px',
          background: 'rgba(223,254,0,0.1)',
          border: '1px solid rgba(223,254,0,0.4)',
          borderRadius: '20px',
          padding: '8px 20px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{ color: '#DFFE00', fontSize: '14px', fontWeight: 700, letterSpacing: '2px' }}>
            PCMC PREMIUM REAL ESTATE
          </span>
        </div>

        {/* Main title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          <div style={{
            fontSize: title.length > 50 ? '42px' : '52px',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            maxWidth: '900px',
          }}>
            {title}
          </div>
          <div style={{
            fontSize: '22px',
            color: '#DFFE00',
            fontWeight: 600,
            letterSpacing: '1px',
          }}>
            {sub}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '4px', height: '40px', background: '#DFFE00', borderRadius: '2px', display: 'flex' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>{brand}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>MahaRERA Registered Project</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['2 BHK', '3 BHK', '4 BHK'].map(bhk => (
              <div key={bhk} style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{bhk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
