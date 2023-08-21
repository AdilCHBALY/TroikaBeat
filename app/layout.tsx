import Sidebar from '@/components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModelProvider from '@/providers/ModelProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'


const font = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TroikaBeat',
  description: 'www.troikabeat.com',
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider />
              <Sidebar songs={userSongs}>
                {children}
              </Sidebar>
              <Player />
          </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  )
}
