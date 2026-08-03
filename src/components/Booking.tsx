"use client";
import React from 'react';

export default function Booking() {
  return (
    <section className="booking-section section-padding" id="booking">
      <div className="container">
        <div className="booking-grid">
          <div className="booking-text">
            <span className="badge-neon">• OFFICIAL LAUNCH ENQUIRY •</span>
            <h2>STEP INTO <span className="highlight-neon">LIFE IN MOTION</span></h2>
            <p>
              Mahalaxmi Group (25+ Years Legacy | 4.2M Sq.Ft. Delivered) in Joint Venture with Kohinoor Group and Agarwal Sukhwani Associates invites you to experience Pimpri’s landmark sports township.
            </p>
            <ul className="booking-features">
              <li><i className="ri-checkbox-circle-fill"></i> <span>Priority site visit & master plan physical walkthrough</span></li>
              <li><i className="ri-checkbox-circle-fill"></i> <span>Exclusive pre-launch inventory & customized payment schedule</span></li>
              <li><i className="ri-checkbox-circle-fill"></i> <span>Complimentary Ileseum Sports Club membership guidance</span></li>
              <li><i className="ri-checkbox-circle-fill"></i> <span>Dedicated Senior Sales Director consultation</span></li>
            </ul>
          </div>

          <div className="booking-form-box">
            <h3>Register for Priority Access</h3>
            <p>Fill out your details to receive the official floor plans, price sheet, and brochure PDF.</p>
            
            <form id="vipBookingForm">
              <div className="form-group">
                <label htmlFor="vip-name">Your Full Name *</label>
                <input type="text" id="vip-name" name="fullName" required placeholder="e.g. Rahul Sharma" />
              </div>
              <div className="form-group">
                <label htmlFor="vip-mobile">Mobile Number (with WhatsApp) *</label>
                <input type="tel" id="vip-mobile" name="mobile" required placeholder="e.g. +91 98765 43210" />
              </div>
              <div className="form-group">
                <label htmlFor="vip-email">Email Address</label>
                <input type="email" id="vip-email" name="email" placeholder="e.g. rahul@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="vip-config">Interested Configuration</label>
                <select id="vip-config" name="configuration">
                  <option>2 BHK Luxury Sports Residence (₹ 88.5 L*)</option>
                  <option>3 BHK Premium Residence (₹ 1.28 Cr*)</option>
                  <option>3 BHK Grand Corner Suite (₹ 1.49 Cr*)</option>
                  <option>4 BHK Sky Residence & Penthouse (₹ 2.15 Cr*)</option>
                  <option>Commercial Plaza Frontage Unit</option>
                </select>
              </div>
              <button type="submit" className="btn btn-neon" style={{ width: "100%", marginTop: "12px", fontSize: "1.05rem" }}>
                <i className="ri-send-plane-fill"></i> Request Official Details & Brochure
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
