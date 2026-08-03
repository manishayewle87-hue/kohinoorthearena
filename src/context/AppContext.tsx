"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'INR' | 'USD' | 'AED';

interface AppContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  shortlist: string[];
  toggleShortlist: (id: string) => void;
  isShortlistDrawerOpen: boolean;
  setShortlistDrawerOpen: (open: boolean) => void;
  convertPrice: (basePriceINR: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Base conversion rates (simplified for frontend logic)
const RATES = {
  INR: 1,
  USD: 0.000012, // 1 INR = ~0.000012 USD (1 Cr = 120k USD)
  AED: 0.000044  // 1 INR = ~0.000044 AED (1 Cr = 440k AED)
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mta_currency') as Currency;
      if (saved && ['INR', 'USD', 'AED'].includes(saved)) return saved;
    }
    return 'INR';
  });

  const [shortlist, setShortlistState] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mta_shortlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fallback
        }
      }
    }
    return [];
  });

  const [isShortlistDrawerOpen, setShortlistDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('mta_currency', c);
  };

  const toggleShortlist = (id: string) => {
    setShortlistState(prev => {
      const newShortlist = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('mta_shortlist', JSON.stringify(newShortlist));
      return newShortlist;
    });
  };

  const convertPrice = (basePriceINR: number): string => {
    if (!isMounted) return `₹ ${(basePriceINR / 100000).toFixed(2)} L`; // default SSR fallback
    
    if (currency === 'INR') {
      if (basePriceINR >= 10000000) {
        return `₹ ${(basePriceINR / 10000000).toFixed(2)} Cr`;
      }
      return `₹ ${(basePriceINR / 100000).toFixed(2)} L`;
    }
    
    const converted = basePriceINR * RATES[currency];
    
    if (currency === 'USD') {
      return `$${Math.round(converted).toLocaleString()}`;
    }
    
    if (currency === 'AED') {
      return `${Math.round(converted).toLocaleString()} AED`;
    }
    
    return '';
  };

  return (
    <AppContext.Provider value={{ 
      currency, 
      setCurrency, 
      shortlist, 
      toggleShortlist, 
      isShortlistDrawerOpen, 
      setShortlistDrawerOpen,
      convertPrice
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
