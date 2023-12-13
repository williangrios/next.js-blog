import './globals.css'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'

export const metadata = {
  title: 'Next Blog L1',
  description: 'Created with Next.js 14',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
