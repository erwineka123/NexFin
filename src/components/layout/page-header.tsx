import { cn } from "@/lib/helpers/cn";

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  actions
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
          {eyebrow}
        </p>
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">{description}</p>
        </div>
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}

