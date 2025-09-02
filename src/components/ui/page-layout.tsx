import type { ReactNode } from "react";
import { BackButton } from "@/components/ui/back-button";

interface PageLayoutProps {
  title: ReactNode;
  children?: ReactNode;
  bottomContent?: ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  children,
  bottomContent,
  className = "",
}: PageLayoutProps) {
  return (
    <div
      className={`relative flex h-full w-full flex-col pt-26 sm:pt-36 md:pt-40 ${className}`}
    >
      <BackButton />
      <p className="mt-3 font-primary text-[32px] text-red-200 leading-12">
        {title}
      </p>

      {children && <div className="flex-1">{children}</div>}

      {bottomContent && <div className="mt-auto pb-4">{bottomContent}</div>}
    </div>
  );
}
