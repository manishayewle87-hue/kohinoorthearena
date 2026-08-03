"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function Modals() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  
  // App context for Shortlist
  const { isShortlistDrawerOpen, setShortlistDrawerOpen, shortlist } = useAppContext();

  useEffect(() => {
    // Toast Handler
    const handleToast = (e: any) => {
      setToastMessage(e.detail);
      setTimeout(() => setToastMessage(null), 4500);
    };

    // Modal Handler
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

    // Global click listener for generic buttons
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Schedule Visit
      if (target.closest('.trigger-schedule')) {
        e.preventDefault();
        showLeadModal("Schedule VIP Site Visit", "Experience 80,000 Sq. Ft. of Life in Motion and tour our 34-storey architectural models.");
      } 
      // Download Brochure
      else if (target.closest('.trigger-brochure')) {
        e.preventDefault();
        showLeadModal("Download Exclusive Brochure", "Unlock the masterplan, high-resolution floor layouts, and complete specifications.");
      }
    };
    
    document.addEventListener("click", handleDocumentClick);

    // Exit Intent Logic
    let exitIntentTriggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      // If cursor leaves the top of the viewport and hasn't submitted a lead yet
      if (e.clientY < 0 && !exitIntentTriggered && !sessionStorage.getItem('mta_lead_captured')) {
        exitIntentTriggered = true;
        showLeadModal("Wait! Don't Miss Out.", "Unlock the exclusive Pre-Launch Price Sheet before you go.");
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener('arena-toast', handleToast);
      window.removeEventListener('arena-modal', handleModal);
      window.removeEventListener('arena-close-modal', handleClose);
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const showLeadModal = (title: string, subtitle: string) => {
    const handleFormSubmit = async (ev: any) => {
      ev.preventDefault();
      
      // Basic Toast Event Trigger
      window.dispatchEvent(new CustomEvent('arena-toast', { detail: "Processing request..." }));
      
      const form = ev.target as HTMLFormElement;
      const name = (form.elements[0] as HTMLInputElement).value;
      const phone = (form.elements[1] as HTMLInputElement).value;
      const email = (form.elements[2] as HTMLInputElement)?.value;
      
      try {
        const response = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, email, source: window.location.href })
        });
        
        if(response.ok) {
          sessionStorage.setItem('mta_lead_captured', 'true');
          window.dispatchEvent(new CustomEvent('arena-close-modal'));
          window.dispatchEvent(new CustomEvent('arena-toast', { detail: "Success! Our luxury team will contact you shortly." }));
        }
      } catch (err) {
        window.dispatchEvent(new CustomEvent('arena-toast', { detail: "Failed to submit. Please try again." }));
      }
    };

    const formContent = (
      <div className="text-center">
        <span className="badge-neon">• VIP PRIORITY ACCESS •</span>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <input type="text" placeholder="Full Name" required className="form-input" style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
          <input type="tel" placeholder="Mobile Number" required className="form-input" style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
          <input type="email" placeholder="Email Address (Required for Digital Brochure)" className="form-input" style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Request</button>
        </form>
      </div>
    );
    window.dispatchEvent(new CustomEvent('arena-modal', { detail: formContent }));
  };

  return (
    <>
      {/* Dynamic Modal Overlay */}
      {modalContent && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
          <div className="glass-card" style={{ position: 'relative', width: '90%', maxWidth: '500px', padding: '3rem 2rem', animation: 'fade-in 0.3s ease-out' }}>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('arena-close-modal'))}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              <i className="ri-close-line"></i>
            </button>
            {modalContent}
          </div>
        </div>
      )}

      {/* Global Toast */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'var(--neon-lime)', color: '#000', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', zIndex: 10000, boxShadow: '0 4px 20px rgba(223, 254, 0, 0.4)', animation: 'slide-up 0.3s ease-out' }}>
          {toastMessage}
        </div>
      )}

      {/* "My Shortlist" Slide-out Drawer */}
      <div 
        style={{
          position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '400px', height: '100vh', 
          background: 'rgba(13, 8, 24, 0.95)', backdropFilter: 'blur(15px)', zIndex: 99999,
          borderLeft: '1px solid rgba(255,255,255,0.1)', padding: '2rem',
          transform: isShortlistDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <button 
          onClick={() => setShortlistDrawerOpen(false)}
          style={{ position: 'absolute', top: '20px', left: '20px', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          <i className="ri-arrow-right-line"></i>
        </button>
        
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem', fontSize: '1.5rem' }}>My Shortlist</h2>
        
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {shortlist.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: '2rem' }}>You haven't saved any floor plans yet.</p>
          ) : (
            shortlist.map(id => (
              <div key={id} className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{id.toUpperCase()} Residence</span>
                <i className="ri-heart-fill" style={{ color: 'var(--neon-lime)' }}></i>
              </div>
            ))
          )}
        </div>

        {shortlist.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <button className="btn btn-neon trigger-schedule" style={{ width: '100%' }}>Enquire About Shortlist</button>
          </div>
        )}
      </div>
      
      {/* Backdrop for Shortlist */}
      {isShortlistDrawerOpen && (
        <div 
          onClick={() => setShortlistDrawerOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 99998 }}
        />
      )}
    </>
  );
}
