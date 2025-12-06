// 言い訳生成の入力型
export type Category = 
  | 'late_absent'      // 遅刻・欠席
  | 'homework'         // 宿題・提出物
  | 'decline_friend'   // 誘い断り（友達）
  | 'decline_romantic' // 誘い断り（異性）
  | 'decline_family'   // 誘い断り（家族）
  | 'work_leave'       // バイト休み・早退
  | 'other';           // その他

export type Target = 
  | 'parent'    // 親
  | 'teacher'   // 教師
  | 'friend'    // 友達
  | 'work'      // バイト先
  | 'romantic'; // 異性

export type Urgency = 'low' | 'medium' | 'high';

export type Tone = 'polite' | 'casual' | 'apologetic';

export interface ExcuseInput {
  category: Category;
  target: Target;
  urgency: Urgency;
  tone: Tone;
  customContext?: string; // その他の場合の詳細
}

// 言い訳生成の出力型
export interface ExcuseOutput {
  excuse: string;           // 言い訳本文（100-300文字）
  followUp: string;         // 補足アドバイス（追及への返答）
  credibilityScore: number; // 信憑性スコア（1-5）
}

// カテゴリのラベル定義
export const CATEGORY_LABELS: Record<Category, { label: string; emoji: string }> = {
  late_absent: { label: '遅刻・欠席', emoji: '⏰' },
  homework: { label: '宿題・提出物', emoji: '📚' },
  decline_friend: { label: '友達の誘い断り', emoji: '👋' },
  decline_romantic: { label: '異性の誘い断り', emoji: '💔' },
  decline_family: { label: '家族の誘い断り', emoji: '🏠' },
  work_leave: { label: 'バイト休み・早退', emoji: '💼' },
  other: { label: 'その他', emoji: '✨' },
};

// ターゲットのラベル定義
export const TARGET_LABELS: Record<Target, { label: string; emoji: string }> = {
  parent: { label: '親', emoji: '👨‍👩‍👦' },
  teacher: { label: '先生', emoji: '👨‍🏫' },
  friend: { label: '友達', emoji: '🤝' },
  work: { label: 'バイト先', emoji: '🏪' },
  romantic: { label: '好きな人', emoji: '💕' },
};

// 緊急度のラベル定義
export const URGENCY_LABELS: Record<Urgency, { label: string; color: string }> = {
  low: { label: '余裕あり', color: 'text-green-400' },
  medium: { label: '急ぎ', color: 'text-yellow-400' },
  high: { label: '今すぐ！', color: 'text-red-400' },
};

// トーンのラベル定義
export const TONE_LABELS: Record<Tone, { label: string; description: string }> = {
  polite: { label: '丁寧', description: '敬語多め、礼儀正しく' },
  casual: { label: 'カジュアル', description: 'フランク、軽めに' },
  apologetic: { label: '謝罪重視', description: '申し訳なさ全開' },
};


