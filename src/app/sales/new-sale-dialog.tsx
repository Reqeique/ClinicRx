'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { inventoryData } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import React from 'react';

export function NewSaleDialog() {
  const [isOpen, setIsOpen] = React.useState(false);

  const availableItems = inventoryData.filter(item => item.status === 'In Stock' || item.status === 'Low Stock');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Record New Sale</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record a New Sale</DialogTitle>
          <DialogDescription>
            Select medicines, enter quantities, and add payment details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="medicine" className="text-right">
              Medicine
            </Label>
            <Select>
                <SelectTrigger id="medicine" className="col-span-3">
                    <SelectValue placeholder="Select a medicine" />
                </SelectTrigger>
                <SelectContent>
                    {availableItems.map(item => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input id="quantity" type="number" defaultValue="1" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="payment-ref" className="text-right">
              Payment Ref.
            </Label>
            <Input id="payment-ref" placeholder="e.g., MPESA-XYZ123" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setIsOpen(false)}>Save Sale</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
