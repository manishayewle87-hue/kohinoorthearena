"use client";
import React, { useState } from 'react';

const faqs = [
  {
    question: "What is the price of a 3 BHK in Mahalaxmi The Arena?",
    answer: "The price of a 3 BHK Smart Residence at Mahalaxmi The Arena starts from ₹ 1.28 Cr Onwards, while the 3 BHK Grand Corner Suite starts from ₹ 1.49 Cr Onwards. These premium apartments in Pimpri feature expansive living salons, panoramic balcony views, and high-end Kohler fittings."
  },
  {
    question: "Where is Kohinoor The Arena located in Pimpri?",
    answer: "Kohinoor The Arena (also known as Life in Motion Pimpri) is strategically located in the heart of Pimpri, PCMC. It offers excellent connectivity, being just 2.4 km from the PCMC Metro Station, 2 km from Kohinoor World Towers, and under 10 km from the Hinjewadi IT Park."
  },
  {
    question: "What amenities are included in the Life in Motion sports township?",
    answer: "Life in Motion is an 80,000 Sq. Ft. athletic operating system managed by ILESEUM Sports. It includes a FIFA-standard football turf, elevated infinity pool, paddle and pickleball courts, a 1,787 sq ft cardio gym, Shirin Yoku forest bathing, and dedicated children's learning zones."
  },
  {
    question: "Is Mahalaxmi The Arena a RERA registered project?",
    answer: "Yes, Mahalaxmi The Arena is a fully compliant and registered real estate project in PCMC, developed as a joint venture between Mahalaxmi Group, Kohinoor Group, and Agarwal Sukhwani Associates."
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
          <p className="section-subtitle">Everything you need to know about purchasing a luxury apartment at Mahalaxmi The Arena, Pimpri.</p>
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
