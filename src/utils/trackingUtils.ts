
import { toast } from "@/components/ui/sonner";

// TypeScript declarations for Affonso global variables
declare global {
  interface Window {
    Affonso: {
      signup: (email: string) => void;
      purchase: (args: {
        id: string;
        value: number;
        currency: string;
        email: string;
      }) => void;
    };
    affonso_referral?: string;
  }
}

/**
 * Get the Affonso referral ID if it exists
 */
export const getAffonsoReferralId = (): string | undefined => {
  return window.affonso_referral;
};

/**
 * Track a user signup with Affonso
 */
export const trackAffonsoSignup = (email: string): void => {
  try {
    if (window.Affonso && typeof window.Affonso.signup === 'function') {
      window.Affonso.signup(email);
      console.log('Affonso signup tracked successfully');
    } else {
      console.warn('Affonso signup tracking not available');
    }
  } catch (error) {
    console.error('Error tracking Affonso signup:', error);
  }
};

/**
 * Track a purchase with Affonso
 */
export const trackAffonsoPurchase = async (
  purchaseId: string,
  amount: number,
  email: string,
  currency: string = 'USD'
): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    try {
      if (window.Affonso && typeof window.Affonso.purchase === 'function') {
        window.Affonso.purchase({
          id: purchaseId,
          value: amount,
          currency,
          email,
        });
        console.log('Affonso purchase tracked successfully');
        resolve({ success: true });
      } else {
        const error = 'Affonso purchase tracking not available';
        console.warn(error);
        resolve({ success: false, error });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error tracking Affonso purchase:', errorMessage);
      resolve({ success: false, error: errorMessage });
    }
  });
};

/**
 * Store purchase data in localStorage for retrieval on thank you page
 */
export const storePurchaseData = (data: {
  purchaseId: string;
  amount: number;
  email: string;
  productName?: string;
}): void => {
  try {
    localStorage.setItem('affonso_purchase_data', JSON.stringify(data));
  } catch (error) {
    console.error('Error storing purchase data:', error);
  }
};

/**
 * Get purchase data from localStorage
 */
export const getPurchaseData = (): {
  purchaseId: string;
  amount: number;
  email: string;
  productName?: string;
} | null => {
  try {
    const data = localStorage.getItem('affonso_purchase_data');
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error retrieving purchase data:', error);
  }
  return null;
};

/**
 * Clear purchase data from localStorage
 */
export const clearPurchaseData = (): void => {
  try {
    localStorage.removeItem('affonso_purchase_data');
  } catch (error) {
    console.error('Error clearing purchase data:', error);
  }
};
