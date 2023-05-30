import React from 'react'

import './globals.css'

export const metadata = {
  title: 'User - App',
  description: 'Main users visualization'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='flex items-center justify-center h-screen'>
        {children}
      </body>
    </html>
  )
}
