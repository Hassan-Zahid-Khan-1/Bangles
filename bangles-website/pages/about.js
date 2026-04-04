import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head><title>Our Story — BangleBelle</title></Head>
      <style jsx>{`
        .hero {
          padding: 140px 5% 80px;
          background: linear-gradient(135deg, var(--charcoal) 0%, #3d2a42 100%);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .hero::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          border: 1px solid rgba(244,167,185,0.12);
          top: -200px;
          right: -100px;
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(212,168,83,0.12);
          bottom: -150px;
          left: -80px;
          pointer-events: none;
        }
        .hero-eyebrow {
          font-family: var(--font-accent);
          font-style: italic;
          font-size: 1rem;
          color: var(--gold-light);
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 18px;
          animation: fadeIn 0.8s ease both;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          color: white;
          line-height: 1.1;
          margin-bottom: 20px;
          animation: fadeUp 0.8s ease 0.2s both;
        }
        .hero-title em { color: var(--rose); font-style: italic; }
        .hero-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.6);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.8;
          animation: fadeUp 0.8s ease 0.4s both;
        }
        /* STORY SECTION */
        .story {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 5%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .story-img-wrap {
          position: relative;
        }
        .story-img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 24px;
        }
        .story-img-accent {
          position: absolute;
          bottom: -24px;
          right: -24px;
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, var(--blush), var(--nude));
          border-radius: 20px;
          z-index: -1;
        }
        .story-badge {
          position: absolute;
          bottom: 24px;
          left: -24px;
          background: linear-gradient(135deg, var(--rose-deep), var(--gold));
          color: white;
          padding: 20px 24px;
          border-radius: 18px;
          box-shadow: 0 14px 36px rgba(224,122,155,0.35);
        }
        .story-badge .num {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 700;
          display: block;
          line-height: 1;
          margin-bottom: 4px;
        }
        .story-badge .lbl {
          font-size: 0.75rem;
          opacity: 0.85;
        }
        .story-text .section-sub { max-width: 100%; }
        .story-quote {
          font-family: var(--font-accent);
          font-style: italic;
          font-size: 1.3rem;
          color: var(--rose-deep);
          border-left: 3px solid var(--rose);
          padding-left: 20px;
          margin: 28px 0;
          line-height: 1.65;
        }
        /* VALUES */
        .values {
          background: var(--nude);
          padding: 90px 5%;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 1000px;
          margin: 50px auto 0;
        }
        .value-card {
          background: white;
          border-radius: 20px;
          padding: 36px 30px;
          text-align: center;
          transition: transform 0.3s ease;
        }
        .value-card:hover { transform: translateY(-6px); }
        .value-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--blush);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin: 0 auto 20px;
          transition: transform 0.3s ease;
        }
        .value-card:hover .value-icon { transform: scale(1.1) rotate(-5deg); }
        .value-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 12px;
        }
        .value-text { font-size: 0.88rem; color: #6a5a6a; line-height: 1.75; }
        /* TEAM */
        .team {
          padding: 90px 5%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 50px;
        }
        .team-card {
          text-align: center;
        }
        .team-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 18px;
          display: block;
          border: 4px solid var(--blush);
          transition: transform 0.3s ease;
        }
        .team-card:hover .team-img {
          transform: scale(1.05);
          border-color: var(--rose);
        }
        .team-name {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 6px;
        }
        .team-role {
          font-family: var(--font-accent);
          font-style: italic;
          font-size: 0.88rem;
          color: var(--rose-deep);
          margin-bottom: 12px;
        }
        .team-bio { font-size: 0.82rem; color: #6a5a6a; line-height: 1.7; }
        /* CTA */
        .cta {
          background: linear-gradient(135deg, var(--rose-deep), var(--gold));
          padding: 80px 5%;
          text-align: center;
        }
        .cta h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          color: white;
          margin-bottom: 16px;
        }
        .cta p { color: rgba(255,255,255,0.8); margin-bottom: 32px; font-size: 1rem; line-height: 1.75; }
        @media (max-width: 900px) {
          .story { grid-template-columns: 1fr; gap: 40px; }
          .values-grid, .team-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .values-grid, .team-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hero">
        <span className="hero-eyebrow">✦ Our Story ✦</span>
        <h1 className="hero-title">Crafted with <em>Passion</em>,<br />Worn with Pride</h1>
        <p className="hero-sub">
          BangleBelle was born from a love of South Asian heritage and the timeless beauty of adornment.
        </p>
      </div>

      <div className="story">
        <div className="story-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=700&q=80"
            alt="Bangles being crafted"
            className="story-img"
          />
          <div className="story-img-accent" />
          <div className="story-badge">
            <span className="num">2018</span>
            <span className="lbl">Founded with love</span>
          </div>
        </div>
        <div className="story-text">
          <span className="section-label">How it began</span>
          <h2 className="section-title">From a Grandmother's<br />Jewelry Box</h2>
          <blockquote className="story-quote">
            "Every bangle I wore told a story — of celebrations, of belonging, of who I am."
          </blockquote>
          <p className="section-sub" style={{ marginBottom: '20px' }}>
            BangleBelle started in 2018 when our founder Zara rediscovered her grandmother's collection of handcrafted bangles. Struck by their artistry and emotional weight, she set out to bring these traditions to modern women who deserve to feel equally adorned.
          </p>
          <p className="section-sub" style={{ marginBottom: '32px' }}>
            Today we work with 40+ artisan families across Rajasthan, Lahore, and Dhaka — preserving ancient crafting techniques while creating pieces that feel fresh and wearable every day.
          </p>
          <Link href="/shop" className="btn-primary"><span>Shop the Collection →</span></Link>
        </div>
      </div>

      <section className="values">
        <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          <span className="section-label">What we stand for</span>
          <h2 className="section-title">Our Values</h2>
        </div>
        <div className="values-grid">
          {[
            { icon: '🤲', title: 'Artisan First', text: 'Every piece is handcrafted by skilled artisans paid fairly for their expertise and time. We believe good craft deserves good compensation.' },
            { icon: '🌱', title: 'Sustainably Made', text: 'We use ethically sourced metals, natural dyes, and eco-friendly packaging. Beauty shouldn\'t come at the planet\'s expense.' },
            { icon: '💝', title: 'Made for Every Woman', text: 'Whether you\'re dressing up for Eid or styling a casual Monday, our bangles are designed for real women in real moments.' },
          ].map((v, i) => (
            <div key={i} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <div className="value-title">{v.title}</div>
              <p className="value-text">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="team">
        <div style={{ textAlign: 'center' }}>
          <span className="section-label">The people behind BangleBelle</span>
          <h2 className="section-title">Meet the Team</h2>
        </div>
        <div className="team-grid">
          {[
            { name: 'Zara Malik', role: 'Founder & Creative Director', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80', bio: 'A jewelry enthusiast turned entrepreneur. Zara curates every collection personally to ensure quality and beauty.' },
            { name: 'Hina Shah', role: 'Head of Artisan Relations', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80', bio: 'Hina manages our network of 40+ artisan families, ensuring fair partnerships and preserving craft traditions.' },
            { name: 'Sana Iqbal', role: 'Lead Jewelry Designer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', bio: 'With 12 years of experience in jewelry design, Sana translates cultural heritage into wearable contemporary art.' },
          ].map((m, i) => (
            <div key={i} className="team-card">
              <img src={m.img} alt={m.name} className="team-img" />
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
              <p className="team-bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="cta">
        <h2>Ready to Find Your Signature Bangle?</h2>
        <p>Explore over 500 styles handcrafted just for you.</p>
        <Link href="/shop" className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)' }}>
          Browse Collection →
        </Link>
      </section>
    </>
  );
}
