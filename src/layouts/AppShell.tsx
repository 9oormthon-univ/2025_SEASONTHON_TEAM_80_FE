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

  const isLetterSearch =
    pathname === "/letter/search" ||
    pathname.startsWith("/join/letter/search") ||
    pathname.startsWith("/letter/search");
  const isUserPage = pathname.startsWith("/user");
  const isErrorPage =
    !routeBg[pathname] &&
    !Object.entries(routeBg).find(
      ([key]) => key !== "/" && pathname.startsWith(key)
    ) &&
    pathname !== "/letter/search" &&
    pathname !== "/";
  const shouldRemovePadding = isLetterSearch || isErrorPage || isUserPage;

  return (
    <div
      className={`h-dvh overflow-hidden ${isLetterSearch ? "bg-white text-black" : pathname === "/" ? "bg-[#212E5A] text-white" : "bg-[#412716] text-white"}`}
    >
      <main
        className={`relative mx-auto h-full w-full max-w-[450px] bg-center bg-cover bg-no-repeat ${shouldRemovePadding ? "" : "p-4"}`}
        style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
      >
        {children}
      </main>
    </div>
  );
}
