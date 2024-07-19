import { StoreProvider } from "@/store/StoreProvider"
import "./globals.css"
import { Roboto } from "next/font/google"
import 'rsuite/dist/rsuite-no-reset.min.css';
import { CustomProvider } from 'rsuite';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

const roboto = Roboto({subsets: ['latin'], weight: ["400", "700", "500", "900", "300"]})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={roboto.className}>
        <StoreProvider>
          <CustomProvider>
            {children}
          </CustomProvider>
        </StoreProvider>
      </body>
    </html>
    
  )
}
