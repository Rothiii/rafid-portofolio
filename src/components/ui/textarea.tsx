import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-theme-fg/10 bg-stone-100 dark:bg-primary px-4 py-6 text-base" +
            " ring-primary placeholder:text-theme-fg/40" +
            " focus-visible:outline-none" +
            " focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-0" +
            " disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
