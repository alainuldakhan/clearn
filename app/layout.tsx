// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs/app-beta"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastProvider } from "@/components/providers/toaster-provider"
import { ConfettiProvider } from "@/components/providers/confetti-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "СLearn",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ToastProvider />
          <ConfettiProvider />
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
