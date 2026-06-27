export type OptimizedRequest = {
  destination?: string;
  days?: number;
  budget?: number; // Normalized to integer
  travelers?: number; // Normalized to integer
  style?: string;
  month?: string;
  accommodation?: string;
  transport?: string;
  interests?: string[];
  raw?: string; // Only populated if unstructured data couldn't be parsed
};
