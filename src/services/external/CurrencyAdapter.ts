/**
 * CurrencyAdapter
 * Integrates with ExchangeRate-API or similar.
 */
export class CurrencyAdapter {
  static async getExchangeRate(base: string = "USD", target: string = "INR") {
    // Simulated fetch
    return {
      base,
      target,
      rate: target === "INR" ? 83.5 : 1.0,
      timestamp: Date.now(),
    };
  }
}
