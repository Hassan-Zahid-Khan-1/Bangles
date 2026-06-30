import Link from "next/link";
import { useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (
    <>
      <style jsx global>{`
        .footer { background: var(--charcoal); color: #fff; padding: 70px 5% 30px; }
        .footer-grid {
          max-width: 1200px; margin: 0 auto 50px;
          display: grid; grid-template-columns: 2fr 1fr 1fr 1.6fr; gap: 48px;
        }
        .f-logo { font-family:var(--font-display); font-size:1.7rem; font-weight:700; margin-bottom:14px; }
        .f-logo span {
          background:linear-gradient(135deg,var(--rose),var(--gold-light));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .f-desc { font-size:.86rem; color:rgba(255,255,255,.45); line-height:1.8; margin-bottom:22px; }
        .f-socials { display:flex; gap:10px; }
        .f-soc {
          width:38px; height:38px; border-radius:50%;
          border:1px solid rgba(255,255,255,.15); background:none;
          display:flex; align-items:center; justify-content:center;
          font-size:.95rem; cursor:pointer; transition:all .3s;
          color:rgba(255,255,255,.55); text-decoration:none;
        }
        .f-soc:hover { background:var(--rose-deep); border-color:var(--rose-deep); color:#fff; transform:translateY(-2px); }
        .f-col h4 {
          font-size:.75rem; font-weight:500; letter-spacing:.12em;
          text-transform:uppercase; color:var(--rose); margin-bottom:18px;
        }
        .f-col ul { list-style:none; }
        .f-col li { margin-bottom:9px; }
        .f-col a { font-size:.86rem; color:rgba(255,255,255,.45); text-decoration:none; transition:color .25s; }
        .f-col a:hover { color:#fff; }
        .f-news p { font-size:.83rem; color:rgba(255,255,255,.45); line-height:1.75; margin-bottom:14px; }
        .f-news-form { display:flex; gap:8px; }
        .f-news-form input {
          flex:1; padding:11px 15px;
          background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.1);
          border-radius:50px; color:#fff; font-size:.83rem;
          font-family:var(--font-body); outline:none; transition:border-color .25s;
        }
        .f-news-form input::placeholder { color:rgba(255,255,255,.3); }
        .f-news-form input:focus { border-color:var(--rose); }
        .f-news-form button {
          padding:11px 18px; background:linear-gradient(135deg,var(--rose-deep),var(--gold));
          border:none; border-radius:50px; color:#fff; font-size:.8rem; font-weight:500;
          cursor:pointer; font-family:var(--font-body); transition:opacity .25s; white-space:nowrap;
        }
        .f-news-form button:hover { opacity:.88; }
        .f-bottom {
          max-width:1200px; margin:0 auto;
          padding-top:26px; border-top:1px solid rgba(255,255,255,.08);
          display:flex; justify-content:space-between; align-items:center;
          font-size:.8rem; color:rgba(255,255,255,.28);
          flex-wrap:wrap; gap:12px;
        }
        .f-bottom-links { display:flex; gap:22px; }
        .f-bottom-links a { color:rgba(255,255,255,.28); text-decoration:none; transition:color .25s; }
        .f-bottom-links a:hover { color:rgba(255,255,255,.65); }
        @media(max-width:900px){ .footer-grid{ grid-template-columns:1fr 1fr; } }
        @media(max-width:540px){ .footer-grid{ grid-template-columns:1fr; } }
      `}</style>

      <footer className="footer">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="f-logo"><span>Ever</span>Us</div>
            <p className="f-desc">
             Every piece tells a story of love, elegance, and forever. Handcrafted with care, made to shine with you — welcome to EverUs Jewelry.
            </p>
          <div className="f-socials">
  <a
    href="https://www.instagram.com/everus.pk"
    target="_blank"
    rel="noopener noreferrer"
    className="f-soc"
    aria-label="Instagram"
  >
    <FaInstagram />
  </a>

  <a
    href="https://facebook.com/yourusername"
    target="_blank"
    rel="noopener noreferrer"
    className="f-soc"
    aria-label="Facebook"
  >
    <FaFacebookF />
  </a>

  <a
    href="https://x.com/yourusername"
    target="_blank"
    rel="noopener noreferrer"
    className="f-soc"
    aria-label="X"
  >
    <FaXTwitter />
  </a>

  <a
    href="https://youtube.com/@yourchannel"
    target="_blank"
    rel="noopener noreferrer"
    className="f-soc"
    aria-label="YouTube"
  >
    <FaYoutube />
  </a>

  <a
    href="https://www.tiktok.com/@everus2216"
    target="_blank"
    rel="noopener noreferrer"
    className="f-soc"
    aria-label="TikTok"
  >
    <FaTiktok />
  </a>
</div>
</div>

          {/* Shop links */}
          <div className="f-col">
            <h4>Shop</h4>
            <ul>
                {['Bracelets','Bangles','Karas','Rings','Lockets','Earrings'].map(c=>(
                  <li key={c}><Link href={`/shop?cat=${c}`}>{c}</Link></li>
                ))}
            </ul>
          </div>

          {/* Help links */}
          <div className="f-col">
            <h4>Help</h4>
            <ul>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns Policy</a></li>
              <li><Link href="/about">Our Story</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="f-news">
            <h4>Stay in the loop</h4>
            <p>Get exclusive offers, new arrivals & style inspo straight to your inbox.</p>
            {subbed ? (
              <p style={{ color:"var(--rose)", fontWeight:500 }}>✓ You&apos;re subscribed!</p>
            ) : (
              <div className="f-news-form">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button onClick={() => email && setSubbed(true)}>Subscribe</button>
              </div>
            )}
          </div>
        </div>

        <div className="f-bottom">
          <span>© 2026 EverUs. All rights reserved.</span>
          <div className="f-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </>
  );
}