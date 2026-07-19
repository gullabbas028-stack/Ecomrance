// ── REPLACE with your own editorial/lookbook image ─────────────────
export default function Editorial() {
  return (
    <div className="editorial">
      <div className="editorial-visual">
       // import hata do, seedha:
<img src="/images/editorial.jpg" alt="Editorial" />
      </div>

      <div className="editorial-text">
        <div className="section-label">Editorial</div>
        <h2 className="editorial-title">
          Dressed in<br /><em>Darkness,</em><br />Adorned in Gold
        </h2>
        <p className="editorial-body">
          The AW 2025 editorial explores the tension between restraint and opulence.
          Each piece is a meditation on the power of understatement — garments that
          command attention through their very quietude.
        </p>
        <button className="btn-primary">View Lookbook</button>
      </div>
    </div>
  );
}