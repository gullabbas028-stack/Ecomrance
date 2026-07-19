import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      <div className="page-header">
        <div className="section-label">Your Bag</div>
        <h1 className="arrivals-title">Shopping <em>Cart</em></h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/products"><button className="btn-primary">Continue Shopping</button></Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* ── ITEMS ── */}
          <div className="cart-items">
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart-row">
                <img src={item.img} alt={item.name} className="cart-img" />
                <div className="cart-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">Size: {item.size}</div>
                  <div className="qty-row" style={{ marginTop: '12px' }}>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.size, item.qty - 1)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.size, item.qty + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <div className="listing-price">€ {(item.price * item.qty).toLocaleString()}</div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id, item.size)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div className="order-summary">
            <div className="summary-title">Order Summary</div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>€ {cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{cartTotal >= 300 ? 'Free' : '€ 25'}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%)</span>
              <span>€ {(cartTotal * 0.05).toFixed(2)}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>€ {(cartTotal + (cartTotal >= 300 ? 0 : 25) + cartTotal * 0.05).toFixed(2)}</span>
            </div>

            {cartTotal < 300 && (
              <p className="free-ship-notice">
                Add € {(300 - cartTotal).toFixed(0)} more for free shipping
              </p>
            )}

            <button className="btn-primary" style={{ width: '100%', marginTop: '24px', padding: '18px' }}
              onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            <Link to="/products">
              <button className="btn-ghost" style={{ width: '100%', marginTop: '12px', padding: '16px' }}>
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}