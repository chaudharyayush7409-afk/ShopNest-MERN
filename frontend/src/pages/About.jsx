import React from 'react';

const About = () => {
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
        }}>About ShopNest</h1>
        <p style={{
          color: '#cbd5e1',
          lineHeight: '1.8',
          marginBottom: '24px',
          fontSize: '1rem'
        }}>
          ShopNest is your destination for premium products, unbeatable prices, and seamless online shopping. We created this store to bring together the best electronics, home essentials, fashion, and lifestyle products in one polished experience.
        </p>
        <div style={{display: 'grid', gap: '18px'}}>
          <div>
            <h2 style={{fontSize: '1.25rem', marginBottom: '10px', color: '#f97316'}}>Our Mission</h2>
            <p style={{color: '#cbd5e1', lineHeight: '1.75'}}>
              We want every visitor to feel confident shopping with us. That means clear product information, fast loading pages, and a premium shopping experience from browsing to checkout.
            </p>
          </div>
          <div>
            <h2 style={{fontSize: '1.25rem', marginBottom: '10px', color: '#f97316'}}>What We Offer</h2>
            <p style={{color: '#cbd5e1', lineHeight: '1.75'}}>
              Explore trending products handpicked for quality and style. Our featured collection is updated regularly so you always see the latest deals and curated favorites.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
