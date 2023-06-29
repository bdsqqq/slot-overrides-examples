'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Popover>
          <PopoverContent>
            <GatedContent />
          </PopoverContent>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
        </Popover>
      </div>
    </main>
  );
}

const GatedContent = () => {
  const [currentTab, setCurrentTab] = useState<'warn' | 'form'>('warn');

  return (
    <Tabs value={currentTab} defaultValue="warn">
      <TabsContent value="warn">
        Eh, can&apos;t do it man,{' '}
        <button className="underline" onClick={() => setCurrentTab('form')}>
          contact admin
        </button>
      </TabsContent>
      <TabsContent value="form">
        Pretend there&apos;s an useful form for contacting admin here
      </TabsContent>
    </Tabs>
  );
};
