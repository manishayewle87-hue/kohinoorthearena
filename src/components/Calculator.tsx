"use client";
import React, { useState } from 'react';

export default function Calculator() {
  const [price, setPrice] = useState(128); // in Lakhs
  const [downPercent, setDownPercent] = useState(20);
  const [tenureYears, setTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const priceVal = price * 100000;
  
  // Loan EMI Calculation
  const loanAmount = priceVal * (1 - downPercent / 100);
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = tenureYears * 12;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

  // Expected 5-Year Appreciation
  const futureValue = priceVal * Math.pow(1.085, 5);
  const appreciationValue = futureValue - priceVal;

  // Expected Rental Yield
  const annualRent = priceVal * 0.042;
  const monthlyRent = annualRent / 12;

  // Helpers for CSS fill
  const getFill = (val: number, min: number, max: number) => ((val - min) / (max - min)) * 100 + '%';

  return (
    <section className="calculator-section section-padding" id="calculator">
      <div className="container">
        <div className="text-center">
          <span className="badge-neon">• INVESTMENT & ROI CALCULATOR •</span>
          <h2 className="section-title">CALCULATE YOUR <span className="highlight-neon">TOWNSHIP ROI</span></h2>
          <p className="section-subtitle">Estimate your monthly EMI, expected 5-year appreciation in Pimpri, and potential rental yield.</p>
        </div>

        <div className="calc-box">
          {/*  Left: Sliders  */}
          <div className="calc-controls">
            <div className="slider-group">
              <div className="slider-label">
                <span>Property Value</span>
                <span className="slider-value">₹ {(priceVal / 10000000).toFixed(2)} Cr</span>
              </div>
              <input 
                type="range" 
                min="80" 
                max="300" 
                step="5" 
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                style={{ '--fill': getFill(price, 80, 300) } as React.CSSProperties}
              />
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Down Payment</span>
                <span className="slider-value">{downPercent}% (₹ {((priceVal * (downPercent / 100)) / 100000).toFixed(0)} L)</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="50" 
                step="5" 
                value={downPercent}
                onChange={(e) => setDownPercent(Number(e.target.value))}
                style={{ '--fill': getFill(downPercent, 10, 50) } as React.CSSProperties}
              />
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Loan Tenure</span>
                <span className="slider-value">{tenureYears} Years</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30" 
                step="1" 
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{ '--fill': getFill(tenureYears, 5, 30) } as React.CSSProperties}
              />
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Interest Rate</span>
                <span className="slider-value">{interestRate}% p.a.</span>
              </div>
              <input 
                type="range" 
                min="7.0" 
                max="10.5" 
                step="0.1" 
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ '--fill': getFill(interestRate, 7.0, 10.5) } as React.CSSProperties}
              />
            </div>

            <div style={{ marginTop: "10px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              <i className="ri-information-line" style={{ color: "var(--neon-lime)" }}></i> Assumes 8.5% annual capital appreciation & 4.2% rental yield typical of PCMC sports townships.
            </div>
          </div>

          {/*  Right: Calculated Results  */}
          <div className="calc-results">
            <div className="result-card">
              <div className="result-label">Monthly EMI Estimate</div>
              <div className="result-amount">₹ {Math.round(emi).toLocaleString('en-IN')}</div>
            </div>

            <div className="result-card">
              <div className="result-label">Expected 5-Year Capital Appreciation</div>
              <div className="result-amount">₹ {(appreciationValue / 100000).toFixed(1)} L</div>
            </div>

            <div className="result-card">
              <div className="result-label">Estimated Monthly Rental Yield</div>
              <div className="result-amount">₹ {Math.round(monthlyRent).toLocaleString('en-IN')} / mo</div>
            </div>

            <button className="btn btn-neon trigger-schedule" style={{ width: "100%", marginTop: "24px" }}>
              <i className="ri-vip-crown-line"></i> Lock In Launch Pricing Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
