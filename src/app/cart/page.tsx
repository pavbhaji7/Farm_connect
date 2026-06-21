"use client";

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '32px' }}>Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px', backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
            <h2 style={{ marginBottom: '16px' }}>Your cart is empty</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>Looks like you haven't added anything yet.</p>
            <a href="/shop" className="btn btn-primary">Start Shopping</a>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border)', gap: '24px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{item.name}</h3>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Quantity: {item.quantity}</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary-dark)', marginTop: '8px' }}>₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, padding: '8px' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ padding: '32px', backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px' }}>
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn btn-secondary" onClick={clearCart} style={{ flex: 1 }}>Clear Cart</button>
                <button className="btn btn-primary" style={{ flex: 2 }}>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
