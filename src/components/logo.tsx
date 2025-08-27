import { HeartPulse } from 'lucide-react';
import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary transition-colors duration-300">
        <HeartPulse className="h-5 w-5" />
      </div>
      <h1 className="text-xl font-bold text-foreground transition-opacity duration-300 group-data-[collapsible=icon]:hidden">
        ClinicRx
      </h1>
    </div>
  );
}
