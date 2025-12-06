'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Category,
  Target,
  Urgency,
  Tone,
  ExcuseInput,
  ExcuseOutput,
  CATEGORY_LABELS,
  TARGET_LABELS,
  URGENCY_LABELS,
  TONE_LABELS,
} from '@/types';

type Step = 'category' | 'target' | 'options' | 'generating' | 'result';

export default function ExcuseGenerator() {
  const [step, setStep] = useState<Step>('category');
  const [category, setCategory] = useState<Category | null>(null);
  const [target, setTarget] = useState<Target | null>(null);
  const [urgency, setUrgency] = useState<Urgency>('medium');
  const [tone, setTone] = useState<Tone>('casual');
  const [customContext, setCustomContext] = useState('');
  const [result, setResult] = useState<ExcuseOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    if (cat === 'other') {
      // その他の場合はコンテキスト入力を求めるが、一旦スキップ
    }
    setStep('target');
  };

  const handleTargetSelect = (tgt: Target) => {
    setTarget(tgt);
    setStep('options');
  };

  const handleGenerate = useCallback(async () => {
    if (!category || !target) return;

    setStep('generating');
    setError(null);

    const input: ExcuseInput = {
      category,
      target,
      urgency,
      tone,
      customContext: category === 'other' ? customContext : undefined,
    };

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '生成に失敗しました');
      }

      const data = await res.json() as ExcuseOutput;
      setResult(data);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成に失敗しました');
      setStep('options');
    }
  }, [category, target, urgency, tone, customContext]);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.excuse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep('category');
    setCategory(null);
    setTarget(null);
    setUrgency('medium');
    setTone('casual');
    setCustomContext('');
    setResult(null);
    setError(null);
  };

  const stepNumber = {
    category: 0,
    target: 1,
    options: 2,
    generating: 3,
    result: 3,
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      {/* ステップインジケーター */}
      <div className="flex justify-center mb-8">
        <div className="step-indicator">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`step-dot ${
                stepNumber[step] === i ? 'active' : stepNumber[step] > i ? 'completed' : ''
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: カテゴリ選択 */}
        {step === 'category' && (
          <motion.div
            key="category"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-6 text-center">
              何の言い訳が必要？
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(CATEGORY_LABELS) as [Category, typeof CATEGORY_LABELS[Category]][]).map(
                ([key, { label, emoji }]) => (
                  <button
                    key={key}
                    onClick={() => handleCategorySelect(key)}
                    className="card p-4 text-left hover:scale-[1.02] transition-transform"
                  >
                    <span className="text-2xl mb-2 block">{emoji}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: 相手選択 */}
        {step === 'target' && (
          <motion.div
            key="target"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setStep('category')}
              className="text-zinc-500 text-sm mb-4 flex items-center gap-1 hover:text-zinc-300"
            >
              ← 戻る
            </button>
            <h2 className="text-xl font-bold mb-2 text-center">
              誰に言う？
            </h2>
            <p className="text-zinc-500 text-sm mb-6 text-center">
              {category && CATEGORY_LABELS[category].emoji} {category && CATEGORY_LABELS[category].label}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(TARGET_LABELS) as [Target, typeof TARGET_LABELS[Target]][]).map(
                ([key, { label, emoji }]) => (
                  <button
                    key={key}
                    onClick={() => handleTargetSelect(key)}
                    className="card p-4 text-left hover:scale-[1.02] transition-transform"
                  >
                    <span className="text-2xl mb-2 block">{emoji}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: オプション設定 */}
        {step === 'options' && (
          <motion.div
            key="options"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setStep('target')}
              className="text-zinc-500 text-sm mb-4 flex items-center gap-1 hover:text-zinc-300"
            >
              ← 戻る
            </button>
            <h2 className="text-xl font-bold mb-2 text-center">
              詳細設定
            </h2>
            <p className="text-zinc-500 text-sm mb-6 text-center">
              {category && CATEGORY_LABELS[category].emoji} → {target && TARGET_LABELS[target].emoji}
            </p>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-4 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* 緊急度 */}
            <div className="mb-6">
              <label className="text-sm text-zinc-400 mb-2 block">緊急度</label>
              <div className="flex gap-2">
                {(Object.entries(URGENCY_LABELS) as [Urgency, typeof URGENCY_LABELS[Urgency]][]).map(
                  ([key, { label, color }]) => (
                    <button
                      key={key}
                      onClick={() => setUrgency(key)}
                      className={`card flex-1 p-3 text-center text-sm ${
                        urgency === key ? 'card-selected' : ''
                      }`}
                    >
                      <span className={urgency === key ? color : 'text-zinc-400'}>
                        {label}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* トーン */}
            <div className="mb-8">
              <label className="text-sm text-zinc-400 mb-2 block">トーン</label>
              <div className="flex flex-col gap-2">
                {(Object.entries(TONE_LABELS) as [Tone, typeof TONE_LABELS[Tone]][]).map(
                  ([key, { label, description }]) => (
                    <button
                      key={key}
                      onClick={() => setTone(key)}
                      className={`card p-3 text-left ${
                        tone === key ? 'card-selected' : ''
                      }`}
                    >
                      <span className="font-medium text-sm">{label}</span>
                      <span className="text-zinc-500 text-xs ml-2">{description}</span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* その他の場合のコンテキスト入力 */}
            {category === 'other' && (
              <div className="mb-6">
                <label className="text-sm text-zinc-400 mb-2 block">
                  どんな状況？
                </label>
                <textarea
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                  placeholder="例：彼女との約束をドタキャンしたい"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-[--accent-cyan]"
                  rows={3}
                />
              </div>
            )}

            {/* 生成ボタン */}
            <button
              onClick={handleGenerate}
              className="btn-primary w-full text-lg glitch"
            >
              言い訳を生成する
            </button>
          </motion.div>
        )}

        {/* Step 4: 生成中 */}
        {step === 'generating' && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-[--accent-cyan] rounded-full loading-dot" />
              <div className="w-3 h-3 bg-[--accent-magenta] rounded-full loading-dot" />
              <div className="w-3 h-3 bg-[--accent-lime] rounded-full loading-dot" />
            </div>
            <p className="text-zinc-400 text-sm">最高の言い訳を考え中...</p>
          </motion.div>
        )}

        {/* Step 5: 結果表示 */}
        {step === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-6 text-center text-glow-cyan">
              言い訳が完成！
            </h2>

            {/* 言い訳本文 */}
            <div className="card p-5 mb-4 glow-cyan">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {result.excuse}
              </p>
            </div>

            {/* 信憑性スコア */}
            <div className="flex items-center justify-center gap-1 mb-4">
              <span className="text-zinc-500 text-sm mr-2">信憑性:</span>
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={i <= result.credibilityScore ? 'star-filled' : 'star-empty'}
                >
                  ★
                </span>
              ))}
            </div>

            {/* 補足アドバイス */}
            <div className="card p-4 mb-6 border-[--accent-magenta]/30">
              <p className="text-xs text-[--accent-magenta] mb-2 font-medium">
                💡 追及されたら...
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {result.followUp}
              </p>
            </div>

            {/* アクションボタン */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleCopy}
                className={`flex-1 card p-3 text-center font-medium transition-all ${
                  copied ? 'bg-[--accent-lime]/20 border-[--accent-lime]' : ''
                }`}
              >
                {copied ? '✓ コピーした！' : '📋 コピー'}
              </button>
              <button
                onClick={handleReset}
                className="flex-1 card p-3 text-center font-medium"
              >
                🔄 もう一度
              </button>
            </div>

            {/* SNSシェアボタン */}
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `言い訳AIで生成した言い訳👇\n\n「${result.excuse.slice(0, 100)}${result.excuse.length > 100 ? '...' : ''}」\n\n信憑性: ${'★'.repeat(result.credibilityScore)}${'☆'.repeat(5 - result.credibilityScore)}\n\n#言い訳AI`
                )}&url=${encodeURIComponent('https://iiwakeai.onrender.com')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 card p-3 text-center font-medium hover:bg-[#1da1f2]/20 hover:border-[#1da1f2] transition-all"
              >
                𝕏 シェア
              </a>
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent('https://iiwakeai.onrender.com')}&text=${encodeURIComponent(
                  `言い訳AIで生成👇\n\n「${result.excuse.slice(0, 100)}${result.excuse.length > 100 ? '...' : ''}」`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 card p-3 text-center font-medium hover:bg-[#00b900]/20 hover:border-[#00b900] transition-all"
              >
                LINE
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


