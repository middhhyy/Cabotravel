type ProviderStats = {
  successCount: number;
  recoveryCount: number;
  failureCount: number;
  totalLatencyMs: number;
  requests: number;
};

class ProviderScorerClass {
  private scores: Record<string, ProviderStats> = {};

  private initProvider(name: string) {
    if (!this.scores[name]) {
      this.scores[name] = {
        successCount: 0,
        recoveryCount: 0,
        failureCount: 0,
        totalLatencyMs: 0,
        requests: 0,
      };
    }
  }

  logScore(providerName: string, status: "SUCCESS" | "RECOVERED" | "FAILED", latencyMs: number) {
    this.initProvider(providerName);
    const stats = this.scores[providerName];

    stats.requests++;
    stats.totalLatencyMs += latencyMs;

    if (status === "SUCCESS") stats.successCount++;
    if (status === "RECOVERED") stats.recoveryCount++;
    if (status === "FAILED") stats.failureCount++;

    // Don't expose to end users, keep it in server logs
    console.log(
      `[Metrics] ${providerName} | Status: ${status} | Latency: ${latencyMs}ms | Success Rate: ${this.getSuccessRate(providerName)}%`,
    );
  }

  getSuccessRate(providerName: string): number {
    const stats = this.scores[providerName];
    if (!stats || stats.requests === 0) return 0;
    return Math.round(((stats.successCount + stats.recoveryCount) / stats.requests) * 100);
  }

  getAverageLatency(providerName: string): number {
    const stats = this.scores[providerName];
    if (!stats || stats.requests === 0) return 0;
    return Math.round(stats.totalLatencyMs / stats.requests);
  }
}

export const ProviderScorer = new ProviderScorerClass();
