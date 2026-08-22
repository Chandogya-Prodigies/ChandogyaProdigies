import type { LucideIcon } from "lucide-react";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-serif text-sm font-semibold uppercase tracking-[0.28em] text-[#C18A4A] dark:text-[#D4A72C]">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#75695F] dark:text-[#CDBB9E]">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function EmptyAdminState({ label }: { label: string }) {
  return (
    <p className="rounded-2xl bg-[#FFF8E6] p-5 text-sm leading-6 text-[#75695F] dark:bg-[#160C07] dark:text-[#CDBB9E]">
      {label}
    </p>
  );
}

export function AdminStatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <article className="rounded-[22px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C]">
      <Icon className="h-6 w-6 text-[#C18A4A] dark:text-[#D4A72C]" />
      <p className="mt-5 text-4xl font-bold">{value}</p>
      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#8B7C70] dark:text-[#BBA98D]">
        {label}
      </p>
      <p className="mt-3 text-sm text-[#75695F] dark:text-[#CDBB9E]">
        {detail}
      </p>
    </article>
  );
}
