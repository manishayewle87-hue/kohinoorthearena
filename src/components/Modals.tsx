"use client";
import React, { useState, useEffect } from 'react';

// Global custom events for modals and toasts
export const showToast = (message: string) => {
  window.dispatchEvent(new CustomEvent('arena-toast', { detail: message }));
};

export const showModal = (content: React.ReactNode) => {
  window.dispatchEvent(new CustomEvent('arena-modal', { detail: content }));
};

export const closeModal = () => {
  window.dispatchEvent(new CustomEvent('arena-close-modal'));
};

export default function Modals() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const handleToast = (e: any) => {
      setToastMessage(e.detail);
      setTimeout(() => setToastMessage(null), 4500);
    };

    const handleModal = (e: any) => {
      setModalContent(e.detail);
      document.body.style.overflow = 'hidden';
    };

    const handleClose = () => {
      setModalContent(null);
      document.body.style.overflow = '';
    };

    window.addEventListener('arena-toast', handleToast);
    window.addEventListener('arena-modal', handleModal);
    window.addEventListener('arena-close-modal', handleClose);

    // Global click listener for any element with .trigger-schedule
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.trigger-schedule')) {
        e.preventDefault();
        showModal(
          <div className="text-center">
            <span className="badge-neon">• VIP PRIORITY ACCESS •</span>
            <h2 className="section-title">Schedule VIP Site Visit</h2>
            <p className="section-subtitle">Experience 80,000 Sq. Ft. of Life in Motion and tour our 34-storey architectural models.</p>
            <form 
              onSubmit={async (ev) => {
                ev.preventDefault();
                showToast("Processing request...");
                
                // Get form data
                const form = ev.target as HTMLFormElement;
                const name = (form.elements[0] as HTMLInputElement).value;
                const phone = (form.elements[1] as HTMLInputElement).value;
                const interest = (form.elements[2] as HTMLSelectElement).value;
                const date = (form.elements[3] as HTMLInputElement).value;

                try {
                  const res = await fetch('/api/lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, interest, date, source: 'VIP Site Visit' })
                  });
                  if(res.ok) {
                    closeModal();
                    showToast("VIP Site Visit Scheduled! Our Senior Relationship Manager will contact you in 15 minutes.");
                  } else {
                    showToast("Failed to process request. Please try again.");
                  }
                } catch(e) {
                  showToast("Error connecting to server.");
                }
              }} 
              style={{ maxWidth: "500px", margin: "0 auto", textAlign: "left" }}
            >
              <div className="form-group">
                <label>Your Full Name *</label>
                <input type="text" required placeholder="e.g. Rahul Sharma" />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input type="tel" required placeholder="e.g. +91 98765 43210" />
              </div>
              <div className="form-group">
                <label>Preferred Residence Configuration</label>
                <select>
                  <option>2 BHK Luxury Sports Residence (₹ 88.5 L*)</option>
                  <option>3 BHK Premium Residence (₹ 1.28 Cr*)</option>
                  <option>3 BHK Grand Corner Suite (₹ 1.49 Cr*)</option>
                  <option>4 BHK Sky Residence & Penthouse (₹ 2.15 Cr*)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Preferred Date & Time</label>
                <input type="datetime-local" />
              </div>
              <button type="submit" className="btn btn-neon" style={{ width: "100%", marginTop: "10px" }}>
                <i className="ri-calendar-check-line"></i> Confirm Priority Booking
              </button>
            </form>
          </div>
        );
      }
      
      if (target.closest('.trigger-brochure')) {
        e.preventDefault();
        showToast("Downloading Official Brochure (Mahalaxmi_The_ARENA_Brochure.pdf)...");
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      window.removeEventListener('arena-toast', handleToast);
      window.removeEventListener('arena-modal', handleModal);
      window.removeEventListener('arena-close-modal', handleClose);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div id="arenaToast" style={{
          position: "fixed", bottom: "30px", right: "30px", background: "rgba(13, 8, 24, 0.95)",
          color: "#DFFE00", border: "2px solid #DFFE00", padding: "16px 28px", borderRadius: "9999px",
          fontWeight: "700", fontFamily: "var(--font-outfit)", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(223, 254, 0, 0.3)",
          zIndex: 10000, display: "flex", alignItems: "center", gap: "12px", animation: "fadeIn 0.3s ease"
        }}>
          <i className="ri-checkbox-circle-fill" style={{ fontSize: "1.4rem" }}></i> 
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Overlay */}
      <div 
        className={`modal-overlay ${modalContent ? 'active' : ''}`} 
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}><i className="ri-close-line"></i></button>
          <div className="modal-body">
            {modalContent}
          </div>
        </div>
      </div>
    </>
  );
}
