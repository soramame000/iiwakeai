import { Category, Target, Urgency, Tone, CATEGORY_LABELS, TARGET_LABELS } from '@/types';

interface PromptParams {
  category: Category;
  target: Target;
  urgency: Urgency;
  tone: Tone;
  customContext?: string;
}

const URGENCY_CONTEXT: Record<Urgency, string> = {
  low: '時間に余裕がある状況。じっくり考えた説得力のある言い訳が必要。',
  medium: 'やや急いでいる状況。バランスの取れた言い訳が必要。',
  high: '緊急事態。即座に使える、シンプルかつ効果的な言い訳が必要。',
};

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  polite: '敬語を使い、礼儀正しく丁寧な言葉遣いで。「申し訳ございません」「〜させていただきます」などを適切に使用。',
  casual: 'フランクで親しみやすい口調で。堅苦しさを排除し、自然体で話すように。',
  apologetic: '深く反省している様子を全面に出す。謝罪の言葉を複数回入れ、誠意を見せる。',
};

const TARGET_PSYCHOLOGY: Record<Target, string> = {
  parent: '親は子供の安全と将来を心配している。健康・学業・安全に関わる理由は説得力が高い。嘘を見破る経験が豊富なので、具体性と一貫性が重要。',
  teacher: '教師は規律と公平性を重視する。他の生徒にも説明できる「正当な理由」を好む。証拠を求められる可能性を考慮。',
  friend: '友達は共感と理解を求める。深刻すぎない程度に困っている状況を伝え、「また今度」の期待を持たせる。',
  work: 'バイト先は業務への影響を最小化したい。早めの連絡と代替案（シフト交代など）の提示が好印象。',
  romantic: '好きな人には「あなたに会いたくないわけじゃない」というニュアンスが重要。やむを得ない事情で、次の機会への期待を残す。',
};

export function buildPrompt(params: PromptParams): string {
  const { category, target, urgency, tone, customContext } = params;
  
  const categoryLabel = category === 'other' && customContext 
    ? customContext 
    : CATEGORY_LABELS[category].label;
  
  const targetLabel = TARGET_LABELS[target].label;

  return `あなたは16歳男子高校生の困りごとを解決する「言い訳の達人」です。
リアルで自然な言い訳を作成してください。AIが作った不自然さは絶対にNG。

## 状況
- カテゴリ: ${categoryLabel}
- 相手: ${targetLabel}
- 緊急度: ${URGENCY_CONTEXT[urgency]}
- トーン: ${TONE_INSTRUCTIONS[tone]}

## 相手の心理
${TARGET_PSYCHOLOGY[target]}

## 制約条件
1. 文字数: 言い訳本文は100〜300文字
2. 具体性: 嘘が見破られにくい具体的なディテールを含める（時間、場所、人物名など）
3. 一貫性: 後から追及されても矛盾が生じない設計
4. 倫理: 犯罪・自傷行為・差別に関する内容は絶対禁止
5. リアリティ: 16歳男子が実際に使いそうな言葉遣いと状況設定

## 出力形式
以下のJSON形式で出力してください。他の文章は一切不要です。

{
  "excuse": "言い訳本文をここに記述",
  "followUp": "相手から「本当に？」「証拠は？」などと追及された場合の返答アドバイス",
  "credibilityScore": 信憑性スコア（1-5の整数）
}

信憑性スコアの基準:
1: バレる可能性高い（緊急用）
2: やや不自然な点あり
3: 一般的な説得力
4: かなり信憑性高い
5: 完璧に近い（証拠まで想定済み）`;
}

// 緊急モード用の簡略プロンプト
export function buildQuickPrompt(category: Category, target: Target): string {
  const categoryLabel = CATEGORY_LABELS[category].label;
  const targetLabel = TARGET_LABELS[target].label;

  return `16歳男子が「${categoryLabel}」の言い訳を「${targetLabel}」に使いたい。
自然で即使える言い訳を1つ。100文字以内で、JSON形式:
{"excuse": "言い訳", "followUp": "追及対策", "credibilityScore": 3}`;
}

