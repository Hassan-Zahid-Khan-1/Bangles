import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';

export default function Wishlist({ wishlist, toggleWishlist, addToCart }) {
  return (
    <>
      <Head><title>Wishlist — BangleBelle</title></Head>
      <style jsx>{`
        .page-header {
          padding: 140px 5% 60px;
          background: linear-gradient(135deg, var(--nude), var(--blush));
          text-align: center;
        }
        .content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 5%;
        }
        .empty {
          text-align: center;
          padding: 80px 20px;
        }
        .empty-icon {
          font-size: 5rem;
          display: block;
          margin-bottom: 24px;
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      <div className="page-header">
        <span className="section-label">Saved for later</span>
        <h1 className="section-title">Your Wishlist ♡</h1>
      </div>
      <div className="content">
        {wishlist?.length === 0 || !wishlist ? (
          <div className="empty">
            <span className="empty-icon">🌸</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '14px' }}>
              Your wishlist is empty
            </h3>
            <p style={{ color: '#9a8a9a', marginBottom: '28px' }}>
              Browse our collection and save your favourites here.
            </p>
            <Link href="/shop" className="btn-primary"><span>Discover Bangles →</span></Link>
          </div>
        ) : (
          <>
            <p style={{ color: '#9a8a9a', marginBottom: '36px', fontSize: '0.9rem' }}>
              {wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved
            </p>
            <div className="grid-4">
              {wishlist.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={true}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
