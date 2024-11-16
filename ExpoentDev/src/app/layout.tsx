import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { DataInitializer } from "@/components/data-initializer"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '个人财务管理系统',
  description: '使用 Next.js 和 shadcn/ui 构建的现代化个人财务管理系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DataInitializer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}