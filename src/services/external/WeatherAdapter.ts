/**
 * WeatherAdapter
 * In a production environment, this would call OpenWeatherMap or WeatherAPI.
 * For now, it returns realistic simulated data for the AI context.
 */
export class WeatherAdapter {
  static async getForecast(destination: string, month: string) {
    // Simulated fetch
    return {
      destination,
      month,
      averageTemp: month === "December" ? "15°C" : "28°C",
      condition: "Partly Cloudy",
      rainProbability: "20%",
      uvIndex: 6,
      recommendation: "Bring light layers and sunscreen.",
    };
  }
}
