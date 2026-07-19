// ── REPLACE the src with your own image path ──────────────────────────
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-image-block">
<img src="/images/banner01.jpg" alt="Hero model" />
        </div>
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-label">Autumn / Winter 2025</div>
        <h1 className="hero-title">
          The Art<br />of <em>Silence</em>
        </h1>
        <p className="hero-subtitle">
          Where darkness becomes elegance.<br />
          New collection — crafted for those who speak through silence.
        </p>
        <div className="hero-cta">
          <button className="btn-primary">Explore Collection</button>
          <button className="btn-ghost">Watch Film</button>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}