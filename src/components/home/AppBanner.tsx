import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { homeFocus } from "@/components/home/shared";
import { cn } from "@/lib/utils";

const KEY = "nuzz-app-strip";

export function AppNotice() {
  const [showStrip, setShowStrip] = useState(false);

  useEffect(() => {
    setShowStrip(window.sessionStorage.getItem(KEY) !== "1");
  }, []);

  if (!showStrip) return null;

  return (
    <div className="flex items-center justify-between gap-3 bg-[var(--home-ink)] px-4 py-2 text-xs text-white md:hidden">
      <p>Get order updates on your phone. Shop in the browser for now.</p>
      <button
        type="button"
        aria-label="Dismiss app notice"
        className={cn("grid h-8 w-8 shrink-0 place-items-center", homeFocus)}
        onClick={() => {
          window.sessionStorage.setItem(KEY, "1");
          setShowStrip(false);
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
