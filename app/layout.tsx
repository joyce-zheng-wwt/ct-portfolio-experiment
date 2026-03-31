import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import CanvasBackground from '@/components/CanvasBackground'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'STUDIO — Creative Technology',
  description:
    'A studio at the intersection of visual craft, engineering precision, and applied intelligence — shaping the tools and interfaces of what\'s next.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${ibmPlexMono.className}`}>
      <body>
        <CustomCursor />
        <CanvasBackground />
        {children}
      </body>
    </html>
  )
}
