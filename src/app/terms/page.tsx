import Link from 'next/link';

export default function Terms() {
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
          利用規約
        </h1>
        
        <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">1. サービスの目的</h2>
            <p>
              言い訳AI（以下「本サービス」）は、<strong>娯楽・エンターテイメント目的</strong>で
              提供されるサービスです。生成されるコンテンツはフィクションであり、
              実際の使用を推奨するものではありません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">2. 禁止事項</h2>
            <p>ユーザーは、以下の行為を行ってはなりません：</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
              <li>詐欺、犯罪行為への利用</li>
              <li>他者を傷つける目的での利用</li>
              <li>公序良俗に反する利用</li>
              <li>サービスの運営を妨害する行為</li>
              <li>不正アクセス、リバースエンジニアリング</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">3. 免責事項</h2>
            <p>
              本サービスの利用により生じたいかなる損害についても、
              運営者は一切の責任を負いません。生成されたコンテンツの
              使用は、すべてユーザー自身の責任において行ってください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">4. 利用制限</h2>
            <p>
              無料ユーザーは、1日あたりの生成回数に制限があります。
              制限は予告なく変更される場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">5. 広告表示</h2>
            <p>
              本サービスでは、運営維持のため広告を表示することがあります。
              広告の内容について、運営者は責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">6. サービスの変更・終了</h2>
            <p>
              運営者は、事前の告知なくサービスの内容を変更、
              または終了することができるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">7. 規約の変更</h2>
            <p>
              本規約は、必要に応じて変更されることがあります。
              変更後の規約は、本ページに掲載した時点で効力を生じます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-white">8. 準拠法</h2>
            <p>
              本規約は、日本法に準拠し、解釈されるものとします。
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

