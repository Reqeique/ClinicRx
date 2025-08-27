'use client';

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { SidebarNav } from './sidebar-nav';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4">
           <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/100" alt="Admin" data-ai-hint="person portrait" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 items-center justify-between group-data-[collapsible=icon]:hidden">
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-sidebar-foreground">Admin User</span>
                  <span className="text-xs text-muted-foreground">admin@clinicrx.com</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-start gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          {/* Page-specific header content can be added here */}
        </header>
        <div className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6">
                {children}
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
