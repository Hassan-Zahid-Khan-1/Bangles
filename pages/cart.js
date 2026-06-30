import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Cart({ cart, removeFromCart, updateQty, clearCart }) {
  const [step,    setStep]   = useState("cart"); // cart | form | confirm
  const [loading, setLoading] = useState(false);
  const [form,    setForm]   = useState({
    name:"", phone:"", email:"", address:"", city:"", state:"", pincode:"", notes:""
  });

  const freeShippingTarget = 2000;
  const total               = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping            = total >= freeShippingTarget ? 0 : 250;
  const grandTotal          = total + shipping;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const itemLines = cart.map(i =>
      `• ${i.name}  x${i.qty}  =  Rs.${(i.price * i.qty).toLocaleString()}`
    ).join("\n");

    const body = [
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "   NEW ORDER — BangleBelle 🛍",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "CUSTOMER",
      `Name   : ${form.name}`,
      `Phone  : ${form.phone}`,
      `Email  : ${form.email || "—"}`,
      "",
      "DELIVERY ADDRESS",
      `${form.address}`,
      `${form.city}, ${form.state}  ${form.pincode}`,
      "",
      "ORDER ITEMS",
      itemLines,
      "",
      `Subtotal : Rs.${total.toLocaleString()}`,
      `Shipping : Rs.${shipping}`,
      `TOTAL    : Rs.${grandTotal.toLocaleString()}`,
      "",
      "Payment  : Cash on Delivery (COD)",
      "",
      form.notes ? `Notes: ${form.notes}` : "",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    ].join("\n");

    // Try EmailJS first
    let sent = false;

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id:  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          user_id:     process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
          template_params: {
            to_email:  "hzk3903159@gmail.com",
            from_name: form.name,
            phone:     form.phone,
            address:   `${form.address}, ${form.city}, ${form.state} ${form.pincode}`,
            items:     itemLines,
            total:     `Rs.${grandTotal.toLocaleString()}`,
            notes:     form.notes || "—",
            message:   body,
          },
        }),
      });
      if (res.ok) sent = true;
    } catch (_) {}

    // Fallback: open default email client pre-filled
    if (!sent) {
      const sub  = encodeURIComponent(`New BangleBelle Order — ${form.name}`);
      const mail = encodeURIComponent(body);
      window.location.href = `mailto:hzk3903159@gmail.com?subject=${sub}&body=${mail}`;
    }

    clearCart();
    setStep("confirm");
    setLoading(false);
  };

  return (
    <>
      <Head><title>Cart — BangleBelle</title></Head>
      <style jsx global>{`
        .ph { padding:132px 5% 54px; background:linear-gradient(135deg,var(--nude),var(--blush)); text-align:center; }
        /* Cart step */
        .cart-wrap { max-width:1080px; margin:0 auto; padding:56px 5%; display:grid; grid-template-columns:1.5fr 1fr; gap:38px; align-items:start; }
        .c-item { display:flex; gap:16px; align-items:center; padding:18px 0; border-bottom:1px solid #f0e8f0; }
        .c-img { width:84px; height:84px; border-radius:13px; object-fit:cover; flex-shrink:0; display:block; }
        .c-info { flex:1; }
        .c-name { font-family:var(--font-display); font-size:.98rem; font-weight:700; margin-bottom:5px; }
        .c-price { font-size:.88rem; color:var(--rose-deep); font-weight:500; }
        .qty-row { display:flex; align-items:center; gap:11px; margin-top:11px; }
        .qty-btn {
          width:28px; height:28px; border-radius:50%; border:1.5px solid #e2d0e2; background:#fff;
          cursor:pointer; font-size:.9rem; display:flex; align-items:center; justify-content:center;
          transition:all .22s;
        }
        .qty-btn:hover { background:var(--blush); border-color:var(--rose-deep); }
        .qty-n { font-size:.92rem; font-weight:500; min-width:18px; text-align:center; }
        .rm-btn { background:none; border:none; cursor:pointer; color:#c0a0c0; font-size:.95rem; transition:color .22s; padding:4px; margin-left:auto; }
        .rm-btn:hover { color:#c0392b; }
        /* Summary box */
        .summary {
          background:#fff; border-radius:20px; padding:30px 26px;
          border:1px solid #f0e8f0; position:sticky; top:96px;
          box-shadow:0 4px 20px rgba(42,31,46,.06);
        }
        .sum-title { font-family:var(--font-display); font-size:1.15rem; font-weight:700; margin-bottom:20px; }
        .sum-row { display:flex; justify-content:space-between; font-size:.86rem; color:var(--muted); margin-bottom:9px; }
        .sum-row.total { font-size:1.08rem; font-weight:600; color:var(--charcoal); padding-top:13px; border-top:1.5px solid #f0e8f0; margin-top:9px; }
        .cod-box { background:var(--blush); border:1px solid var(--rose); border-radius:13px; padding:13px 17px; margin:18px 0; display:flex; gap:11px; align-items:center; font-size:.83rem; color:var(--charcoal); }
        .cod-ic { font-size:1.4rem; flex-shrink:0; }
        /* Form step */
        .form-wrap { max-width:1080px; margin:0 auto; padding:56px 5%; display:grid; grid-template-columns:1.5fr 1fr; gap:38px; align-items:start; }
        .f-title { font-family:var(--font-display); font-size:1.4rem; font-weight:700; margin-bottom:26px; }
        .f-row { display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px; }
        .f-group { margin-bottom:15px; }
        .f-lbl { display:block; font-size:.76rem; font-weight:500; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); margin-bottom:7px; }
        /* Confirm step */
        .confirm { min-height:65vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 5%; text-align:center; }
        .conf-ic { width:82px; height:82px; border-radius:50%; background:linear-gradient(135deg,var(--rose-deep),var(--gold)); display:flex; align-items:center; justify-content:center; font-size:2.2rem; margin:0 auto 26px; animation:float 3s ease-in-out infinite; }
        @media(max-width:768px){
          .cart-wrap,.form-wrap { grid-template-columns:1fr; }
          .f-row { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="ph">
        <span className="section-label">
          {step==="cart" ? "Shopping Bag" : step==="form" ? "Checkout" : "Order Placed"}
        </span>
        <h1 className="section-title">
          {step==="cart" ? "Your Cart" : step==="form" ? "Delivery Details" : "Thank You! 🎉"}
        </h1>
      </div>

      {/* ── CONFIRM ── */}
      {step==="confirm" && (
        <div className="confirm">
          <div className="conf-ic">🛍</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"1.9rem", marginBottom:"14px" }}>
            Order Confirmed!
          </h2>
          <p style={{ color:"var(--muted)", fontSize:".95rem", lineHeight:1.8, maxWidth:"420px", marginBottom:"28px" }}>
            Your order has been placed. Our team will call you at <strong>{form.phone}</strong> to confirm your Cash on Delivery order. Expected delivery: <strong>3–5 business days.</strong>
          </p>
          <div style={{ background:"var(--blush)", borderRadius:"13px", padding:"16px 24px", marginBottom:"32px", fontSize:".88rem" }}>
            💌 Order details sent to our team at hzk3903159@gmail.com
          </div>
          <Link href="/shop" className="btn-primary">Continue Shopping →</Link>
        </div>
      )}

      {/* ── CART ── */}
      {step==="cart" && (
        <div className="cart-wrap">
          <div>
            {cart.length===0 ? (
              <div style={{ textAlign:"center", padding:"60px 0" }}>
                <div style={{ fontSize:"3.5rem", marginBottom:"18px" }}>🛍</div>
                <p style={{ color:"var(--muted)", marginBottom:"22px" }}>Your cart is empty</p>
                <Link href="/shop" className="btn-primary">Start Shopping</Link>
              </div>
            ) : cart.map(item => (
              <div key={item.id} className="c-item">
                <img src={item.image} alt={item.name} className="c-img" />
                <div className="c-info">
                  <div className="c-name">{item.name}</div>
                  <div className="c-price">Rs.{item.price.toLocaleString()} each</div>
                  <div className="qty-row">
                    <button className="qty-btn" onClick={()=>updateQty(item.id,item.qty-1)}>−</button>
                    <span className="qty-n">{item.qty}</span>
                    <button className="qty-btn" onClick={()=>updateQty(item.id,item.qty+1)}>+</button>
                    <span style={{ fontSize:".82rem", color:"var(--muted)", marginLeft:"8px" }}>
                      = Rs.{(item.price*item.qty).toLocaleString()}
                    </span>
                    <button className="rm-btn" onClick={()=>removeFromCart(item.id)}>✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cart.length>0 && (
            <div className="summary">
              <div className="sum-title">Order Summary</div>
              {cart.map(i=>(
                <div key={i.id} className="sum-row">
                  <span>{i.name} ×{i.qty}</span>
                  <span>Rs.{(i.price*i.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="sum-row">
                <span>Shipping</span>
                <span>{shipping===0 ? <span style={{color:"green"}}>FREE</span> : `Rs.${shipping}`}</span>
              </div>
              <div className="sum-row total">
                <span>Total</span>
                <span>Rs.{grandTotal.toLocaleString()}</span>
              </div>
              {shipping>0 && (
                <p style={{ fontSize:".76rem", color:"var(--muted)", marginBottom:"14px" }}>
                  Add Rs.{Math.max(0, freeShippingTarget - total).toLocaleString()} more for free delivery
                </p>
              )}
              <div className="cod-box">
                <span className="cod-ic">💵</span>
                <div>
                  <strong>Cash on Delivery</strong><br />
                  <span style={{color:"var(--muted)"}}>Pay when you receive your order</span>
                </div>
              </div>
              <button className="btn-primary" style={{width:"100%"}} onClick={()=>setStep("form")}>
                Proceed to Checkout →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── FORM ── */}
      {step==="form" && (
        <form onSubmit={handleOrder} className="form-wrap">
          <div>
            <div className="f-title">Delivery Information</div>
            <div className="f-row">
              <div>
                <label className="f-lbl">Full Name *</label>
                <input className="form-input" name="name" required value={form.name} onChange={handleChange} placeholder="Ayesha Khan" />
              </div>
              <div>
                <label className="f-lbl">Phone *</label>
                <input className="form-input" name="phone" required value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" type="tel" />
              </div>
            </div>
            <div className="f-group">
              <label className="f-lbl">Email</label>
              <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
            </div>
            <div className="f-group">
              <label className="f-lbl">Full Address *</label>
              <input className="form-input" name="address" required value={form.address} onChange={handleChange} placeholder="House #, Street, Area" />
            </div>
            <div className="f-row">
              <div>
                <label className="f-lbl">City *</label>
                <input className="form-input" name="city" required value={form.city} onChange={handleChange} placeholder="Lahore" />
              </div>
              <div>
                <label className="f-lbl">Province *</label>
                <input className="form-input" name="state" required value={form.state} onChange={handleChange} placeholder="Punjab" />
              </div>
            </div>
            <div className="f-group" style={{maxWidth:"200px"}}>
              <label className="f-lbl">Postal Code</label>
              <input className="form-input" name="pincode" value={form.pincode} onChange={handleChange} placeholder="54000" />
            </div>
            <div className="f-group">
              <label className="f-lbl">Notes (optional)</label>
              <textarea className="form-input" name="notes" rows="3" value={form.notes} onChange={handleChange} placeholder="Any special instructions..." />
            </div>
            <div style={{display:"flex",gap:"12px",marginTop:"6px"}}>
              <button type="button" className="btn-outline" onClick={()=>setStep("cart")}>← Back</button>
              <button type="submit" className="btn-primary" style={{flex:1}} disabled={loading}>
                {loading ? "Placing Order…" : "Place COD Order ✓"}
              </button>
            </div>
          </div>

          <div className="summary">
            <div className="sum-title">Your Order</div>
            {cart.map(i=>(
              <div key={i.id} className="sum-row">
                <span>{i.name} ×{i.qty}</span>
                <span>Rs.{(i.price*i.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="sum-row">
              <span>Shipping</span>
              <span>{shipping===0 ? <span style={{color:"green"}}>FREE</span> : `Rs.${shipping}`}</span>
            </div>
            <div className="sum-row total">
              <span>Grand Total</span>
              <span>Rs.{grandTotal.toLocaleString()}</span>
            </div>
            <div className="cod-box" style={{marginTop:"18px"}}>
              <span className="cod-ic">🔒</span>
              <div>
                <strong>Secure COD Order</strong><br/>
                <span style={{fontSize:".78rem",color:"var(--muted)"}}>No payment needed upfront</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}