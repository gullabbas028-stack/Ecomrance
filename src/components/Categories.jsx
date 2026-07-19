// ── REPLACE each import with your own category image ──────────────────
const categories = [
  { id: 1, img: "/images/cat-women.jpg",       label: 'Women' },
  { id: 2, img: "/images/cat-men.jpg",          label: 'Men' },
  { id: 3, img: "/images/cat-accessories.jpg",  label: 'Accessories' },
];
export default function Categories() {
  return (
    <section className="categories-section">
      <div style={{ marginBottom: '60px' }}>
        <div className="section-label">Shop By</div>
        <h2 className="arrivals-title">Categories</h2>
      </div>

      <div className="categories-grid">
        {categories.map(cat => (
          <div key={cat.id} className="cat-card">
            {/* ⬇ each img src is your imported category image */}
            <img src={cat.img} alt={cat.label} />
            <div className="cat-overlay">
              <div className="cat-name"><em>{cat.label}</em></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}