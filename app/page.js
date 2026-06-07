'use client';

import dynamic from 'next/dynamic';

// Dynamically import the App with no SSR (Three.js + browser-only APIs)
const PortfolioApp = dynamic(() => import('../components/PortfolioApp'), {
  ssr: false,
  loading: () => null,
});

export default function Page() {
  return <PortfolioApp />;
}
