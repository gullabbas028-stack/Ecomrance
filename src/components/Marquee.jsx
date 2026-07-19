const items = [
  'New Arrivals', 'AW 2025 Collection',
  'Complimentary Shipping Over $300', 'Noir Exclusive', 'Handcrafted in Italy',
];

export default function Marquee() {
  const doubled = [...items, ...items]; // seamless loop

  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i}>
            <span className="marquee-item">{item}</span>
            {i < doubled.length - 1 && <span className="marquee-dot"> ◆ </span>}
          </span>
        ))}
      </div>
    </div>
  );
}