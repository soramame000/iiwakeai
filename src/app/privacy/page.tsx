import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/" 
          className="text-zinc-500 text-sm mb-8 inline-block hover:text-zinc-300"
        >
          ← ホームに戻る
        </Link>
        
        <h1 className="text-2xl font-bold mb-8 text-glow-cyan">
          プライバシーポリシー
        </h1>
        
        <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">1. はじめに</h2>
            <p>
              言い訳AI（以下「本サービス」）は、ユーザーのプライバシーを尊重し、
              個人情報の保護に努めています。本プライバシーポリシーでは、
              本サービスにおける情報の取り扱いについて説明します。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">2. 収集する情報</h2>
            <p>本サービスでは、以下の情報を収集する場合があります：</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
              <li>利用状況データ（生成回数、カテゴリ選択など）</li>
              <li>デバイス情報（ブラウザの種類、OS等）</li>
              <li>Cookieおよびローカルストレージのデータ</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">3. 情報の利用目的</h2>
            <p>収集した情報は、以下の目的で利用します：</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
              <li>サービスの提供・改善</li>
              <li>利用状況の分析</li>
              <li>広告の配信（Google AdSense等）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">4. 広告について</h2>
            <p>
              本サービスでは、第三者配信の広告サービス（Google AdSense）を利用しています。
              広告配信事業者は、ユーザーの興味に応じた広告を表示するために
              Cookie を使用することがあります。
            </p>
            <p className="mt-2">
              Google AdSense の詳細については、
              <a 
                href="https://policies.google.com/technologies/ads?hl=ja" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[--accent-cyan] hover:underline"
              >
                Google 広告に関するポリシー
              </a>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">5. Cookieについて</h2>
            <p>
              本サービスでは、利用状況の記録や広告配信のためにCookieを使用しています。
              ブラウザの設定によりCookieを無効にすることも可能ですが、
              一部機能が利用できなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">6. 第三者への提供</h2>
            <p>
              法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">7. お問い合わせ</h2>
            <p>
              プライバシーポリシーに関するお問い合わせは、
              本サービス内のお問い合わせフォームよりご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">8. 改定について</h2>
            <p>
              本プライバシーポリシーは、必要に応じて改定することがあります。
              改定した場合は、本ページにて公開します。
            </p>
          </section>

          <p className="text-zinc-500 text-xs mt-8">
            最終更新日: 2025年1月
          </p>
        </div>
      </div>
    </div>
  );
}

