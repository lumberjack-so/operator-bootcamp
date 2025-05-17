
interface AffonsoInterface {
  signup: (email: string) => void;
}

interface Window {
  Affonso: AffonsoInterface;
  affonso_referral?: string;
}
