import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { FileDown } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reports"
        description="Generate and export sales, stock, and audit reports."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Sales Report</CardTitle>
            <CardDescription>Export a detailed report of all sales transactions within a specific date range.</CardDescription>
          </CardHeader>
          <CardContent>
            <DatePickerWithRange />
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <FileDown className="mr-2 h-4 w-4" /> Export Excel
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock Report</CardTitle>
            <CardDescription>Generate a snapshot of your current inventory levels, including quantities and status.</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[56px] items-center justify-center">
            <p className="text-sm text-muted-foreground">Report includes all stock items.</p>
          </CardContent>
           <CardFooter>
            <Button className="w-full">
              <FileDown className="mr-2 h-4 w-4" /> Export Excel
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit Export</CardTitle>
            <CardDescription>Export a comprehensive CSV file suitable for auditing purposes, covering all transactions.</CardDescription>
          </CardHeader>
          <CardContent>
             <DatePickerWithRange />
          </CardContent>
           <CardFooter>
            <Button className="w-full" variant="destructive">
              <FileDown className="mr-2 h-4 w-4" /> Export Audit CSV
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
