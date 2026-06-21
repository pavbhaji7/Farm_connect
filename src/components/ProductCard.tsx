"use client";

import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <div style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '8px' }}>
          {product.category}
        </div>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">₹{product.price.toFixed(2)}</div>
        <button 
          className="btn btn-secondary product-action" 
          style={{ width: '100%', borderColor: 'var(--primary)' }}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
