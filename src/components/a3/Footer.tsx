import { site } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Footer — bg stone-900. Flex-col on mobile, flex-row on desktop.
   Left: small logo + copyright. Right: Legal / Privacy / Credits.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Footer() {
  return (
    <footer className="flex flex-col justify-between gap-6 bg-stone-900 px-6 py-10 text-white/60 md:flex-row md:items-center md:px-10">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white">
          {site.shortName} <span className="opacity-50">{site.logoSpan}</span>
        </p>
        <p className="mt-2 text-xs">
          © {new Date().getFullYear()} {site.name} — {site.address.city}, {site.address.state}
        </p>
      </div>

      <nav className="flex gap-8 text-xs uppercase tracking-wider" aria-label="Footer">
        <a href="#" className="transition-colors duration-500 hover:text-white">Legal</a>
        <a href="#" className="transition-colors duration-500 hover:text-white">Privacy</a>
        <a href="#" className="transition-colors duration-500 hover:text-white">Credits</a>
      </nav>
    </footer>
  );
}
