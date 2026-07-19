const links = {
  Collection: ['Women', 'Men', 'Accessories', 'New Arrivals', 'Sale'],
  Company:    ['About Noir', 'Editorials', 'Sustainability', 'Press', 'Careers'],
  Help:       ['Sizing Guide', 'Returns', 'Shipping', 'Contact', 'Stores'],
};

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand">NOIR</div>
          <p className="footer-tagline">
            A house of contemporary fashion rooted in darkness, crafted in light.
            Each piece tells the story of a woman in command.
          </p>
        </div>

        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <div className="footer-heading">{heading}</div>
            <ul className="footer-links">
              {items.map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2025 Noir. All rights reserved.</span>
        <div className="social-links">
          {['Instagram', 'Pinterest', 'TikTok'].map(s => (
            <a key={s} className="social-link" href="#">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}