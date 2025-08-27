'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { UsageData } from '@/lib/types';
import type { ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  Paracetamol: {
    label: 'Paracetamol',
    color: 'hsl(var(--chart-1))',
  },
  Amoxicillin: {
    label: 'Amoxicillin',
    color: 'hsl(var(--chart-2))',
  },
  Ibuprofen: {
    label: 'Ibuprofen',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function UsageChart({ data }: { data: UsageData[] }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Paracetamol" fill="var(--color-Paracetamol)" radius={4} />
        <Bar dataKey="Amoxicillin" fill="var(--color-Amoxicillin)" radius={4} />
        <Bar dataKey="Ibuprofen" fill="var(--color-Ibuprofen)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
