import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlist, user, logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">NOIR</Link>

      <ul className="nav-links">
        <li><Link to="/products?cat=women">Women</Link></li>
        <li><Link to="/products?cat=men">Men</Link></li>
        <li><Link to="/products?cat=accessories">Accessories</Link></li>
        <li><Link to="/products">All Collections</Link></li>
      </ul>

      <div className="nav-icons">
        {/* Search */}
        <button className="nav-icon" onClick={() => navigate('/products')}>⌕</button>

        {/* Wishlist */}
        <button className="nav-icon nav-icon-badge" onClick={() => navigate('/wishlist')}>
          ♡
          {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
        </button>

        {/* Cart */}
        <button className="nav-icon nav-icon-badge" onClick={() => navigate('/cart')}>
          ◻
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>

        {/* Auth */}
        {user ? (
          <div className="nav-user">
            <span className="nav-username">{user.name.split(' ')[0]}</span>
            <button className="btn-ghost" style={{ padding: '8px 18px', fontSize: '8px' }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn-ghost" style={{ padding: '8px 18px', fontSize: '8px' }}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}