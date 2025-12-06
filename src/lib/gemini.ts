import { GoogleGenAI } from '@google/genai';
import { ExcuseInput, ExcuseOutput } from '@/types';
import { buildPrompt } from './prompts';

// Gemini クライアントの初期化
const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }
  return new GoogleGenAI({ apiKey });
};

export async function generateExcuse(input: ExcuseInput): Promise<ExcuseOutput> {
  const client = getClient();
  
  const prompt = buildPrompt({
    category: input.category,
    target: input.target,
    urgency: input.urgency,
    tone: input.tone,
    customContext: input.customContext,
  });

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',  // 無料枠あり、最新最強
      contents: prompt,
      config: {
        // JSON出力を強制
        responseMimeType: 'application/json',
        responseJsonSchema: {
          type: 'object',
          properties: {
            excuse: { type: 'string', description: '言い訳本文' },
            followUp: { type: 'string', description: '追及対策アドバイス' },
            credibilityScore: { type: 'integer', description: '信憑性スコア1-5' },
          },
          required: ['excuse', 'followUp', 'credibilityScore'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    const result = JSON.parse(text) as ExcuseOutput;
    
    // バリデーション
    if (!result.excuse || !result.followUp || typeof result.credibilityScore !== 'number') {
      throw new Error('Invalid response structure');
    }
    
    // スコアを1-5の範囲に収める
    result.credibilityScore = Math.max(1, Math.min(5, result.credibilityScore));
    
    return result;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('言い訳の生成に失敗しました。もう一度お試しください。');
  }
}

