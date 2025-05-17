
/**
 * Utility functions for Affonso tracking
 */

export interface ProductInfo {
  productId: string;
  productName: string;
  productPrice: number;
}

/**
 * Check if the Affonso tracking script is loaded and ready
 */
export const isAffonsoReady = (): boolean => {
  return !!(window.Affonso && typeof window.Affonso.purchase === 'function');
};

/**
 * Track a purchase with Affonso
 * @param checkoutId - The checkout ID from Polar
 * @param productInfo - Product information
 * @returns A promise that resolves when tracking is complete
 */
export const trackPurchase = (checkoutId: string, productInfo: ProductInfo): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!isAffonsoReady()) {
      console.error('Affonso is not ready, cannot track purchase');
      reject(new Error('Affonso tracking not available'));
      return;
    }

    try {
      console.log('Tracking purchase with Affonso:', {
        checkoutId,
        ...productInfo
      });
      
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
      
      console.log('✅ Successfully tracked purchase with Affonso');
      resolve(true);
    } catch (error) {
      console.error('Error tracking purchase with Affonso:', error);
      reject(error);
    }
  });
};

/**
 * Get product information from URL parameters or localStorage
 * @param searchParams - URL search parameters
 * @returns Product information object
 */
export const getProductInfo = (searchParams: URLSearchParams): ProductInfo => {
  const productId = searchParams.get('product_id');
  const productName = searchParams.get('product_name');
  const productPrice = searchParams.get('product_price');
  
  // If we have all parameters in the URL
  if (productId && productName && productPrice) {
    return {
      productId,
      productName: decodeURIComponent(productName),
      productPrice: parseFloat(productPrice)
    };
  }
  
  // Try localStorage as fallback
  const planInfoStr = localStorage.getItem('selectedPlan');
  if (planInfoStr) {
    try {
      const parsedInfo = JSON.parse(planInfoStr);
      return {
        productId: parsedInfo.productId || 'bootcamp-purchase',
        productName: parsedInfo.productName || 'AI-First Operator Bootcamp',
        productPrice: parsedInfo.productPrice || 0
      };
    } catch (error) {
      console.error('Error parsing product info from localStorage:', error);
    }
  }
  
  // Default fallback
  return {
    productId: 'bootcamp-purchase',
    productName: 'AI-First Operator Bootcamp',
    productPrice: 0
  };
};
