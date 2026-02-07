import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import React from 'react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Polyfill for jsdom + Radix UI compatibility
// Radix UI uses hasPointerCapture and scrollIntoView which are not fully available in jsdom
if (typeof Element !== 'undefined') {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = function() {
      return false
    }
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = function() {}
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = function() {}
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function() {}
  }
}

// Polyfill ResizeObserver for jsdom
if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
}

// Mock react-dom to work around React 19 CJS module issues
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom')
  return actual
})

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => React.createElement('img', props),
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => React.createElement('a', { href }, children),
}))

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
    span: ({ children, ...props }: any) => React.createElement('span', props, children),
    h1: ({ children, ...props }: any) => React.createElement('h1', props, children),
    h2: ({ children, ...props }: any) => React.createElement('h2', props, children),
    p: ({ children, ...props }: any) => React.createElement('p', props, children),
    button: ({ children, ...props }: any) => React.createElement('button', props, children),
  },
  AnimatePresence: ({ children }: any) => children,
}))
