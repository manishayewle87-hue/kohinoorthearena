"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'INR' | 'USD' | 'AED';

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
  const [currency, setCurrencyState] = useState<Currency>('INR');
  const [shortlist, setShortlistState] = useState<string[]>([]);
  const [isShortlistDrawerOpen, setShortlistDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Load state from local storage on mount
    const savedCurrency = localStorage.getItem('mta_currency') as Currency;
    const savedShortlist = localStorage.getItem('mta_shortlist');
    
    if (savedCurrency && ['INR', 'USD', 'AED'].includes(savedCurrency)) {
      setCurrencyState(savedCurrency);
    }
    if (savedShortlist) {
      try {
        setShortlistState(JSON.parse(savedShortlist));
      } catch (e) {}
    }
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
