
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

interface Window {
  Affonso: AffonsoInterface;
  affonso_referral?: string;
}
