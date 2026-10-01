import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { MainHeader } from "@/components/home/MainHeader";
import { MegaMenu } from "@/components/home/MegaMenu";
import { MobileNav } from "@/components/home/MobileNav";
import { TopBar } from "@/components/home/TopBar";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header sticky top-0 z-40">
      <TopBar />
      <MainHeader onMenu={() => setMenuOpen(true)} />
      <MegaMenu />
      <MobileNav
        open={menuOpen}
        onOpen={() => setMenuOpen(true)}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}
