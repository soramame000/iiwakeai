import ExcuseGenerator from '@/components/ExcuseGenerator';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-glow-cyan">言い訳</span>
          <span className="text-[--accent-magenta]">AI</span>
        </h1>
        <p className="text-zinc-500 text-sm">
          3タップで最強の言い訳を生成
        </p>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 py-6">
        <ExcuseGenerator />
      </main>

      {/* 広告バナー - 審査通過後に有効化 */}
      {/* <div className="px-4 pb-4 max-w-lg mx-auto w-full">
        <AdBanner slot="実際のスロットID" format="horizontal" />
      </div> */}

      {/* フッター */}
      <footer className="py-6 px-4 text-center border-t border-[#1a1a1a]">
        <p className="text-zinc-600 text-xs mb-3">
          ※ このアプリは娯楽目的です。悪用禁止。
        </p>
        <div className="flex justify-center gap-4 text-zinc-600 text-xs">
          <Link href="/terms" className="hover:text-zinc-400 transition-colors">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
            プライバシーポリシー
          </Link>
        </div>
      </footer>
    </div>
  );
}
