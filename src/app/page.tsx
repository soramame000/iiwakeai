import ExcuseGenerator from '@/components/ExcuseGenerator';

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

      {/* フッター */}
      <footer className="py-6 px-4 text-center border-t border-[#1a1a1a]">
        <p className="text-zinc-600 text-xs">
          ※ このアプリは娯楽目的です。悪用禁止。
        </p>
      </footer>
    </div>
  );
}
