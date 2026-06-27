/**
 * VisaAdapter
 * Integrates with Sherpa API or similar for visa requirements.
 */
export class VisaAdapter {
  static async getVisaRequirements(nationality: string = "IN", destination: string) {
    // Simulated fetch
    return {
      status: "Visa Required",
      type: "e-Visa",
      processingDays: 3,
      notes: "Passport must be valid for 6 months.",
    };
  }
}
