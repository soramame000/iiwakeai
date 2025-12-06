import { NextRequest, NextResponse } from 'next/server';
import { generateExcuse } from '@/lib/gemini';
import { ExcuseInput } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ExcuseInput;
    
    // バリデーション
    if (!body.category || !body.target || !body.urgency || !body.tone) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    const result = await generateExcuse(body);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '生成に失敗しました' },
      { status: 500 }
    );
  }
}

