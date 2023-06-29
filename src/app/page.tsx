'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Slot } from '@/lib/Slot';
import { useState } from 'react';

const NoPermissionFeedback = () => {
  const [currentTab, setCurrentTab] = useState<'warn' | 'form'>('warn');

  return (
    <Tabs value={currentTab} defaultValue="warn">
      <TabsContent value="warn">
        Eh, can&apos;t do it man,{' '}
        <Button variant={'link'} onClick={() => setCurrentTab('form')}>
          contact admin
        </Button>
      </TabsContent>
      <TabsContent value="form">
        Pretend there&apos;s an useful form for contacting admin here
      </TabsContent>
    </Tabs>
  );
};

export default function Page() {
  const [canAddTeam, setCanAddTeam] = useState(true);

  const [teamAmmount, setTeamAmmount] = useState(1);
  const addTeam = () => {
    setTeamAmmount((prev) => prev + 1);
  };
  const resetTeams = () => {
    setTeamAmmount(1);
  };
  const teamLimit = 3;
  const hasReachedTeamLimit = teamAmmount >= teamLimit;

  let LockedFeedback;
  let locked = false;

  if (!canAddTeam) {
    locked = true;
    LockedFeedback = <NoPermissionFeedback />;
  }

  if (canAddTeam && hasReachedTeamLimit) {
    locked = true;
    LockedFeedback = (
      <>
        <p>Team limit reached</p>
        <Button onClick={resetTeams} size="sm" variant={'destructive'}>
          Reset
        </Button>
        <p>
          or
          <Button
            onClick={() =>
              alert(
                'pretend this takes you to /billing or asks for your credit card or something'
              )
            }
            size="sm"
          >
            upgrade
          </Button>
        </p>
      </>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex gap-16">
        <ul>
          <li>you can add up to 3 teams</li>
          <li>you can&apos;t add teams if you don&apos;t have permission</li>
          <li>you can&apos;t add teams if you&apos;ve reached the limit</li>
        </ul>

        <ul>
          <li className="flex items-center gap-2">
            can manage teams:{' '}
            <span className="w-8">{canAddTeam ? 'yes' : 'no'}</span>{' '}
            <Button
              variant="secondary"
              onClick={() => {
                setCanAddTeam((prev) => !prev);
              }}
            >
              Toggle
            </Button>
          </li>
          <li className="flex items-center gap-2">
            locked: <span className="w-8">{locked ? 'yes' : 'no'}</span>
          </li>
        </ul>
      </section>
      <div className="flex gap-16">
        <Lock locked={locked} lockedFeedback={LockedFeedback}>
          <Button aria-disabled={locked} onClick={addTeam}>
            Add new team
          </Button>
        </Lock>

        <p className="tabular-nums">Team ammount: {teamAmmount}</p>
      </div>
    </main>
  );
}

const Lock = ({
  children,
  locked,
  lockedFeedback,
}: React.PropsWithChildren<{
  locked: boolean;
  lockedFeedback: React.ReactNode;
}>) => {
  if (!locked) return <>{children}</>;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Slot
          onClick={() => {
            // absolutely nothing lol
          }}
          dangerouslyoverridehandlersinsteadofcomposing={['onClick']}
        >
          {children}
        </Slot>
      </PopoverTrigger>
      <PopoverContent>{lockedFeedback}</PopoverContent>
    </Popover>
  );
};
