import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function Checkout() {
  const { cart, cartTotal, clearCart, user } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);

  const [shipping, setShipping] = useState({
    name: user?.name || '', email: user?.email || '',
    address: '', city: '', zip: '', country: '',
  });
  const [payment, setPayment] = useState({
    card: '', expiry: '', cvv: '', holder: '',
  });

  const shippingCost = cartTotal >= 300 ? 0 : 25;
  const tax = cartTotal * 0.05;
  const total = cartTotal + shippingCost + tax;

  const handleShipping = (e) => {
    e.preventDefault(); setStep(1);
  };
  const handlePayment = (e) => {
    e.preventDefault(); setStep(2);
  };
  const handlePlaceOrder = () => {
    clearCart();
    setPlaced(true);
  };

  if (placed) return (
    <div className="page-container" style={{ paddingTop: '150px', textAlign: 'center' }}>
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h2 className="arrivals-title" style={{ marginBottom: '16px' }}>Order <em>Confirmed</em></h2>
        <p style={{ color: 'var(--light-gray)', letterSpacing: '1px', marginBottom: '40px' }}>
          Thank you, {shipping.name}. Your order will arrive in 3–5 business days.
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );

  if (cart.length === 0) {
    navigate('/cart'); return null;
  }

  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      <div className="page-header">
        <div className="section-label">Checkout</div>
        <h1 className="arrivals-title">Complete <em>Order</em></h1>
      </div>

      {/* Steps */}
      <div className="checkout-steps">
        {STEPS.map((s, i) => (
          <div key={s} className={`checkout-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <div className="step-num">{i < step ? '✓' : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        {/* ── LEFT PANEL ── */}
        <div className="checkout-form-wrap">

          {/* STEP 0: SHIPPING */}
          {step === 0 && (
            <form className="checkout-form" onSubmit={handleShipping}>
              <div className="form-title">Shipping Information</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input required value={shipping.name} onChange={e => setShipping({...shipping, name: e.target.value})} placeholder="Jane Doe" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input required type="email" value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})} placeholder="jane@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input required value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} placeholder="123 Maison Street" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input required value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} placeholder="Paris" />
                </div>
                <div className="form-group">
                  <label>ZIP / Postal Code</label>
                  <input required value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})} placeholder="75001" />
                </div>
              </div>
              <div className="form-group">
                <label>Country</label>
                <input required value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})} placeholder="France" />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '18px', marginTop: '8px' }}>
                Continue to Payment
              </button>
            </form>
          )}

          {/* STEP 1: PAYMENT */}
          {step === 1 && (
            <form className="checkout-form" onSubmit={handlePayment}>
              <div className="form-title">Payment Details</div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input required value={payment.holder} onChange={e => setPayment({...payment, holder: e.target.value})} placeholder="Jane Doe" />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input required maxLength={19} value={payment.card}
                  onChange={e => setPayment({...payment, card: e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim()})}
                  placeholder="4242 4242 4242 4242" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry</label>
                  <input required maxLength={5} value={payment.expiry}
                    onChange={e => setPayment({...payment, expiry: e.target.value.replace(/\D/g,'').replace(/^(\d{2})(\d)/,'$1/$2')})}
                    placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input required maxLength={3} value={payment.cvv}
                    onChange={e => setPayment({...payment, cvv: e.target.value.replace(/\D/g,'')})}
                    placeholder="123" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" className="btn-ghost" style={{ flex: 1, padding: '16px' }} onClick={() => setStep(0)}>
                  ← Back
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 2, padding: '18px' }}>
                  Review Order
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: REVIEW */}
          {step === 2 && (
            <div className="checkout-form">
              <div className="form-title">Review Your Order</div>
              <div className="review-section">
                <div className="review-label">Shipping To</div>
                <p className="review-value">{shipping.name}<br />{shipping.address}, {shipping.city} {shipping.zip}<br />{shipping.country}</p>
              </div>
              <div className="review-section">
                <div className="review-label">Payment</div>
                <p className="review-value">Card ending in {payment.card.slice(-4)}</p>
              </div>
              <div className="review-items">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size}`} className="review-item">
                    <img src={item.img} alt={item.name} className="review-item-img" />
                    <div>
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-meta">Size: {item.size} · Qty: {item.qty}</div>
                    </div>
                    <div className="listing-price">€ {(item.price * item.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button className="btn-ghost" style={{ flex: 1, padding: '16px' }} onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary" style={{ flex: 2, padding: '18px' }} onClick={handlePlaceOrder}>
                  Place Order — € {total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── ORDER SUMMARY SIDEBAR ── */}
        <div className="order-summary">
          <div className="summary-title">Order Summary</div>
          {cart.map(item => (
            <div key={`${item.id}-${item.size}`} className="summary-item">
              <span>{item.name} × {item.qty}</span>
              <span>€ {(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="summary-divider" />
          <div className="summary-row"><span>Subtotal</span><span>€ {cartTotal.toLocaleString()}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `€ ${shippingCost}`}</span></div>
          <div className="summary-row"><span>Tax (5%)</span><span>€ {tax.toFixed(2)}</span></div>
          <div className="summary-divider" />
          <div className="summary-row summary-total"><span>Total</span><span>€ {total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}