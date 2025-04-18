import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Dyna",
  description: "Get your project summary in seconds",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="min-h-screen poppins overflow-x-hidden bg-black/80">
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
