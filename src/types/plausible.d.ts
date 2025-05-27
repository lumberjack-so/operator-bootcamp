
// TypeScript declarations for Plausible Analytics
declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: {
        props?: Record<string, string | number>;
        revenue?: {
          currency: string;
          amount: number;
        };
        callback?: () => void;
      }
    ) => void;
  }
}

export {};
