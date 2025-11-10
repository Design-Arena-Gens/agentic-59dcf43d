import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Lone Samurai',
  description: 'A cinematic scene of solitude and reflection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
