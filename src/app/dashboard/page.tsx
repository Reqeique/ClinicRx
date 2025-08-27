import { PageHeader } from '@/components/page-header';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { inventoryData, usageHistoryData } from '@/lib/data';
import type { InventoryItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { differenceInDays, parseISO } from 'date-fns';
import { CircleAlert, PackageCheck, Skull, TrendingUp } from 'lucide-react';
import { UsageChart } from './usage-chart';

function getStatusBadge(item: InventoryItem) {
  const daysToExpiry = differenceInDays(parseISO(item.expiryDate), new Date());

  if (daysToExpiry <= 0) {
    return <Badge variant="destructive">Expired</Badge>;
  }
  if (daysToExpiry <= 30) {
    return <Badge variant="destructive" className="bg-orange-500 text-white">Expires Soon</Badge>;
  }
  if (item.status === 'Low Stock') {
    return <Badge className="bg-yellow-500 text-black">Low Stock</Badge>;
  }
  return <Badge variant="secondary">In Stock</Badge>;
}

export default function DashboardPage() {
  const stats = {
    totalSKUs: inventoryData.length,
    lowStockItems: inventoryData.filter(item => item.status === 'Low Stock').length,
    expiredItems: inventoryData.filter(item => differenceInDays(parseISO(item.expiryDate), new Date()) <= 0).length,
  };

  const nearingExpiry = inventoryData
    .map(item => ({...item, daysToExpiry: differenceInDays(parseISO(item.expiryDate), new Date())}))
    .filter(item => item.daysToExpiry > 0 && item.daysToExpiry <= 90)
    .sort((a, b) => a.daysToExpiry - b.daysToExpiry);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard" description="Welcome back! Here's an overview of your clinic's inventory." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SKUs</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSKUs}</div>
            <p className="text-xs text-muted-foreground">different medicines in inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <CircleAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">items need reordering soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Stock</CardTitle>
            <Skull className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expiredItems}</div>
            <p className="text-xs text-muted-foreground">items past their expiry date</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5"/>
              Medicine Usage History
            </CardTitle>
            <CardDescription>Usage trends for the top medicines over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <UsageChart data={usageHistoryData} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Nearing Expiry</CardTitle>
            <CardDescription>Medicines that will expire in the next 90 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>
                  <TableHead className="text-right">Expires In</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nearingExpiry.slice(0, 5).map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      {getStatusBadge(item)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
