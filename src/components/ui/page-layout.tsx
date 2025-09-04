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
      className={`dynamic-padding-top relative flex h-full w-full flex-col min-[451px]:md:pt-48 min-[451px]:sm:pt-44 ${className}`}
    >
      <BackButton />
      <p className="mt-3 font-primary text-[32px] text-red-200 leading-12">
        {title}
      </p>

      {children && <div className="flex-1">{children}</div>}

      {bottomContent && (
        <div className="z-10 mt-auto pb-4">{bottomContent}</div>
      )}
    </div>
  );
}
