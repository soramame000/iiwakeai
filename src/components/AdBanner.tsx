'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
}

// AdSense広告コンポーネント
// AdSense審査通過後、NEXT_PUBLIC_ADSENSE_CLIENT_ID を設定して有効化
export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) return;
    
    try {
      // @ts-expect-error - AdSense global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [clientId]);

  // AdSense未設定時はプレースホルダーを表示
  if (!clientId) {
    return (
      <div className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-center ${className}`}>
        <p className="text-zinc-600 text-xs">広告スペース</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

