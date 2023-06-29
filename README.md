Example created for the [PR #2234 on Radix primitives](https://github.com/radix-ui/primitives/pull/2234).

The highlight of this example is the `<Lock>` component in [/src/app/page.tsx](https://github.com/bdsqqq/slot-overrides-examples/blob/main/src/app/page.tsx#L131):
```tsx
const Lock = forwardRef<
  HTMLElement,
  React.PropsWithChildren<{
    locked: boolean;
    lockedFeedback: React.ReactNode;
  }>
>(({ children, locked, lockedFeedback, ...rest }, ref) => {
  if (!locked) return <>{children}</>;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Slot
          onClick={() => {
            // Absolutely nothing lol
          }}
          dangerouslyoverridehandlersinsteadofcomposing={['onClick']}
          {...rest}
          ref={ref}
        >
          {children}
        </Slot>
      </PopoverTrigger>
      <PopoverContent>{lockedFeedback}</PopoverContent>
    </Popover>
  );
});
```

This component allows for the composition of behavior with any tags that use `onClick`, conditionally preventing their handler from running while providing useful feedback through a popover.

A usage example is:
```tsx
<Lock locked={locked} lockedFeedback={LockedFeedback}>
  <Button aria-disabled={locked} onClick={addTeam}>
    Add new team
  </Button>
</Lock>
```
where `locked` is computed from user permissions and `LockedFeedback` provides contextual actions that surface solutions to each reason that can result in `locked == true` (this can be combined with an exhaustive pattern-matching solution like [ts-pattern](https://github.com/gvergnaud/ts-pattern) for better developer experience and type safety, but I chose not to include it for the sake of simplicity.)
