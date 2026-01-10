import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "bg-bg-card text-text-main rounded-main border border-border shadow-sm p-card",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";