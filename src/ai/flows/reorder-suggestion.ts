// 'use server';
/**
 * @fileOverview AI-powered reorder suggestion flow for clinic administrators.
 *
 * - getReorderSuggestion - A function that takes sales and stock reports and returns a reorder suggestion.
 * - ReorderSuggestionInput - The input type for the getReorderSuggestion function.
 * - ReorderSuggestionOutput - The return type for the getReorderSuggestion function.
 */

'use server';
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReorderSuggestionInputSchema = z.object({
  salesReport: z
    .string()
    .describe('The sales report data, including medicine names and quantities sold.'),
  stockReport: z
    .string()
    .describe('The stock report data, including medicine names, quantities in stock, and expiry dates.'),
});
export type ReorderSuggestionInput = z.infer<typeof ReorderSuggestionInputSchema>;

const ReorderSuggestionOutputSchema = z.object({
  reorderSuggestion: z
    .string()
    .describe(
      'The AI-powered reorder suggestion, including medicine names and recommended quantities to reorder.'
    ),
});
export type ReorderSuggestionOutput = z.infer<typeof ReorderSuggestionOutputSchema>;

export async function getReorderSuggestion(
  input: ReorderSuggestionInput
): Promise<ReorderSuggestionOutput> {
  return reorderSuggestionFlow(input);
}

const reorderSuggestionPrompt = ai.definePrompt({
  name: 'reorderSuggestionPrompt',
  input: {schema: ReorderSuggestionInputSchema},
  output: {schema: ReorderSuggestionOutputSchema},
  prompt: `You are an AI assistant helping clinic administrators with reorder suggestions.

  Analyze the sales report and stock report data to generate a reorder suggestion.
  Consider the medicine names, quantities sold, quantities in stock, and expiry dates.

  Sales Report:
  {{salesReport}}

  Stock Report:
  {{stockReport}}

  Reorder Suggestion:`, // Ensure clear instructions
});

const reorderSuggestionFlow = ai.defineFlow(
  {
    name: 'reorderSuggestionFlow',
    inputSchema: ReorderSuggestionInputSchema,
    outputSchema: ReorderSuggestionOutputSchema,
  },
  async input => {
    const {output} = await reorderSuggestionPrompt(input);
    return output!;
  }
);
