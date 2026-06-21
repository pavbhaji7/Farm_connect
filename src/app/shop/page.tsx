import dbConnect from '@/lib/mongoose';
import Product from '@/lib/models/Product';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function Shop() {
  await dbConnect();
  const dbProducts = await Product.find({}).lean();
  
  const products = dbProducts.map((p: any) => ({
    ...p,
    _id: p._id.toString(),
    id: p._id.toString()
  }));

  const categories = [
    { name: "Fresh Produce", icon: "🍎", link: "/category/fresh-produce" },
    { name: "Organic Baby Foods", icon: "👶", link: "/category/baby-foods" },
    { name: "Diabetic Supplements", icon: "🌿", link: "/category/diabetic" },
    { name: "Healthy Snacks & Sweets", icon: "🍪", link: "/category/snacks" },
    { name: "Healthy Breakfast", icon: "🥣", link: "/category/breakfast" },
    { name: "Homemade Ghee and Oils", icon: "🧈", link: "/category/ghee" },
    { name: "Nuts & Spices", icon: "🌰", link: "/category/nuts" },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '80px 0' }}>
      <div className="container">
        <h2 className="section-title" style={{ marginBottom: '32px' }}>Shop By Category</h2>
        <div className="categories-grid" style={{ marginBottom: '64px' }}>
          {categories.map((cat, index) => (
            <a href={cat.link} key={index} className="category-card">
              <div className="category-icon">{cat.icon}</div>
              <div className="category-name">{cat.name}</div>
            </a>
          ))}
        </div>

        <h1 className="section-title">All Products</h1>
        <div className="products-grid">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
