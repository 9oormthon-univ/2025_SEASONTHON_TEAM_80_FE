import type { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { routeBg } from "./backgrounds";

export default function AppShell({ children }: PropsWithChildren) {
  const { pathname } = useLocation();

  const bgUrl =
    routeBg[pathname] ??
    Object.entries(routeBg).find(
      ([key]) => key !== "/" && pathname.startsWith(key)
    )?.[1];

  const isLetterSearch = pathname === '/letter/search';

  return (
    <div className={`h-dvh overflow-hidden ${isLetterSearch ? 'bg-white text-black' : 'bg-[#412716] text-white'}`}>
      <main
        className={`mx-auto h-full w-full max-w-[393px] bg-center bg-cover bg-no-repeat ${isLetterSearch ? '' : 'p-4'}`}
        style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
      >
        {children}
      </main>
    </div>
  );
}
