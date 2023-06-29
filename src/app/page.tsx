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
          <PopoverTrigger>
            <button>Open</button>
          </PopoverTrigger>
        </Popover>
      </div>
    </main>
  );
}
