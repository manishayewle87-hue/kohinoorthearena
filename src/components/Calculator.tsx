"use client";
import React from 'react';

export default function Calculator() {
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
                <span className="slider-value" id="val-price">₹ 1.28 Cr</span>
              </div>
              <input type="range" id="calc-price" min="80" max="300" step="5" value="128"/>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Down Payment</span>
                <span className="slider-value" id="val-down">20%</span>
              </div>
              <input type="range" id="calc-down" min="10" max="50" step="5" value="20"/>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Loan Tenure</span>
                <span className="slider-value" id="val-tenure">20 Years</span>
              </div>
              <input type="range" id="calc-tenure" min="5" max="30" step="1" value="20"/>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Interest Rate</span>
                <span className="slider-value" id="val-rate">8.5% p.a.</span>
              </div>
              <input type="range" id="calc-rate" min="7.0" max="10.5" step="0.1" value="8.5"/>
            </div>

            <div style={{ marginTop: "10px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              <i className="ri-information-line" style={{ color: "var(--neon-lime)" }}></i> Assumes 8.5% annual capital appreciation & 4.2% rental yield typical of PCMC sports townships.
            </div>
          </div>

          {/*  Right: Calculated Results  */}
          <div className="calc-results">
            <div className="result-card">
              <div className="result-label">Monthly EMI Estimate</div>
              <div className="result-amount" id="result-emi">₹ 88,864</div>
            </div>

            <div className="result-card">
              <div className="result-label">Expected 5-Year Capital Appreciation</div>
              <div className="result-amount" id="result-appreciation">₹ 64.5 L</div>
            </div>

            <div className="result-card">
              <div className="result-label">Estimated Monthly Rental Yield</div>
              <div className="result-amount" id="result-yield">₹ 44,800 / mo</div>
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
