import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo/nuzzstorylogo-removebg.png";
import { cn } from "@/lib/utils";

type BrandLockupProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLockup({ compact = false, className }: BrandLockupProps) {
  return (
    <Link
      to="/"
      aria-label="The Nuzz Story"
      className={cn("flex shrink-0 items-center", className)}
    >
      <img
        src={logo}
        alt="The Nuzz Story"
        className={cn(
          "w-auto object-contain",
          compact ? "h-8 max-w-[150px] md:h-12 md:max-w-[240px]" : "h-12 max-w-[240px]",
        )}
      />
    </Link>
  );
}
