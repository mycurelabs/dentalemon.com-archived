import { ImageResponse } from 'next/og'
import { brandConfig } from '@/config/brand'

const { company } = brandConfig

export const runtime = 'edge'
export const alt = `${company.displayName} - Dental Practice Management Software`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#22d3ee',
              marginBottom: 24,
              letterSpacing: '-2px',
            }}
          >
            {company.displayName}
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#ffffff',
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            Dental Practice Management Software
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#94a3b8',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Trusted by Dental Practices
          </div>
          <div
            style={{
              display: 'flex',
              gap: 32,
              marginTop: 40,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, backgroundColor: '#22c55e', borderRadius: '50%' }} />
              <span style={{ color: '#e2e8f0', fontSize: 18 }}>HIPAA Compliant</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, backgroundColor: '#22c55e', borderRadius: '50%' }} />
              <span style={{ color: '#e2e8f0', fontSize: 18 }}>Works Offline</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, backgroundColor: '#22c55e', borderRadius: '50%' }} />
              <span style={{ color: '#e2e8f0', fontSize: 18 }}>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
