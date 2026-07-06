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

  // Short keys used for token-saving compact payload
  d?: string;     // destination
  dy?: number;    // duration (days)
  b?: string;     // budget
  t?: string;     // travelers
  s?: string[];   // styles/interests
  m?: string;     // month
};
