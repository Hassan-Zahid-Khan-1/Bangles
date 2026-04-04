import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

/* ---------- Scroll-reveal hook ---------- */
function useReveal() {
  const refs = useRef({});
  const [visible, setVisible] = useState({});
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          setVisible(v => ({ ...v, [e.target.dataset.rev]: true }));
      }),
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);
  const ref = (key) => (el) => {
    refs.current[key] = el;
    if (el) el.dataset.rev = key;
  };
  return { ref, visible };
}

export default function Home({ addToCart, toggleWishlist, wishlist }) {
  const { ref, visible } = useReveal();
  const [toast, setToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const handleAdd = (p) => { addToCart(p); showToast(`${p.name} added to cart 🛍`); };

  const featured = products.slice(0, 4);

  return (
    <>
      <Head>
        <title>BangleBelle — Exquisite Bangles for Every Occasion</title>
        <meta name="description" content="Handcrafted bangles from traditional kundan to modern glass stacks." />
      </Head>

      <style jsx global>{`
        /* ===== HERO ===== */
        .hero {
          position: relative; height: 100vh; min-height: 580px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        /*
          VIDEO SETUP:
          The video tag below uses multiple sources.
          Source 1: a reliable royalty-free MP4 from Pexels CDN
          Source 2: local fallback /videos/hero.mp4 (put your own file there)
          Poster: unsplash image shown while video loads
        */
        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; z-index: 0;
        }
        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            135deg,
            rgba(42,31,46,.78) 0%,
            rgba(42,31,46,.42) 55%,
            rgba(201,150,58,.22) 100%
          );
        }
        .hero-content {
          position: relative; z-index: 2;
          text-align: center; padding: 0 20px; max-width: 780px;
        }
        .hero-eyebrow {
          display: block; font-family:var(--font-accent); font-style:italic;
          font-size:1rem; color:var(--gold-light); letter-spacing:.12em;
          margin-bottom:18px; animation: fadeIn 1s ease .3s both;
        }
        .hero-h1 {
          font-family:var(--font-display); font-size:clamp(2.8rem,8vw,5.2rem);
          font-weight:700; color:#fff; line-height:1.06;
          margin-bottom:22px; letter-spacing:-.02em;
          animation: fadeUp .9s ease .5s both;
        }
        .hero-h1 em { font-style:italic; color:var(--rose); }
        .hero-sub {
          font-size:1rem; color:rgba(255,255,255,.78); line-height:1.82;
          margin-bottom:36px; animation: fadeUp .9s ease .7s both;
        }
        .hero-btns {
          display:flex; gap:14px; justify-content:center; flex-wrap:wrap;
          animation: fadeUp .9s ease .9s both;
        }
        .hero-scroll {
          position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
          z-index:2; display:flex; flex-direction:column; align-items:center; gap:6px;
          color:rgba(255,255,255,.4); font-size:.7rem; letter-spacing:.14em;
        }
        .scroll-line {
          width:1px; height:46px;
          background:linear-gradient(to bottom,rgba(255,255,255,.5),transparent);
          animation:fadeIn 1s ease 1.5s both;
        }
        /* Floating sparkles */
        .sparkle {
          position:absolute; pointer-events:none; z-index:2;
          font-size:1.2rem; animation: float 4s ease-in-out infinite;
        }

        /* ===== MARQUEE ===== */
        .marquee-bar {
          overflow:hidden; white-space:nowrap;
          background:linear-gradient(135deg,var(--rose-deep),var(--gold)); padding:13px 0;
        }
        .marquee-track { display:inline-block; animation: marquee 22s linear infinite; }
        .m-item {
          display:inline-block; font-size:.78rem; font-weight:500;
          letter-spacing:.1em; text-transform:uppercase;
          color:#fff; padding:0 26px;
        }
        .m-dot { color:rgba(255,255,255,.45); }

        /* ===== CATEGORIES ===== */
        .cats { padding:90px 5%; background:var(--nude); }
        .cat-grid {
          display:grid; grid-template-columns:repeat(6,1fr); gap:14px;
          max-width:1100px; margin:48px auto 0;
        }
        .cat-link {
          text-align:center; cursor:pointer; text-decoration:none;
          transition:transform .3s;
        }
        .cat-link:hover { transform:translateY(-5px); }
        .cat-circle {
          width:78px; height:78px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:1.9rem; margin:0 auto 11px;
          transition:box-shadow .3s;
        }
        .cat-link:hover .cat-circle {
          box-shadow:0 12px 28px rgba(212,96,122,.28);
          transform:rotate(-6deg) scale(1.08);
        }
        .cat-name { font-size:.8rem; font-weight:500; color:var(--charcoal); }

        /* ===== FEATURED ===== */
        .featured { padding:90px 5%; }
        .featured-hd {
          display:flex; justify-content:space-between; align-items:flex-end;
          margin-bottom:42px; max-width:1200px; margin-left:auto; margin-right:auto;
          flex-wrap:wrap; gap:16px;
        }

        /* ===== PROMO BANNER ===== */
        .promo {
          margin:0 5% 90px; border-radius:26px; overflow:hidden;
          position:relative; min-height:360px;
          display:flex; align-items:center;
          background:linear-gradient(135deg,var(--charcoal) 0%,#3d2842 100%);
        }
        .promo-img {
          position:absolute; right:0; top:0; width:55%; height:100%;
          object-fit:cover; opacity:.28;
        }
        .promo-content { position:relative; z-index:1; padding:56px 60px; max-width:500px; }
        .promo-tag {
          display:inline-block; padding:5px 16px; border-radius:50px;
          background:linear-gradient(135deg,var(--rose-deep),var(--gold));
          color:#fff; font-size:.68rem; font-weight:600; letter-spacing:.12em;
          margin-bottom:22px;
        }
        .promo-h2 {
          font-family:var(--font-display); font-size:clamp(1.8rem,3.5vw,2.8rem);
          color:#fff; line-height:1.15; margin-bottom:14px; font-weight:700;
        }
        .promo-h2 em { color:var(--rose); font-style:italic; }
        .promo-p { font-size:.9rem; color:rgba(255,255,255,.56); line-height:1.8; margin-bottom:28px; }
        /* decorative rings */
        .ring {
          position:absolute; border-radius:50%; pointer-events:none;
          border:1px solid rgba(244,167,185,.12);
        }

        /* ===== TESTIMONIALS ===== */
        .tests { background:var(--blush); padding:90px 5%; }
        .test-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:46px; }
        .test-card {
          background:#fff; border-radius:20px; padding:30px 26px;
          transition:transform .3s ease;
          box-shadow:0 2px 14px rgba(42,31,46,.06);
        }
        .test-card:hover { transform:translateY(-5px); }
        .test-stars { color:var(--gold); font-size:.95rem; letter-spacing:2px; margin-bottom:14px; }
        .test-q {
          font-family:var(--font-accent); font-style:italic;
          font-size:1rem; line-height:1.75; color:var(--charcoal); margin-bottom:20px;
        }
        .test-author { display:flex; align-items:center; gap:12px; }
        .test-av {
          width:42px; height:42px; border-radius:50%; flex-shrink:0;
          background:linear-gradient(135deg,var(--rose),var(--lilac));
          display:flex; align-items:center; justify-content:center; font-size:1.15rem;
        }
        .test-name { font-weight:500; font-size:.88rem; color:var(--charcoal); }
        .test-loc  { font-size:.76rem; color:var(--muted); }

        /* ===== STATS ===== */
        .stats { background:var(--charcoal); padding:68px 5%; }
        .stats-grid {
          display:grid; grid-template-columns:repeat(4,1fr); gap:28px;
          max-width:900px; margin:0 auto; text-align:center;
        }
        .stat-n {
          font-family:var(--font-display); font-size:2.8rem; font-weight:700;
          background:linear-gradient(135deg,var(--rose),var(--gold-light));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text; margin-bottom:7px;
        }
        .stat-l { font-size:.78rem; color:rgba(255,255,255,.42); letter-spacing:.1em; text-transform:uppercase; }

        /* ===== MODAL ===== */
        .modal-bg {
          position:fixed; inset:0; z-index:1000;
          background:rgba(42,31,46,.65); backdrop-filter:blur(10px);
          display:flex; align-items:center; justify-content:center;
          padding:20px; animation:fadeIn .3s ease;
        }
        .modal-box {
          background:#fff; border-radius:22px; max-width:820px; width:100%;
          display:grid; grid-template-columns:1fr 1fr;
          max-height:90vh; overflow-y:auto;
          animation:fadeUp .35s ease;
        }
        .modal-img { width:100%; height:100%; min-height:380px; object-fit:cover; border-radius:22px 0 0 22px; display:block; }
        .modal-body { padding:40px 34px; }
        .modal-close {
          position:absolute; top:14px; right:14px;
          width:38px; height:38px; border-radius:50%;
          background:#fff; border:none; cursor:pointer; font-size:1rem;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 4px 14px rgba(0,0,0,.12); transition:all .25s; z-index:1001;
        }
        .modal-close:hover { transform:scale(1.1); background:var(--blush); }
        .modal-cat { font-family:var(--font-accent); font-style:italic; font-size:.88rem; color:var(--rose-deep); margin-bottom:9px; }
        .modal-name { font-family:var(--font-display); font-size:1.75rem; font-weight:700; color:var(--charcoal); margin-bottom:12px; line-height:1.2; }
        .modal-price { font-size:1.45rem; font-weight:600; color:var(--rose-deep); margin-bottom:5px; }
        .modal-price s { color:#b0a0b0; font-size:.95rem; font-weight:400; margin-left:9px; }
        .modal-stars { color:var(--gold); font-size:.88rem; margin-bottom:18px; }
        .modal-desc { font-size:.88rem; color:var(--muted); line-height:1.78; margin-bottom:20px; }
        .modal-mat { font-size:.8rem; color:#9a8a9a; margin-bottom:22px; }
        .size-lbl { font-size:.76rem; font-weight:500; letter-spacing:.08em; text-transform:uppercase; color:var(--charcoal); margin-bottom:9px; }
        .sizes { display:flex; gap:9px; margin-bottom:26px; flex-wrap:wrap; }
        .sz-btn {
          padding:7px 17px; border:1.5px solid #e2d0e2; border-radius:9px;
          background:#fff; cursor:pointer; font-family:var(--font-body); font-size:.83rem;
          transition:all .25s;
        }
        .sz-btn.active { border-color:var(--rose-deep); background:var(--blush); color:var(--rose-deep); font-weight:500; }
        .modal-acts { display:flex; gap:10px; }

        @media(max-width:900px){
          .cat-grid { grid-template-columns:repeat(3,1fr); }
          .test-grid { grid-template-columns:1fr; }
          .stats-grid { grid-template-columns:repeat(2,1fr); }
          .promo-content { padding:40px 30px; }
          .modal-box { grid-template-columns:1fr; }
          .modal-img { border-radius:22px 22px 0 0; min-height:240px; }
        }
        @media(max-width:540px){
          .featured-hd { flex-direction:column; align-items:flex-start; }
          .promo { margin:0 4% 70px; }
        }
      `}</style>

      {/* ===== HERO ===== */}
      <section className="hero">
        {/*
          VIDEO: uses two sources for maximum compatibility.
          - Source 1: Pexels free stock video (reliable, no auth needed)
          - Source 2: local /videos/hero.mp4 (replace with your own file)
          - poster=  : shown while video loads or if video fails
        */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1400&q=75"
        >
          <source
            src="https://videos.pexels.com/video-files/3193979/3193979-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
          {/* Local fallback — place your own video at public/videos/hero.mp4 */}
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        {/* Floating sparkles */}
        <span className="sparkle" style={{ top:"22%", left:"8%",  animationDelay:"0s"   }}>✦</span>
        <span className="sparkle" style={{ top:"35%", right:"7%", animationDelay:"1.2s" }}>✦</span>
        <span className="sparkle" style={{ bottom:"28%",left:"14%",animationDelay:".6s" }}>✦</span>

        <div className="hero-content">
          <span className="hero-eyebrow">✦ New Collection 2025 ✦</span>
          <h1 className="hero-h1">
            Adorn Your <em>Story</em><br />With Every Bangle
          </h1>
          <p className="hero-sub">
            Handcrafted bangles that celebrate the feminine spirit — from traditional
            kundan to contemporary glass stacks. Cash on delivery available.
          </p>
          <div className="hero-btns">
            <Link href="/shop" className="btn-primary">Explore Collection</Link>
            <Link
              href="/about"
              className="btn-outline"
              style={{ color:"#fff", borderColor:"rgba(255,255,255,.5)" }}
            >
              Our Story
            </Link>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[
            "Free Shipping on Orders ₹999+",
            "Handcrafted with Love",
            "Cash on Delivery Available",
            "New Arrivals Every Week",
            "500+ Bangle Styles",
            "Artisan Made in South Asia",
          ].concat([
            "Free Shipping on Orders ₹999+",
            "Handcrafted with Love",
            "Cash on Delivery Available",
            "New Arrivals Every Week",
            "500+ Bangle Styles",
            "Artisan Made in South Asia",
          ]).map((t, i) => (
            <span key={i} className="m-item">
              {t} <span className="m-dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <section className="cats" ref={ref("cats")}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", textAlign:"center" }}>
          <span className="section-label">Browse By Style</span>
          <h2 className="section-title">Find Your Perfect Match</h2>
        </div>
        <div
          className="cat-grid"
          style={{
            opacity:  visible.cats ? 1 : 0,
            transform:visible.cats ? "none" : "translateY(22px)",
            transition:"all .7s ease",
          }}
        >
          {[
            { emoji:"🪙", label:"Gold",        bg:"#fdf3d8", href:"/shop?cat=Gold"       },
            { emoji:"💎", label:"Gemstone",    bg:"#e8eeff", href:"/shop?cat=Gemstone"   },
            { emoji:"🌸", label:"Traditional", bg:"#fde8f0", href:"/shop?cat=Traditional"},
            { emoji:"🤍", label:"Pearl",       bg:"#f4f4f4", href:"/shop?cat=Pearl"      },
            { emoji:"✨", label:"Kundan",      bg:"#fff6e0", href:"/shop?cat=Kundan"     },
            { emoji:"🫧", label:"Glass",       bg:"#e0f5ff", href:"/shop?cat=Glass"      },
          ].map((c, i) => (
            <Link
              key={i}
              href={c.href}
              className="cat-link"
              style={{ animationDelay:`${i * 0.08}s` }}
            >
              <div className="cat-circle" style={{ background:c.bg }}>{c.emoji}</div>
              <span className="cat-name">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="featured">
        <div className="featured-hd">
          <div>
            <span className="section-label">Curated For You</span>
            <h2 className="section-title" style={{ marginBottom:0 }}>Bestselling Bangles</h2>
          </div>
          <Link href="/shop" className="btn-outline">View All →</Link>
        </div>
        <div
          className="grid-4 container"
          ref={ref("featured")}
          style={{
            opacity:  visible.featured ? 1 : 0,
            transform:visible.featured ? "none" : "translateY(24px)",
            transition:"all .75s ease",
          }}
        >
          {featured.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={handleAdd}
              onToggleWishlist={toggleWishlist}
              isWishlisted={wishlist?.some(w => w.id === p.id)}
              onView={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <div className="promo" ref={ref("promo")}>
        <div className="ring" style={{ width:"500px",height:"500px", top:"-200px",right:"15%" }} />
        <div className="ring" style={{ width:"350px",height:"350px", bottom:"-140px",right:"30%" }} />
        <img
          src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=65"
          alt="Kundan bangles"
          className="promo-img"
        />
        <div
          className="promo-content"
          style={{
            opacity:  visible.promo ? 1 : 0,
            transform:visible.promo ? "none" : "translateX(-30px)",
            transition:"all .75s ease",
          }}
        >
          <span className="promo-tag">LIMITED COLLECTION</span>
          <h2 className="promo-h2">The <em>Kundan Royale</em><br />Collection is Here</h2>
          <p className="promo-p">
            Museum-quality kundan bangles inspired by Mughal traditions.
            Only 50 numbered sets available — each certified by our master craftsmen.
          </p>
          <Link href="/shop?cat=Kundan" className="btn-primary">Shop Kundan →</Link>
        </div>
      </div>

      {/* ===== TESTIMONIALS ===== */}
      <section className="tests" ref={ref("tests")}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ textAlign:"center" }}>
            <span className="section-label">Happy Customers</span>
            <h2 className="section-title">They Sparkle, We Shine ✨</h2>
          </div>
          <div
            className="test-grid"
            style={{
              opacity:  visible.tests ? 1 : 0,
              transform:visible.tests ? "none" : "translateY(24px)",
              transition:"all .75s ease",
            }}
          >
            {[
              { text:"Ordered the Golden Filigree Set for my wedding — everyone couldn't stop complimenting! Quality is just stunning.", name:"Priya Sharma",  loc:"Delhi",   emoji:"💃" },
              { text:"The rose quartz bangles are absolutely gorgeous. Arrived beautifully packaged and faster than expected. 10/10!",  name:"Zara Ahmed",   loc:"Karachi", emoji:"🌸" },
              { text:"Kundan bangles are everything! COD option is so convenient. Trusted them again and they didn't disappoint at all.", name:"Mehak Joshi", loc:"Mumbai",  emoji:"✨" },
            ].map((t, i) => (
              <div key={i} className="test-card">
                <div className="test-stars">★★★★★</div>
                <p className="test-q">&ldquo;{t.text}&rdquo;</p>
                <div className="test-author">
                  <div className="test-av">{t.emoji}</div>
                  <div>
                    <div className="test-name">{t.name}</div>
                    <div className="test-loc">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats">
        <div className="stats-grid">
          {[
            { n:"50K+", l:"Happy Customers" },
            { n:"500+", l:"Bangle Styles"   },
            { n:"4.9★", l:"Average Rating"  },
            { n:"100%", l:"Handcrafted"      },
          ].map((s, i) => (
            <div key={i}>
              <div className="stat-n">{s.n}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRODUCT MODAL ===== */}
      {selectedProduct && <ProductModal
        p={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={handleAdd}
        onWish={toggleWishlist}
        isWishlisted={wishlist?.some(w => w.id === selectedProduct.id)}
      />}

      {toast && <div className="toast info">{toast}</div>}
    </>
  );
}

function ProductModal({ p, onClose, onAdd, onWish, isWishlisted }) {
  const [size, setSize] = useState("2.6");
  return (
    <div className="modal-bg" onClick={onClose}>
      <button className="modal-close" onClick={onClose}>✕</button>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <img src={p.image} alt={p.name} className="modal-img" />
        <div className="modal-body">
          <div className="modal-cat">{p.category}</div>
          <div className="modal-name">{p.name}</div>
          <div className="modal-price">
            ₹{p.price.toLocaleString()}
            {p.originalPrice && <s>₹{p.originalPrice.toLocaleString()}</s>}
          </div>
          <div className="modal-stars">
            {"★".repeat(Math.round(p.rating))} {p.rating} ({p.reviews} reviews)
          </div>
          <p className="modal-desc">{p.description}</p>
          <p className="modal-mat">Material: {p.material}</p>
          <div className="size-lbl">Select Size (inches)</div>
          <div className="sizes">
            {p.sizes.map(s => (
              <button key={s} className={`sz-btn${size===s?" active":""}`} onClick={()=>setSize(s)}>
                {s}&quot;
              </button>
            ))}
          </div>
          <div className="modal-acts">
            <button className="btn-primary" style={{flex:1}} onClick={()=>{onAdd({...p,size});onClose();}}>
              Add to Cart
            </button>
            <button className="btn-outline" onClick={()=>onWish(p)}>
              {isWishlisted?"♥":"♡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}