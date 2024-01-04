import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning height="100vh !important">
      <head />
      <body height="100vh"> 
        {children}
      </body>
    </html>
  )
}
