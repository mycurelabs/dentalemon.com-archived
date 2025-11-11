import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'xl'
  className?: string
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeMap = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    xl: { width: 256, height: 256 },
  }

  const dimensions = sizeMap[size]

  return (
    <Image
      src="/logo.png"
      alt="DentaLemon Logo"
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      priority={size === 'sm'}
      quality={100}
    />
  )
}
