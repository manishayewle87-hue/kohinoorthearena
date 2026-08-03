"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const floorPlans = [
  {
    id: '2bhk',
    title: '2 BHK Luxury',
    size: '768 - 820 Sq.Ft.',
    price: '₹ 88.5 L*',
    description: 'Perfect for modern families, featuring smart space utilization, a private balcony, and premium fixtures throughout.',
    image: '/assets/images/hero-bg.jpg', // Placeholder for actual floor plan
    features: ['Vastu Compliant', 'Zero Wastage Layout', 'Premium Finishes']
  },
  {
    id: '3bhk-premium',
    title: '3 BHK Premium',
    size: '980 - 1050 Sq.Ft.',
    price: '₹ 1.28 Cr*',
    description: 'Spacious living areas designed for maximum natural light and cross ventilation, offering an unparalleled living experience.',
    image: '/assets/images/hero-bg.jpg', 
    features: ['East-West Entry', 'Dedicated Dining Area', 'Walk-in Wardrobe Space']
  },
  {
    id: '4bhk-penthouse',
    title: '4 BHK Sky Penthouse',
    size: '1500+ Sq.Ft.',
    price: '₹ 2.15 Cr*',
    description: 'The pinnacle of luxury in Pimpri. Unobstructed city views, expansive decks, and elite craftsmanship.',
    image: '/assets/images/hero-bg.jpg',
    features: ['Panoramic Views', 'Private Elevator Lobby', 'Maids Room']
  }
];

export default function FloorPlans() {
  const [activeTab, setActiveTab] = useState(floorPlans[0].id);
  const activePlan = floorPlans.find(plan => plan.id === activeTab) || floorPlans[0];

  return (
    <section className="floor-plans-section" id="residences" style={{ padding: '6rem 0', background: '#08050e' }}>
      <div className="container">
        <div className="section-header text-center" data-reveal>
          <div className="section-subtitle">Premium Layouts</div>
          <h2 className="section-title">The Residences</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Meticulously crafted spaces designed to maximize natural light, ventilation, and your everyday comfort.
          </p>
        </div>

        <div className="floor-plans-wrapper" data-reveal>
          {/* Tabs */}
          <div className="fp-tabs">
            {floorPlans.map((plan) => (
              <button 
                key={plan.id}
                className={`fp-tab-btn ${activeTab === plan.id ? 'active' : ''}`}
                onClick={() => setActiveTab(plan.id)}
                aria-label={`View ${plan.title} Floor Plan`}
              >
                {plan.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="fp-content glass-card">
            <div className="fp-image-col">
              <div className="fp-image-wrapper">
                {/* We use hero-bg as a placeholder image until real floor plans are provided */}
                <Image 
                  src={activePlan.image} 
                  alt={`${activePlan.title} Floor Plan Mahalaxmi The Arena`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="fp-img"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="fp-image-overlay">
                  <span>Artist Impression</span>
                </div>
              </div>
            </div>
            
            <div className="fp-details-col">
              <h3>{activePlan.title}</h3>
              <div className="fp-metrics">
                <div className="metric">
                  <span className="label">Carpet Area</span>
                  <span className="value">{activePlan.size}</span>
                </div>
                <div className="metric">
                  <span className="label">Starting Price</span>
                  <span className="value" style={{ color: 'var(--neon-lime)' }}>{activePlan.price}</span>
                </div>
              </div>
              
              <p className="fp-desc">{activePlan.description}</p>
              
              <ul className="fp-features">
                {activePlan.features.map((feature, idx) => (
                  <li key={idx}><i className="ri-check-line"></i> {feature}</li>
                ))}
              </ul>

              <div className="fp-actions">
                <button className="btn btn-primary trigger-schedule" style={{ width: '100%' }}>Enquire Now</button>
                <button className="btn btn-outline trigger-brochure" style={{ width: '100%', marginTop: '1rem' }}>Download Floor Plan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .fp-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .fp-tab-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          padding: 0.75rem 1.5rem;
          border-radius: 30px;
          cursor: pointer;
          font-family: var(--font-plus-jakarta-sans);
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .fp-tab-btn:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
        }
        .fp-tab-btn.active {
          background: var(--neon-lime);
          color: var(--dark-bg);
          border-color: var(--neon-lime);
          box-shadow: 0 0 15px rgba(223, 254, 0, 0.3);
        }
        .fp-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          padding: 2rem;
          border-radius: 20px;
          animation: fade-in 0.5s ease;
        }
        .fp-image-col {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          min-height: 400px;
          background: rgba(0,0,0,0.5);
        }
        .fp-image-overlay {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(0,0,0,0.7);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.5);
        }
        .fp-details-col h3 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }
        .fp-metrics {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .fp-metrics .metric {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .fp-metrics .label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.5);
        }
        .fp-metrics .value {
          font-size: 1.25rem;
          font-weight: 700;
          font-family: var(--font-plus-jakarta-sans);
        }
        .fp-desc {
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .fp-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .fp-features li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.8);
        }
        .fp-features li i {
          color: var(--neon-lime);
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 992px) {
          .fp-content {
            grid-template-columns: 1fr;
            padding: 1.5rem;
          }
          .fp-image-col {
            min-height: 300px;
          }
        }
      `}} />
    </section>
  );
}
