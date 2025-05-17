
/**
 * Type definitions for Affonso tracking service
 */

interface AffonsoInterface {
  signup: (email: string) => void;
  purchase: (orderData: {
    id?: string;
    amount?: number;
    currency?: string;
    products?: Array<{
      id?: string;
      name?: string;
      price?: number;
      quantity?: number;
    }>;
  }) => void;
}

interface AffonsoStatusInterface {
  scriptLoaded: boolean;
  scriptFailed: boolean;
  loadAttempts: number;
  lastAttempt: Date | null;
}

interface Window {
  Affonso: AffonsoInterface;
  affonso_referral?: string;
  affonsoStatus: AffonsoStatusInterface;
}
