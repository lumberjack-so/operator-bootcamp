
// TypeScript declarations for Plausible Analytics
declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: {
        props?: Record<string, string | number>;
        callback?: () => void;
      }
    ) => void;
  }
}

export {};
