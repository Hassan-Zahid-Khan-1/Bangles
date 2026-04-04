export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onView,
}) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card" onClick={() => onView && onView(product)}>
      {product.badge && (
        <span className={`p-badge${product.badge === 'SALE' ? ' sale' : ''}`}>
          {product.badge}
        </span>
      )}

      <button
        className={`wish-btn${isWishlisted ? ' active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist && onToggleWishlist(product);
        }}
        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? '♥' : '♡'}
      </button>

      <div className="img-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={400}
          height={260}
        />
      </div>

      <div className="card-body">
        <div className="card-name">{product.name}</div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '4px',
          }}
        >
          <span
            style={{
              color: 'var(--gold)',
              fontSize: '.78rem',
              letterSpacing: '2px',
            }}
          >
            {'★'.repeat(Math.round(product.rating))}
          </span>
          <span style={{ fontSize: '.74rem', color: 'var(--muted)' }}>
            ({product.reviews})
          </span>
        </div>

        <div className="card-price">
          ₹{product.price.toLocaleString()}
          {product.originalPrice && <s>₹{product.originalPrice.toLocaleString()}</s>}
          {discount ? <span className="price-tag">{discount}% off</span> : null}
        </div>

        <div className="card-actions">
          <button
            className="btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart && onAddToCart(product);
            }}
          >
            Add to Cart
          </button>
          {onView && (
            <button
              className="btn-outline"
              style={{ padding: '10px 14px', fontSize: '.8rem' }}
              onClick={(e) => {
                e.stopPropagation();
                onView(product);
              }}
            >
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
