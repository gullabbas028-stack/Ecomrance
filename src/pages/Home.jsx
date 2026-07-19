import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import NewArrivals from '../components/NewArrivals';
import Editorial from '../components/Editorial';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <NewArrivals />
      <Editorial />
      <Categories />
      <Newsletter />
    </>
  );
}