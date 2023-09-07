import { Nav } from '@/components/Nav'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next project',
  description: 'Next tailwind antd & react query',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav/>
        {children}
      </body>
    </html>
  )
}
