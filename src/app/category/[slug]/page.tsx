import dbConnect from '@/lib/mongoose';
import Product from '@/lib/models/Product';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

const slugToCategoryMap: Record<string, string> = {
  'fresh-produce': 'Fresh Produce',
  'baby-foods': 'Organic Baby Foods',
  'diabetic': 'Diabetic Supplements',
  'snacks': 'Healthy Snacks & Sweets',
  'breakfast': 'Healthy Breakfast',
  'ghee': 'Homemade Ghee and Oils',
  'nuts': 'Nuts & Spices'
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const categoryName = slugToCategoryMap[resolvedParams.slug] || resolvedParams.slug.replace('-', ' ');
  
  await dbConnect();
  const dbProducts = await Product.find({ category: categoryName }).lean();
  
  const formattedProducts = dbProducts.map((p: any) => ({
    ...p,
    _id: p._id.toString(),
    id: p._id.toString()
  }));

  // If no products in DB for this category, provide some mock placeholders
  const displayProducts = formattedProducts.length > 0 ? formattedProducts : [
    {
      id: parseInt(`901${resolvedParams.slug.length}`),
      name: `${categoryName} Sample 1`,
      price: 299.00,
      image: "https://placehold.co/400x300?text=Product+Image",
      category: categoryName
    },
    {
      id: parseInt(`902${resolvedParams.slug.length}`),
      name: `${categoryName} Sample 2`,
      price: 399.00,
      image: "https://placehold.co/400x300?text=Product+Image",
      category: categoryName
    },
    {
      id: parseInt(`903${resolvedParams.slug.length}`),
      name: `${categoryName} Sample 3`,
      price: 199.00,
      image: "https://placehold.co/400x300?text=Product+Image",
      category: categoryName
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '80px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <a href="/shop" style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>&larr; Back to Shop</a>
        </div>
        <h1 className="section-title" style={{ textAlign: 'left' }}>{categoryName}</h1>
        
        <div className="products-grid">
          {displayProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
