import { Link } from "@tanstack/react-router";

export function TopBar() {
  return (
    <div className="hidden items-center justify-between gap-4 bg-[var(--nav-blue-deep)] px-5 py-1.5 text-[11px] text-white md:flex lg:px-[62px]">
      <nav aria-label="Store links" className="flex items-center gap-4">
        <Link to="/about" className="hover:text-white/80">
          Adopt
        </Link>
        <Link to="/contact" className="hover:text-white/80">
          Store locator
        </Link>
        <Link to="/account/orders" className="hover:text-white/80">
          Track order
        </Link>
      </nav>
      <p className="text-[var(--nav-muted)]">Free delivery above ₹499 · Subscribe &amp; Save 10%</p>
    </div>
  );
}
