import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop({ addToCart, toggleWishlist, wishlist }) {
  const router = useRouter();
  const [cat,    setCat]    = useState("All");
  const [sort,   setSort]   = useState("default");
  const [search, setSearch] = useState("");
  const [modal,  setModal]  = useState(null);
  const [size,   setSize]   = useState("2.6");
  const [toast,  setToast]  = useState(null);

  useEffect(() => {
    if (router.query.cat) setCat(router.query.cat);
  }, [router.query.cat]);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),2800); };

  const handleAdd = (p) => { addToCart(p); showToast(`${p.name} added ✓`); };

  let filtered = products
    .filter(p => cat==="All" || p.category===cat)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (sort==="price-asc")  filtered = [...filtered].sort((a,b)=>a.price-b.price);
  if (sort==="price-desc") filtered = [...filtered].sort((a,b)=>b.price-a.price);
  if (sort==="rating")     filtered = [...filtered].sort((a,b)=>b.rating-a.rating);

  return (
    <>
      <Head><title>Shop Bangles — BangleBelle</title></Head>
      <style jsx global>{`
        .ph {
          padding:132px 5% 58px;
          background:linear-gradient(135deg,var(--nude),var(--blush));
          text-align:center; position:relative; overflow:hidden;
        }
        .ph::before {
          content:'✦'; position:absolute; font-size:18rem;
          color:rgba(212,96,122,.06); top:-60px; right:-30px; pointer-events:none;
        }
        .shop-wrap {
          display:flex; gap:38px; max-width:1200px; margin:0 auto; padding:60px 5%;
        }
        .sidebar { width:210px; flex-shrink:0; }
        .sidebar h3 { font-family:var(--font-display); font-size:.98rem; font-weight:700; margin-bottom:14px; }
        .cat-list { list-style:none; margin-bottom:32px; }
        .cat-list li { margin-bottom:5px; }
        .cat-btn {
          background:none; border:none; font-family:var(--font-body); font-size:.88rem;
          cursor:pointer; padding:8px 13px; border-radius:9px; width:100%; text-align:left;
          color:#7a6a7a; transition:all .22s;
        }
        .cat-btn:hover { background:var(--blush); color:var(--charcoal); }
        .cat-btn.active {
          background:linear-gradient(135deg,var(--rose-deep),var(--gold));
          color:#fff; font-weight:500;
        }
        .main { flex:1; min-width:0; }
        .toolbar {
          display:flex; justify-content:space-between; align-items:center;
          margin-bottom:28px; flex-wrap:wrap; gap:12px;
        }
        .res-count { font-size:.86rem; color:#7a6a7a; }
        .sort-sel {
          padding:10px 16px; border:1.5px solid #e2d0e2; border-radius:50px;
          font-family:var(--font-body); font-size:.83rem; color:var(--charcoal);
          background:#fff; cursor:pointer; outline:none; transition:border-color .25s;
        }
        .sort-sel:focus { border-color:var(--rose-deep); }
        /* Modal */
        .m-bg {
          position:fixed; inset:0; z-index:1000; background:rgba(42,31,46,.65);
          backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center;
          padding:20px; animation:fadeIn .3s ease;
        }
        .m-box {
          background:#fff; border-radius:22px; max-width:820px; width:100%;
          display:grid; grid-template-columns:1fr 1fr;
          max-height:90vh; overflow-y:auto; animation:fadeUp .35s ease;
        }
        .m-img { width:100%; height:100%; min-height:380px; object-fit:cover; border-radius:22px 0 0 22px; display:block; }
        .m-body { padding:40px 34px; }
        .m-close {
          position:absolute; top:14px; right:14px; width:38px; height:38px; border-radius:50%;
          background:#fff; border:none; cursor:pointer; font-size:1rem;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 4px 14px rgba(0,0,0,.12); transition:all .25s; z-index:1001;
        }
        .m-close:hover { transform:scale(1.1); background:var(--blush); }
        .m-cat { font-family:var(--font-accent); font-style:italic; font-size:.88rem; color:var(--rose-deep); margin-bottom:9px; }
        .m-name { font-family:var(--font-display); font-size:1.7rem; font-weight:700; color:var(--charcoal); margin-bottom:11px; line-height:1.2; }
        .m-price { font-size:1.4rem; font-weight:600; color:var(--rose-deep); margin-bottom:5px; }
        .m-price s { color:#b0a0b0; font-size:.92rem; font-weight:400; margin-left:8px; }
        .m-stars { color:var(--gold); font-size:.86rem; margin-bottom:17px; }
        .m-desc { font-size:.87rem; color:#7a6a7a; line-height:1.78; margin-bottom:19px; }
        .m-mat { font-size:.78rem; color:#9a8a9a; margin-bottom:21px; }
        .sz-lbl { font-size:.75rem; font-weight:500; letter-spacing:.08em; text-transform:uppercase; color:var(--charcoal); margin-bottom:9px; }
        .sizes { display:flex; gap:9px; margin-bottom:24px; }
        .sz-btn { padding:7px 16px; border:1.5px solid #e2d0e2; border-radius:9px; background:#fff; cursor:pointer; font-family:var(--font-body); font-size:.82rem; transition:all .22s; }
        .sz-btn.active { border-color:var(--rose-deep); background:var(--blush); color:var(--rose-deep); font-weight:500; }
        .m-acts { display:flex; gap:9px; }
        @media(max-width:768px){
          .shop-wrap { flex-direction:column; }
          .sidebar { width:100%; }
          .cat-list { display:flex; flex-wrap:wrap; gap:7px; }
          .cat-list li { margin:0; }
          .m-box { grid-template-columns:1fr; }
          .m-img { border-radius:22px 22px 0 0; min-height:230px; }
        }
      `}</style>

      <div className="ph">
        <span className="section-label">Our Collection</span>
        <h1 className="section-title">Shop All Bangles</h1>
        <div style={{ maxWidth:"420px", margin:"22px auto 0" }}>
          <input
            className="form-input"
            placeholder="🔍  Search bangles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="shop-wrap">
        <aside className="sidebar">
          <h3>Categories</h3>
          <ul className="cat-list">
            {categories.map(c => (
              <li key={c}>
                <button
                  className={`cat-btn${cat===c?" active":""}`}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="main">
          <div className="toolbar">
            <span className="res-count">{filtered.length} styles found</span>
            <select className="sort-sel" value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 0", color:'#7a6a7a' }}>
              <div style={{ fontSize:"3rem", marginBottom:"14px" }}>🔮</div>
              <p>No bangles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={handleAdd}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist?.some(w=>w.id===p.id)}
                  onView={setModal}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="m-bg" onClick={()=>setModal(null)}>
          <button className="m-close" onClick={()=>setModal(null)}>✕</button>
          <div className="m-box" onClick={e=>e.stopPropagation()}>
            <img src={modal.image} alt={modal.name} className="m-img" />
            <div className="m-body">
              <div className="m-cat">{modal.category}</div>
              <div className="m-name">{modal.name}</div>
              <div className="m-price">
                Rs.{modal.price.toLocaleString()}
                {modal.originalPrice && <s>Rs.{modal.originalPrice.toLocaleString()}</s>}
              </div>
              <div className="m-stars">
                {"★".repeat(Math.round(modal.rating))} {modal.rating} ({modal.reviews} reviews)
              </div>
              <p className="m-desc">{modal.description}</p>
              <p className="m-mat">Material: {modal.material}</p>
              <div className="sz-lbl">Select Size (inches)</div>
              <div className="sizes">
                {modal.sizes.map(s=>(
                  <button key={s} className={`sz-btn${size===s?" active":""}`} onClick={()=>setSize(s)}>
                    {s}&quot;
                  </button>
                ))}
              </div>
              <div className="m-acts">
                <button
                  className="btn-primary"
                  style={{flex:1}}
                  onClick={()=>{ handleAdd({...modal,size}); setModal(null); }}
                >
                  Add to Cart
                </button>
                <button className="btn-outline" onClick={()=>toggleWishlist(modal)}>
                  {wishlist?.some(w=>w.id===modal.id)?"♥":"♡"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast info">{toast}</div>}
    </>
  );
}