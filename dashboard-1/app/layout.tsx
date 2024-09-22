
import "./globals.css";
import { Providers } from "./globalRedux/provider";
import Head from "next/head";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/assets/portfolio.png" />
      </Head>
      <body
      >
        <Providers>
          
          {children}
        </Providers>
      </body>
    </html>
    
  );
}
