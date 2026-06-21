import dbConnect from '@/lib/mongoose';
import Product from '@/lib/models/Product';
import ProductCard from '@/components/ProductCard';
import FeedbackArea from '@/components/FeedbackArea';
import Translate from '@/components/Translate';

export const dynamic = 'force-dynamic';

export default async function Home() {
  await dbConnect();
  const dbProducts = await Product.find({}).limit(4).lean();
  
  // Format MongoDB _id for client component
  const featuredProducts = dbProducts.map((p: any) => ({
    ...p,
    _id: p._id.toString(),
    id: p._id.toString()
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <img 
          src="/images/hero_bg_1777728452248.png" 
          alt="Fresh Farm Products" 
          className="hero-bg"
        />
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title"><Translate tKey="hero.title" fallback="Pure Like Mom's Love" /></h1>
          <p className="hero-subtitle">
            <Translate tKey="hero.subtitle" fallback="There is always no substitute for moms love and food, but I found one which is no where lesser than mom's food... None other than Farm Connect foods." />
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="/shop" className="btn btn-primary"><Translate tKey="hero.shopNow" fallback="Shop Now" /></a>
            <a href="/about" className="btn btn-secondary"><Translate tKey="hero.learnMore" fallback="Learn More" /></a>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/shop" className="btn btn-primary">View All Products</a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--text-dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 className="section-title" style={{ color: 'var(--text-dark)' }}>What Our Customers Say</h2>
          <div style={{ fontSize: '1.25rem', fontStyle: 'italic', marginBottom: '24px' }}>
            "Awesome products with great quality. Our entire family has started eating healthy with Farm Connect products. Best ever products with superior quality and its definitely a moms promise."
          </div>
          <div style={{ fontWeight: 600 }}>- Happy Customer</div>
        </div>
      </section>

      {/* Feedback & Contact Area */}
      <FeedbackArea />
    </div>
  );
}
