'use server';
/**
 * @fileOverview An AI agent that analyzes an image of a medicine shelf.
 *
 * - analyzeShelf - A function that handles the shelf analysis process.
 * - AnalyzeShelfInput - The input type for the analyzeShelf function.
 * - AnalyzeShelfOutput - The return type for the analyzeShelf function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeShelfInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a medicine shelf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  inventoryList: z.string().describe('A stringified JSON array of the current inventory items (name, sku, quantity).'),
});
export type AnalyzeShelfInput = z.infer<typeof AnalyzeShelfInputSchema>;

const DetectedItemSchema = z.object({
    name: z.string().describe('The name of the detected medicine.'),
    quantity: z.number().describe('The detected quantity of this medicine.'),
});

const MismatchItemSchema = z.object({
    name: z.string().describe('The name of the medicine with a mismatch.'),
    sku: z.string().describe('The SKU of the medicine.'),
    expectedQuantity: z.number().describe('The quantity expected from the inventory list.'),
    actualQuantity: z.number().describe('The quantity detected in the photo.'),
    reason: z.string().describe('The reason for the mismatch (e.g., Wrong quantity, Unlogged sale, Expired item).'),
});

const AnalyzeShelfOutputSchema = z.object({
    analysisSummary: z.string().describe('A brief summary of the findings.'),
    detectedItems: z.array(DetectedItemSchema).describe('A list of all items detected in the photo.'),
    mismatchedItems: z.array(MismatchItemSchema).describe('A list of items where the detected quantity does not match the inventory list.'),
});
export type AnalyzeShelfOutput = z.infer<typeof AnalyzeShelfOutputSchema>;


export async function analyzeShelf(input: AnalyzeShelfInput): Promise<AnalyzeShelfOutput> {
  return analyzeShelfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeShelfPrompt',
  input: { schema: AnalyzeShelfInputSchema },
  output: { schema: AnalyzeShelfOutputSchema },
  prompt: `You are a Smart Inventory Copilot for a pharmacy. Your task is to analyze a photo of a medicine shelf and compare it with the provided digital inventory list.

  Instructions:
  1.  **Analyze the Photo**: Use your vision capabilities to identify all medicine packs and bottles on the shelf.
  2.  **Count Items**: For each identified medicine, count the number of units (packs/bottles).
  3.  **Compare with Inventory**: Compare the detected items and quantities with the digital inventory list provided.
  4.  **Identify Mismatches**: Create a list of any discrepancies. A mismatch can be a wrong quantity, or an item seen in the photo but not in the inventory (or vice-versa). For mismatches, suggest a likely reason (e.g., "Wrong quantity", "Potential unlogged sale", "Item not in inventory").
  5.  **Generate a Summary**: Provide a concise summary of your findings.

  Current Digital Inventory (JSON format):
  {{{inventoryList}}}

  Analyze the following image:
  Photo: {{media url=photoDataUri}}
  `,
});


const analyzeShelfFlow = ai.defineFlow(
  {
    name: 'analyzeShelfFlow',
    inputSchema: AnalyzeShelfInputSchema,
    outputSchema: AnalyzeShelfOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
