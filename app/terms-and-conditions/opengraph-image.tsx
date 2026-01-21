import { ImageResponse } from 'next/og'
import { brandConfig } from '@/config/brand'

const { company } = brandConfig

export const runtime = 'edge'
export const alt = `Terms and Conditions - ${company.displayName}`
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
            Terms & Conditions
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#ffffff',
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            Service Agreement
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#94a3b8',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Terms of use for our healthcare platform
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
