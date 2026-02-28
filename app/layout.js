import '../styles/globals.css'

export const metadata = {
  title: 'Movie Tracker',
  description: 'A beautiful personal movie tracker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
