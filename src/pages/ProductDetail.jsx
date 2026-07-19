import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import products from '../data/products';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [size, setSize]   = useState('M');
  const [qty, setQty]     = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div className="page-container" style={{ paddingTop: '150px', textAlign: 'center' }}>
      <h2 className="arrivals-title">Product not found</h2>
      <Link to="/products"><button className="btn-primary" style={{ marginTop: '32px' }}>Back to Shop</button></Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Shop</Link> / <span>{product.name}</span>
      </div>

      {/* ── MAIN DETAIL ── */}
      <div className="detail-grid">
        {/* Image */}
        <div className="detail-img-wrap">
          <img src={product.img} alt={product.name} className="detail-img" />
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </div>

        {/* Info */}
        <div className="detail-info">
          <div className="section-label">{product.category}</div>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-price">€ {product.price.toLocaleString()}</div>
          <p className="detail-desc">{product.description}</p>

          {/* Size */}
          <div className="detail-section-title">Select Size</div>
          <div className="size-grid">
            {SIZES.map(s => (
              <button
                key={s}
                className={`size-btn ${size === s ? 'active' : ''}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Qty */}
          <div className="detail-section-title">Quantity</div>
          <div className="qty-row">
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="qty-num">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
          </div>

          {/* Actions */}
          <div className="detail-actions">
            <button className="btn-primary detail-atc" onClick={handleAddToCart}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button
              className={`wish-btn wish-btn-lg ${isWishlisted(product.id) ? 'wished' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              {isWishlisted(product.id) ? '♥ Wishlisted' : '♡ Wishlist'}
            </button>
          </div>

          <button
            className="btn-ghost"
            style={{ width: '100%', marginTop: '12px' }}
            onClick={() => { addToCart(product, size, qty); navigate('/cart'); }}
          >
            Buy Now →
          </button>

          {/* Details */}
          <div className="detail-meta">
            <div className="detail-meta-row"><span>Material</span><span>100% Italian Wool</span></div>
            <div className="detail-meta-row"><span>Origin</span><span>Handcrafted in Italy</span></div>
            <div className="detail-meta-row"><span>Shipping</span><span>Complimentary over € 300</span></div>
            <div className="detail-meta-row"><span>Returns</span><span>30-day free returns</span></div>
          </div>
        </div>
      </div>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <div style={{ marginTop: '100px' }}>
          <div className="section-label">You May Also Like</div>
          <div className="related-grid">
            {related.map(p => (
              <Link to={`/products/${p.id}`} key={p.id} className="related-card">
                <div className="related-img"><img src={p.img} alt={p.name} /></div>
                <div className="related-name">{p.name}</div>
                <div className="listing-price">€ {p.price.toLocaleString()}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}