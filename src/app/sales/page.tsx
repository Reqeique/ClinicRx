import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { salesData } from '@/lib/data';
import { format } from 'date-fns';
import { NewSaleDialog } from './new-sale-dialog';

export default function SalesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Sales Receipts"
        description="Record and view all medicine sales."
      >
        <NewSaleDialog />
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>A list of the most recent sales transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sale ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Payment Ref</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{format(new Date(sale.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{sale.items.reduce((acc, item) => acc + item.quantity, 0)}</TableCell>
                  <TableCell>{sale.paymentRef}</TableCell>
                  <TableCell className="text-right">${sale.totalAmount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
