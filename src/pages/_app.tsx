import Navbar from '@/components/Navbar';
import FooterSection from '@/sections/FooterSection';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
      <FooterSection />
    </SessionProvider>
  );
}
