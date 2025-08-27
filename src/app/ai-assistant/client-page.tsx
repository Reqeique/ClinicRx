'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { generateSuggestionAction } from './actions';
import type { ReorderSuggestionOutput } from '@/ai/flows/reorder-suggestion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  salesReport: z.string().min(10, 'Sales report data is required.'),
  stockReport: z.string().min(10, 'Stock report data is required.'),
});

type AIClientPageProps = {
  salesReportData: string;
  stockReportData: string;
};

export function AIClientPage({ salesReportData, stockReportData }: AIClientPageProps) {
  const [suggestion, setSuggestion] = useState<ReorderSuggestionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salesReport: salesReportData || '',
      stockReport: stockReportData || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const result = await generateSuggestionAction(values);

    if (result.success) {
      setSuggestion(result.data);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Provide Data</CardTitle>
              <CardDescription>
                Your current sales and stock reports are pre-filled below. Click generate to get a suggestion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="salesReport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales Report</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Paracetamol 500mg - 20 units sold, Amoxicillin 250mg - 15 units sold'"
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stockReport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Report</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Paracetamol 500mg - 80 units in stock (exp 2025-12), Amoxicillin 250mg - 25 units in stock (exp 2024-11)'"
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Suggestion
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div className="flex flex-col gap-6">
        {isLoading && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center animate-pulse">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">AI is thinking...</p>
            </div>
        )}

        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {suggestion && (
            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                        <Sparkles className="h-5 w-5" />
                        AI Reorder Suggestion
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap font-medium text-foreground/80">
                        {suggestion.reorderSuggestion}
                    </p>
                </CardContent>
            </Card>
        )}

        {!isLoading && !suggestion && !error && (
             <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your reorder suggestion will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
}
