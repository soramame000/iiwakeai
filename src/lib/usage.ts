// 使用回数管理（localStorage版）
// 後でSupabaseに移行可能な設計

const STORAGE_KEY = 'iiwakeai_usage';
const DAILY_LIMIT = 3;

interface UsageData {
  date: string; // YYYY-MM-DD
  count: number;
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getUsageData(): UsageData {
  if (typeof window === 'undefined') {
    return { date: getTodayString(), count: 0 };
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { date: getTodayString(), count: 0 };
  }
  
  try {
    const data = JSON.parse(stored) as UsageData;
    // 日付が変わっていたらリセット
    if (data.date !== getTodayString()) {
      return { date: getTodayString(), count: 0 };
    }
    return data;
  } catch {
    return { date: getTodayString(), count: 0 };
  }
}

function saveUsageData(data: UsageData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getRemainingCount(): number {
  const data = getUsageData();
  return Math.max(0, DAILY_LIMIT - data.count);
}

export function canGenerate(): boolean {
  return getRemainingCount() > 0;
}

export function incrementUsage(): void {
  const data = getUsageData();
  data.count += 1;
  saveUsageData(data);
}

export function getDailyLimit(): number {
  return DAILY_LIMIT;
}

