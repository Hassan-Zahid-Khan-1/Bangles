import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    const subject = encodeURIComponent(form.subject || 'BangleBelle Enquiry');
    const mailBody = encodeURIComponent(body);

    setTimeout(() => {
      window.location.href = `mailto:hzk3903159@gmail.com?subject=${subject}&body=${mailBody}`;
      setSent(true);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <Head><title>Contact Us — BangleBelle</title></Head>
      <style jsx>{`
        .page-header {
          padding: 140px 5% 70px;
          background: linear-gradient(135deg, var(--nude) 0%, var(--blush) 100%);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .page-header::after {
          content: '✉';
          position: absolute;
          font-size: 18rem;
          opacity: 0.04;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .contact-layout {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 5%;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 70px;
          align-items: start;
        }
        /* Info side */
        .info-section h3 {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 16px;
        }
        .info-section p {
          font-size: 0.9rem;
          color: #6a5a6a;
          line-height: 1.8;
          margin-bottom: 36px;
        }
        .contact-card {
          background: white;
          border-radius: 16px;
          padding: 22px 22px;
          margin-bottom: 16px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          border: 1px solid #f0e8f0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-card:hover {
          transform: translateX(4px);
          box-shadow: 0 8px 24px rgba(244,167,185,0.15);
        }
        .cc-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: var(--blush);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }
        .cc-label {
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9a8a9a;
          margin-bottom: 4px;
        }
        .cc-value {
          font-size: 0.92rem;
          color: var(--charcoal);
          font-weight: 500;
          word-break: break-all;
        }
        .social-links {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }
        .soc-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #e8d5e8;
          background: white;
          cursor: pointer;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          text-decoration: none;
        }
        .soc-btn:hover {
          background: var(--rose-deep);
          border-color: var(--rose-deep);
          transform: translateY(-2px);
          filter: grayscale(0);
        }
        /* Form side */
        .form-box {
          background: white;
          border-radius: 24px;
          padding: 42px 38px;
          border: 1px solid #f0e8f0;
          box-shadow: 0 10px 40px rgba(244,167,185,0.08);
        }
        .form-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 28px;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .form-group { margin-bottom: 16px; }
        .form-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6a5a6a;
          margin-bottom: 8px;
        }
        /* Success state */
        .success-box {
          text-align: center;
          padding: 50px 20px;
        }
        .success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--rose-deep), var(--gold));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 24px;
          animation: float 3s ease-in-out infinite;
        }
        /* FAQ */
        .faq-section {
          background: var(--nude);
          padding: 90px 5%;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 1000px;
          margin: 48px auto 0;
        }
        .faq-item {
          background: white;
          border-radius: 16px;
          padding: 26px 24px;
          border: 1px solid #f0e8f0;
          transition: transform 0.3s;
        }
        .faq-item:hover { transform: translateY(-2px); }
        .faq-q {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 10px;
        }
        .faq-a { font-size: 0.86rem; color: #6a5a6a; line-height: 1.75; }
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr; gap: 40px; }
          .form-row { grid-template-columns: 1fr; }
          .faq-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="page-header">
        <span className="section-label">We'd love to hear from you</span>
        <h1 className="section-title">Get in Touch</h1>
        <p style={{ color: '#8a7a8a', maxWidth: '400px', margin: '16px auto 0', fontSize: '0.95rem', lineHeight: 1.75 }}>
          Questions, custom orders, or just want to say hi — we're always here for you.
        </p>
      </div>

      <div className="contact-layout">
        <div className="info-section">
          <h3>Talk to us</h3>
          <p>
            We typically respond within 2–4 hours on business days. For urgent inquiries, WhatsApp is the fastest way to reach us.
          </p>

          {[
            { icon: '📧', label: 'Email Us', value: 'hzk3903159@gmail.com' },
            { icon: '💬', label: 'WhatsApp', value: '+92 300 000 0000' },
            { icon: '📍', label: 'Located In', value: 'Lahore, Punjab, Pakistan' },
            { icon: '🕐', label: 'Working Hours', value: 'Mon–Sat, 10am – 7pm PKT' },
          ].map((c, i) => (
            <div key={i} className="contact-card">
              <div className="cc-icon">{c.icon}</div>
              <div>
                <div className="cc-label">{c.label}</div>
                <div className="cc-value">{c.value}</div>
              </div>
            </div>
          ))}

          <div className="social-links">
            {['📸', '📘', '🐦', '▶️'].map((s, i) => (
              <a key={i} href="#" className="soc-btn">{s}</a>
            ))}
          </div>
        </div>

        <div className="form-box">
          {sent ? (
            <div className="success-box">
              <div className="success-icon">✓</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '12px' }}>Message Sent!</h3>
              <p style={{ color: '#6a5a6a', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '24px' }}>
                Your message has been sent to our team. We'll be in touch within 24 hours.
              </p>
              <button className="btn-outline" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-title">Send a Message 💌</div>
              <div className="form-row">
                <div>
                  <label className="form-label">Your Name *</label>
                  <input className="form-input" name="name" required value={form.name} onChange={handleChange} placeholder="Ayesha Khan" />
                </div>
                <div>
                  <label className="form-label">Email *</label>
                  <input className="form-input" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@email.com" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" name="subject" value={form.subject} onChange={handleChange} placeholder="Custom order / Question / Feedback..." />
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-input"
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="5"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                <span>{loading ? 'Sending...' : 'Send Message →'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      <section className="faq-section">
        <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          <span className="section-label">Common Questions</span>
          <h2 className="section-title">FAQs</h2>
        </div>
        <div className="faq-grid">
          {[
            { q: 'How do I place an order?', a: 'Simply browse our collection, add to cart, and checkout. We offer Cash on Delivery — no upfront payment needed!' },
            { q: 'What sizes are available?', a: 'Our bangles are available in 2.4", 2.6", and 2.8" diameters to fit most wrists. A size guide is available on each product.' },
            { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days across Pakistan. We\'ll send you a tracking number once dispatched.' },
            { q: 'Can I return or exchange?', a: 'Yes! We accept returns within 7 days of delivery for unused, undamaged bangles in original packaging. Contact us to initiate.' },
            { q: 'Do you do custom orders?', a: 'Absolutely! We love custom pieces. Contact us via WhatsApp or the form above with your requirements and we\'ll quote you.' },
            { q: 'Are the materials safe for sensitive skin?', a: 'Most of our bangles are made from hypoallergenic brass, sterling silver, or copper. Material details are listed on each product page.' },
          ].map((f, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q">{f.q}</div>
              <p className="faq-a">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
