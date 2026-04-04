import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({ cartCount, wishCount }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const router = useRouter();
  const isHome = router.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [router.pathname]);

  const links = [
    { href: "/",        label: "Home"    },
    { href: "/shop",    label: "Shop"    },
    { href: "/about",   label: "About"   },
    { href: "/contact", label: "Contact" },
  ];

  const solidBg  = scrolled || !isHome;
  const textCol  = solidBg ? "var(--charcoal)" : "#fff";
  const navBg    = solidBg ? "rgba(253,250,248,0.96)" : "transparent";
  const navBd    = solidBg ? "1px solid rgba(244,167,185,0.2)" : "none";
  const navPad   = solidBg ? "12px 5%" : "22px 5%";

  const rootStyle = {
    padding: navPad,
    background: navBg,
    backdropFilter: solidBg ? "blur(22px)" : "none",
    WebkitBackdropFilter: solidBg ? "blur(22px)" : "none",
    borderBottom: navBd,
  };

  const themeStyle = { color: textCol };

  return (
    <>
      <nav className="nav-root" style={rootStyle}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo" style={themeStyle}>
            Bangle<span>Belle</span>
          </Link>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={router.pathname === l.href ? "active" : ""}
                  style={themeStyle}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <Link href="/wishlist" className="icon-btn" title="Wishlist" style={themeStyle}>
              ♡
              {wishCount > 0 && <span className="icon-badge">{wishCount}</span>}
            </Link>
            <Link href="/cart" className="icon-btn" title="Cart" style={themeStyle}>
              🛍
              {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
            </Link>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span style={themeStyle} /><span style={themeStyle} /><span style={themeStyle} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-overlay${menuOpen ? " open" : ""}`}>
        <button className="mob-close" onClick={() => setMenuOpen(false)}>✕</button>
        {links.map((l) => (
          <Link key={l.href} href={l.href}>{l.label}</Link>
        ))}
        <Link href="/wishlist">Wishlist ({wishCount})</Link>
        <Link href="/cart">Cart ({cartCount})</Link>
      </div>
    </>
  );
}