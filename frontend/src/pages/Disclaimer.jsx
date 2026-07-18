import React from 'react';

const Disclaimer = () => {
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
        }}>Disclaimer</h1>
        <p style={{
          color: '#cbd5e1',
          lineHeight: '1.8',
          marginBottom: '24px',
          fontSize: '1rem'
        }}>
          The information provided on ShopNest is for general informational purposes only. While we strive to keep product details and pricing accurate, we cannot guarantee that every listing is completely up to date.
        </p>
        <div style={{display: 'grid', gap: '18px'}}>
          <div>
            <h2 style={{fontSize: '1.25rem', marginBottom: '10px', color: '#f97316'}}>Product Information</h2>
            <p style={{color: '#cbd5e1', lineHeight: '1.75'}}>
              Product descriptions, images, and specifications are provided by our suppliers and partners. Actual products may vary slightly in appearance once shipped.
            </p>
          </div>
          <div>
            <h2 style={{fontSize: '1.25rem', marginBottom: '10px', color: '#f97316'}}>No Guarantees</h2>
            <p style={{color: '#cbd5e1', lineHeight: '1.75'}}>
              ShopNest does not guarantee availability of every product or that all prices will remain constant. We recommend reviewing the order details carefully before purchase.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Disclaimer;
