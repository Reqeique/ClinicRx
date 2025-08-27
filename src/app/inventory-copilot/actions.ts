'use server';

import { analyzeShelf, type AnalyzeShelfInput } from '@/ai/flows/inventory-copilot';

export async function analyzeShelfAction(data: AnalyzeShelfInput) {
  try {
    const result = await analyzeShelf(data);
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}
