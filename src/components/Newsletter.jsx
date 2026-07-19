import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  return (
    <div className="newsletter">
      <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>
        <span>Stay Connected</span>
      </div>
      <h2 className="newsletter-title">Enter the <em>Circle</em></h2>
      <p className="newsletter-sub">Early access. Private events. Curated editorials.</p>

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}