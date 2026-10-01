import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { BrandLockup } from "@/components/BrandLockup";
import { STORE } from "@/data/catalog";
import { cn } from "@/lib/utils";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
    </svg>
  );
}

const socialLinks = [
  {
    Icon: InstagramIcon,
    href: "https://www.instagram.com/thenuzzstory/",
    label: "Instagram",
  },
  {
    Icon: FacebookIcon,
    href: "https://www.facebook.com/people/The-Nuzz-Story/61590037156313/",
    label: "Facebook",
  },
] as const;

const shopLinks = [
  { label: "Dogs", to: "/category/$slug" as const, slug: "dog-food" as const },
  { label: "Cats", to: "/category/$slug" as const, slug: "cat-food" as const },
  { label: "Food", to: "/category/$slug" as const, slug: "dog-food" as const },
  { label: "Treats", to: "/category/$slug" as const, slug: "dog-food" as const },
  { label: "Toys", to: "/category/$slug" as const, slug: "toys" as const },
  { label: "Grooming", to: "/grooming" as const },
  { label: "Accessories", to: "/category/$slug" as const, slug: "accessories" as const },
];

function FooterLink({
  to,
  slug,
  children,
}: {
  to:
    | "/category/$slug"
    | "/grooming"
    | "/contact"
    | "/faq"
    | "/shipping"
    | "/account/orders"
    | "/about"
    | "/privacy"
    | "/account/login";
  slug?: "dog-food" | "cat-food" | "toys" | "accessories";
  children: string;
}) {
  if (to === "/category/$slug" && slug) {
    return (
      <Link to={to} params={{ slug }} className="hover:opacity-80">
        {children}
      </Link>
    );
  }
  if (to === "/category/$slug") return null;
  return (
    <Link to={to} className="hover:opacity-80">
      {children}
    </Link>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="mt-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast.error("Enter a valid email address.");
          return;
        }
        setEmail("");
        toast.success("You're on the list.");
      }}
    >
      <p className="text-xs text-[#c79236]/80">Store news and restocks. No weekly spam.</p>
      <div className="mt-2 flex gap-2">
        <label className="sr-only" htmlFor="footer-email">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="h-10 min-w-0 flex-1 rounded-lg border border-[#c79236]/40 bg-transparent px-3 text-sm text-white outline-none placeholder:text-[#c79236]/50"
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-lg bg-[#c79236] px-3 text-sm font-semibold text-[#0d1b4b]"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}

export function Footer() {
  return (
    <footer
      className={cn(
        "mt-10 border-t border-[#0d1b4b] bg-[rgb(13,27,75)] text-[#c79236] sm:mt-16",
        "max-md:pb-16",
      )}
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-3 py-8 sm:px-4 sm:py-12 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
        <div>
          <BrandLockup />
          <p className="mt-3 max-w-xs text-xs italic text-[#c79236]/80 sm:text-sm">
            A neighbourhood pet store gone online — genuine food, gentle grooming and vet-reviewed
            care for dogs and cats.
          </p>
          <div className="mt-4 flex gap-2">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-[#c79236]/40 text-[#c79236] transition-colors hover:bg-[#c79236]/10"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <Newsletter />
          <p className="mt-4 text-xs text-[#c79236]/80">
            Order updates live in your account.{" "}
            <Link to="/account/login" className="font-semibold underline-offset-2 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-[#c79236]">Shop</h4>
          <ul className="mt-3 space-y-1.5 text-xs text-[#c79236]/85 sm:mt-4 sm:space-y-2 sm:text-sm">
            {shopLinks.map((link) => (
              <li key={link.label}>
                {"slug" in link ? (
                  <FooterLink to={link.to} slug={link.slug}>
                    {link.label}
                  </FooterLink>
                ) : (
                  <FooterLink to={link.to}>{link.label}</FooterLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-[#c79236]">
            Help &amp; Support
          </h4>
          <ul className="mt-3 space-y-1.5 text-xs text-[#c79236]/85 sm:mt-4 sm:space-y-2 sm:text-sm">
            <li>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </li>
            <li>
              <FooterLink to="/faq">FAQs</FooterLink>
            </li>
            <li>
              <FooterLink to="/shipping">Shipping</FooterLink>
            </li>
            <li>
              <FooterLink to="/shipping">Returns</FooterLink>
            </li>
            <li>
              <FooterLink to="/account/orders">Track Order</FooterLink>
            </li>
          </ul>
          <h4 className="mt-6 text-sm font-bold uppercase tracking-wide text-[#c79236]">Company</h4>
          <ul className="mt-3 space-y-1.5 text-xs text-[#c79236]/85 sm:space-y-2 sm:text-sm">
            <li>
              <FooterLink to="/about">About Us</FooterLink>
            </li>
            <li>
              <FooterLink to="/about">Our Story</FooterLink>
            </li>
            <li>
              <FooterLink to="/contact">Careers</FooterLink>
            </li>
            <li>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
            </li>
            <li>
              <FooterLink to="/privacy">Terms &amp; Conditions</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-[#c79236]">
            Visit our store
          </h4>
          <ul className="mt-3 space-y-2 text-xs text-[#c79236]/85 sm:mt-4 sm:space-y-3 sm:text-sm">
            <li className="flex gap-2">
              <MapPin size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#c79236]" />
              {STORE.address}
            </li>
            <li className="flex gap-2">
              <Clock size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#c79236]" />
              {STORE.hours}
            </li>
            <li className="flex gap-2">
              <Phone size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#c79236]" />
              {STORE.phone}
            </li>
            <li className="flex gap-2">
              <Mail size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#c79236]" />
              {STORE.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#c79236]/25">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-3 py-4 text-[11px] text-[#c79236] sm:flex-row sm:px-4 sm:py-5 sm:text-xs">
          <p>
            © {new Date().getFullYear()} {STORE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["UPI", "VISA", "Mastercard", "RuPay", "Net Banking", "COD"].map((m) => (
              <span
                key={m}
                className="rounded-lg border border-[#c79236]/40 px-2.5 py-1 font-semibold text-[#c79236]"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
