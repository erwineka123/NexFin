import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/helpers/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border text-foreground",
        warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
        destructive: "bg-rose-500/10 text-rose-700 dark:text-rose-300"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

