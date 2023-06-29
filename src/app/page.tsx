import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Popover>
          <PopoverContent>hej do</PopoverContent>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
        </Popover>
      </div>
    </main>
  );
}
