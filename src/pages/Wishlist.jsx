import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      <div className="page-header">
        <div className="section-label">Saved</div>
        <h1 className="arrivals-title">My <em>Wishlist</em></h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <p>Your wishlist is empty.</p>
          <Link to="/products"><button className="btn-primary">Explore Collection</button></Link>
        </div>
      ) : (
        <div className="listing-grid">
          {wishlist.map(p => (
            <div key={p.id} className="listing-card">
              <Link to={`/products/${p.id}`}>
                <div className="listing-img">
                  <img src={p.img} alt={p.name} />
                </div>
              </Link>
              <div className="listing-info">
                <div>
                  <div className="listing-name">{p.name}</div>
                  <div className="listing-cat">{p.category}</div>
                </div>
                <div className="listing-actions">
                  <span className="listing-price">€ {p.price.toLocaleString()}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="wish-btn wished" onClick={() => toggleWishlist(p)} title="Remove">♥</button>
                    <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '8px' }}
                      onClick={() => addToCart(p)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}