"use client";
import React, { useState } from 'react';

const faqs = [
  {
    question: "What is Mahalaxmi Kohinoor Pimpri (Life in Motion)?",
    answer: "Mahalaxmi Kohinoor Pimpri (The Arena — Life in Motion) is a landmark joint venture sports township by Mahalaxmi Group and Kohinoor Group in Pimpri Chinchwad, Pune. Spanning 11 towers across a master-planned parcel with an 80,000 Sq.Ft. sports operating system managed by ILESEUM Sports Management."
  },
  {
    question: "What is the price of 2 BHK & 3 BHK at Mahalaxmi Kohinoor Pimpri?",
    answer: "Prices start from ₹88.5 Lakhs for 2 BHK Smart Residences and ₹1.28 Cr Onwards for 3 BHK Luxury Residences. The 3 BHK Grand Corner Suites start from ₹1.49 Cr Onwards. All residences feature zero-wastage layouts, panoramic balconies, and premium branded sanitary fittings."
  },
  {
    question: "How close is The Arena to PCMC Metro Station and Kohinoor World Towers (KWT)?",
    answer: "The Arena enjoys prime PCMC connectivity: just 2.4 km from PCMC Metro Station and Pimpri Metro, 2 km from Kohinoor World Towers (KWT Phase 2 commercial hub), 2.8 km from Pimpri Railway Station, and under 15 minutes to Hinjewadi IT Park via NH-48."
  },
  {
    question: "What amenities are included in the Life in Motion sports township?",
    answer: "Life in Motion is an 80,000 Sq.Ft. athletic ecosystem operated professionally by ILESEUM Sports. It features a cricket ground with practice nets, tennis academy, olympic-length swimming pool, futsal arena, basketball courts, 1,787 sq.ft. cardio gymnasium, jogging track, and dedicated youth coaching academies."
  },
  {
    question: "पिंपरी मध्ये २ व ३ बीएचके फ्लॅट बुकिंग कशी करावी? (Pimpri madhe flat booking)",
    answer: "पिंपरी मधील The Arena (Mahalaxmi Kohinoor) मध्ये २ आणि ३ बीएचके फ्लॅट बुकिंगसाठी आपण अधिकृत वेबसाईटवरून VIP साईट व्हिजिट फॉर्म सबमिट करू शकता. ईओआय (EOI) द्वारे प्राधान्य युनिट निवडता येते."
  },
  {
    question: "Is Mahalaxmi Kohinoor The Arena MahaRERA registered?",
    answer: "Yes, The Arena is a 100% MahaRERA registered project in PCMC with complete legal transparency, sanctioned layouts, and dedicated 70% project escrow protection under registration number P5210005XXXX."
  },
  {
    question: "Can NRIs invest in Mahalaxmi Kohinoor Pune real estate?",
    answer: "Yes, NRIs and OCIs can purchase luxury apartments under FEMA guidelines. We offer digital site walkthroughs, international banking support (NRE/NRO), and end-to-end rental yield management delivering 4.5% to 5.2% gross returns."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section section-padding" id="faq" style={{ background: "var(--neon-dark)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: "3rem" }}>
          <span className="badge-purple">• FREQUENTLY ASKED QUESTIONS •</span>
          <h2 className="section-title">PROJECT <span className="highlight-neon">INSIGHTS</span></h2>
          <p className="section-subtitle">Everything you need to know about purchasing a luxury apartment at Mahalaxmi Kohinoor The Arena, Pimpri.</p>
        </div>

        <div className="faq-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="faq-item" 
              style={{ 
                marginBottom: "1rem", 
                border: "1px solid rgba(255,255,255,0.1)", 
                borderRadius: "8px", 
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.02)"
              }}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                style={{
                  width: "100%",
                  padding: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  color: "#fff",
                  border: "none",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "inherit"
                }}
              >
                {faq.question}
                <i className={`ri-arrow-down-s-line`} style={{ transform: openIndex === index ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}></i>
              </button>
              {openIndex === index && (
                <div className="faq-answer" style={{ padding: "0 1.5rem 1.5rem", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
