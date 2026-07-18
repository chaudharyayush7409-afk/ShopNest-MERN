import React from 'react';

const ReturnPolicy = () => {
  return (
    <main style={{
      minHeight: 'calc(100vh - 120px)',
      padding: '60px 24px',
      color: '#f8fafc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(180deg, #08090d 0%, #0b1220 100%)'
    }}>
      <section style={{
        maxWidth: '900px',
        width: '100%',
        padding: '36px',
        borderRadius: '28px',
        background: 'rgba(15, 23, 42, 0.94)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 28px 80px rgba(0,0,0,0.35)'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 3vw, 3.6rem)',
          marginBottom: '18px',
          color: '#ffffff'
        }}>Return Policy</h1>
        <p style={{
          color: '#cbd5e1',
          lineHeight: '1.8',
          marginBottom: '24px',
          fontSize: '1rem'
        }}>
          At ShopNest, customer satisfaction is our priority. If you are not fully satisfied with your purchase, our return policy makes it easy to request a refund or exchange.
        </p>
        <div style={{display: 'grid', gap: '18px'}}>
          <div>
            <h2 style={{fontSize: '1.25rem', marginBottom: '10px', color: '#f97316'}}>Return Window</h2>
            <p style={{color: '#cbd5e1', lineHeight: '1.75'}}>
              Products may be returned within 14 days of delivery, provided they are in original condition with all packaging and tags intact.
            </p>
          </div>
          <div>
            <h2 style={{fontSize: '1.25rem', marginBottom: '10px', color: '#f97316'}}>How to Request</h2>
            <p style={{color: '#cbd5e1', lineHeight: '1.75'}}>
              Contact our support team through the website or your order page to start a return. Once we receive the item, we will process your refund promptly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReturnPolicy;
