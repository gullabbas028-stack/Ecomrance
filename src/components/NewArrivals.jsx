// ── REPLACE each import with your own product image ───────────────────
// ── Koi import nahi chahiye ──
const products = [
  { id: 1, img: "/images/product-1.jpg",  name: 'The Obsidian Coat',  price: '€ 2,850', badge: 'New',  featured: true  },
  { id: 2, img: "/images/product-2.jpg",  name: 'Velvet Blazer',      price: '€ 1,290', badge: null,   featured: false },
  { id: 3, img: "/images/product-3.jpg",  name: 'Midnight Dress',     price: '€ 1,890', badge: 'Ltd',  featured: false },
  { id: 4, img: "/images/product-4.jpg",  name: 'Satin Evening Bag',  price: '€ 890',   badge: null,   featured: false },
  { id: 5, img: "/images/product-5.jpg",  name: 'Silk Trousers',      price: '€ 680',   badge: null,   featured: false },
];

export default function NewArrivals() {
  return (
    <section className="arrivals-section">
      <div className="arrivals-header">
        <div>
          <div className="section-label">New In</div>
          <h2 className="arrivals-title">New <em>Arrivals</em></h2>
        </div>
        <a href="#" className="view-all">View All Pieces</a>
      </div>

      <div className="products-grid">
        {products.map(p => (
          <div key={p.id} className={`product-card ${p.featured ? 'featured' : ''}`}>
            <div className="product-img">
              {/* ⬇ each img src is your imported product image */}
              <img src={p.img} alt={p.name} />
            </div>

            {p.badge && (
              <div className={`product-badge ${p.badgeClass}`}>{p.badge}</div>
            )}

            <div className="product-info">
              <div className="product-name">{p.name}</div>
              <div className="product-price">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}