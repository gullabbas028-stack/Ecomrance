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

  const closeMenu = () => setMenuOpen(false);
  const handleLogout = () => { logout(); closeMenu(); navigate('/'); };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <Link to="/" className="nav-logo" onClick={closeMenu}>NOIR</Link>

      <ul className="nav-links" id="primary-navigation">
        <li><Link to="/products?cat=women" onClick={closeMenu}>Women</Link></li>
        <li><Link to="/products?cat=men" onClick={closeMenu}>Men</Link></li>
        <li><Link to="/products?cat=accessories" onClick={closeMenu}>Accessories</Link></li>
        <li><Link to="/products" onClick={closeMenu}>All Collections</Link></li>
        <li className="nav-mobile-account">
          {user ? (
            <button className="btn-ghost" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" onClick={closeMenu}>Login</Link>
          )}
        </li>
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
          <Link to="/login" onClick={closeMenu}>
            <button className="btn-ghost" style={{ padding: '8px 18px', fontSize: '8px' }}>Login</button>
          </Link>
        )}
      </div>

      <button
        type="button"
        className={`nav-toggle ${menuOpen ? 'is-active' : ''}`}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(open => !open)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
