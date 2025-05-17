
/**
 * Tracking utilities for Affonso integration
 */

// Interface for product information
interface ProductInfo {
  productId: string;
  productName: string;
  productPrice: number;
}

/**
 * Checks the current status of the Affonso script
 * @returns Object with status information
 */
export const checkAffonsoStatus = (): { 
  ready: boolean; 
  failed: boolean;
  hasObject: boolean;
  status?: string;
} => {
  // Check if we have the global status object
  const hasStatusObject = window.affonsoStatus !== undefined;
  
  // Different checks to determine if Affonso is available and ready
  const hasAffonsoObject = typeof window.Affonso !== 'undefined';
  const hasPurchaseMethod = hasAffonsoObject && typeof window.Affonso.purchase === 'function';
  const scriptLoaded = hasStatusObject && window.affonsoStatus.scriptLoaded;
  
  // Check for script error
  const scriptFailed = hasStatusObject && window.affonsoStatus.scriptFailed;
  
  // Different ways to detect if Affonso is ready
  const isReady = hasPurchaseMethod || scriptLoaded;
  
  // Log the status for debugging
  console.debug('Affonso status check:', { 
    hasStatusObject, 
    hasAffonsoObject, 
    hasPurchaseMethod,
    scriptLoaded,
    scriptFailed,
    isReady 
  });
  
  return {
    ready: isReady,
    failed: scriptFailed,
    hasObject: hasAffonsoObject,
    status: hasStatusObject ? 
      (scriptLoaded ? 'loaded' : scriptFailed ? 'failed' : 'unknown') : 
      (hasAffonsoObject ? 'present' : 'missing')
  };
};

/**
 * Tracks a purchase using Affonso
 * @param checkoutId The unique checkout ID
 * @param productInfo Information about the purchased product
 * @returns Promise resolving to boolean indicating success
 */
export const trackPurchase = async (
  checkoutId: string,
  productInfo: ProductInfo
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Attempting to track purchase with Affonso:', {
        checkoutId, 
        ...productInfo
      });
      
      // Verify that Affonso is available
      if (!window.Affonso || typeof window.Affonso.purchase !== 'function') {
        console.error('Affonso tracking not available');
        return reject(new Error('Affonso tracking not available'));
      }
      
      // Add a timeout for the tracking call
      const timeoutId = setTimeout(() => {
        console.error('Affonso purchase tracking timed out after 5 seconds');
        reject(new Error('Tracking timeout'));
      }, 5000);
      
      // Track the purchase
      window.Affonso.purchase({
        id: checkoutId,
        amount: productInfo.productPrice,
        currency: 'USD',
        products: [{
          id: productInfo.productId,
          name: productInfo.productName,
          price: productInfo.productPrice,
          quantity: 1
        }]
      });
      
      // Store successful tracking in local storage to prevent duplicate tracking
      try {
        localStorage.setItem('tracked_purchase_' + checkoutId, JSON.stringify({
          timestamp: new Date().toISOString(),
          productId: productInfo.productId,
          amount: productInfo.productPrice
        }));
        
        // We can also clear the selectedPlan data since tracking succeeded
        localStorage.removeItem('selectedPlan');
      } catch (e) {
        console.warn('Could not store tracking data in localStorage', e);
      }
      
      // Clear the timeout and resolve with success
      clearTimeout(timeoutId);
      console.log('✅ Purchase tracking completed successfully');
      resolve(true);
    } catch (error) {
      console.error('Error in trackPurchase:', error);
      reject(error);
    }
  });
};

/**
 * Recovers and attempts to track any untracked purchases from storage
 */
export const recoverUnTrackedPurchases = async (): Promise<void> => {
  try {
    // Try to get purchase data from session storage first
    const purchaseDataStr = sessionStorage.getItem('purchaseData');
    if (!purchaseDataStr) return;
    
    const purchaseData = JSON.parse(purchaseDataStr);
    const { checkoutId, productInfo, timestamp } = purchaseData;
    
    // Check if this purchase was already tracked
    const trackedDataStr = localStorage.getItem('tracked_purchase_' + checkoutId);
    if (trackedDataStr) {
      console.log('Purchase already tracked:', checkoutId);
      sessionStorage.removeItem('purchaseData');
      return;
    }
    
    // Check if the Affonso script is available
    if (!window.Affonso || typeof window.Affonso.purchase !== 'function') {
      console.log('Affonso not available for recovery tracking');
      return;
    }
    
    console.log('Recovering untracked purchase:', checkoutId);
    
    // Track the purchase
    await trackPurchase(checkoutId, productInfo);
    
    // Remove the purchase data from session storage
    sessionStorage.removeItem('purchaseData');
    
    console.log('Successfully recovered and tracked purchase:', checkoutId);
  } catch (error) {
    console.error('Error recovering untracked purchases:', error);
  }
};
