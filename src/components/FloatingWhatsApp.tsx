"use client";
import { usePathname } from 'next/navigation';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  
  let message = "Hi, I am interested in Mahalaxmi The Arena. Could you please share more details?";
  if (pathname && pathname !== '/') {
    const formattedPath = pathname.replace(/\//g, ' ').replace(/-/g, ' ').trim();
    const context = formattedPath.replace(/\b\w/g, l => l.toUpperCase());
    message = `Hi, I am looking for details on the ${context} at The Arena. Can you share the price sheet?`;
  }

  const phoneNumber = "910000000000"; // Placeholder, can be updated later
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        color: '#FFF',
        borderRadius: '50%',
        boxShadow: '0 10px 25px rgba(37, 211, 102, 0.5)',
        textDecoration: 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
    >
      <i className="ri-whatsapp-line" style={{ fontSize: '36px' }}></i>
      
      {/* CSS Pulse Animation is globally defined in globals.css for .floating-whatsapp */}
      <style dangerouslySetInnerHTML={{ __html: `
        .floating-whatsapp {
          animation: wa-pulse 2s infinite;
        }
        .floating-whatsapp:hover {
          transform: scale(1.1);
        }
        @keyframes wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        @media (max-width: 768px) {
          .floating-whatsapp {
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
          }
          .floating-whatsapp i {
            font-size: 28px !important;
          }
        }
      `}} />
    </a>
  );
}
