'use server';

import { getReorderSuggestion } from '@/ai/flows/reorder-suggestion';
import { z } from 'zod';

const formSchema = z.object({
  salesReport: z.string(),
  stockReport: z.string(),
});

export async function generateSuggestionAction(data: z.infer<typeof formSchema>) {
  try {
    const result = await getReorderSuggestion(data);
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}
