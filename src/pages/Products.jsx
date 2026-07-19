import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import products from '../data/products';

const CATEGORIES = ['all', 'women', 'men', 'accessories'];
const SORTS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name',       label: 'Name A–Z' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch]   = useState('');
  const [sort, setSort]       = useState('default');
  const cat = searchParams.get('cat') || 'all';
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (search.trim()) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name')       list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [cat, search, sort]);

  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      {/* ── HEADER ── */}
      <div className="page-header">
        <div className="section-label">Shop</div>
        <h1 className="arrivals-title">
          {cat === 'all' ? 'All Collections' : <><em>{cat.charAt(0).toUpperCase() + cat.slice(1)}</em></>}
        </h1>
      </div>

      {/* ── FILTERS BAR ── */}
      <div className="filters-bar">
        {/* Search */}
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search pieces..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Category tabs */}
        <div className="cat-tabs">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`cat-tab ${cat === c ? 'active' : ''}`}
              onClick={() => setSearchParams(c === 'all' ? {} : { cat: c })}
            >
              {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* ── RESULTS COUNT ── */}
      <p className="results-count">{filtered.length} pieces</p>

      {/* ── GRID ── */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No pieces found.</p>
          <button className="btn-primary" onClick={() => { setSearch(''); setSearchParams({}); }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="listing-grid">
          {filtered.map(p => (
            <div key={p.id} className="listing-card">
              <Link to={`/products/${p.id}`}>
                <div className="listing-img">
                  <img src={p.img} alt={p.name} />
                  {p.badge && <span className="product-badge">{p.badge}</span>}
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
                    <button
                      className={`wish-btn ${isWishlisted(p.id) ? 'wished' : ''}`}
                      onClick={() => toggleWishlist(p)}
                      title="Add to wishlist"
                    >
                      {isWishlisted(p.id) ? '♥' : '♡'}
                    </button>
                    <button
                      className="btn-primary"
                      style={{ padding: '10px 20px', fontSize: '8px' }}
                      onClick={() => addToCart(p)}
                    >
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