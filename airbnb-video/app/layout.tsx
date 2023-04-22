import { Nunito } from "next/font/google";
import './globals.css'

const font = Nunito({ // add font
  subsets: ["latin"],
})

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body> {/* add font*/}
    </html>
  )
}
