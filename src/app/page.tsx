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

      {/* サポートボタン */}
      <div className="px-4 pb-6 max-w-lg mx-auto w-full">
        <a
          href="https://ofuse.me/YOUR_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-center hover:from-yellow-500/30 hover:to-orange-500/30 transition-all"
        >
          <span className="text-yellow-400 font-medium">☕ 開発者にコーヒーを奢る</span>
          <span className="text-zinc-500 text-xs block mt-1">このアプリが役立ったら応援してね</span>
        </a>
      </div>

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
