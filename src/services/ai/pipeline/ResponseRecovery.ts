export class ResponseRecovery {
  static recover(data: any): any {
    if (typeof data !== "object" || data === null) return data;

    const recovered = { ...data };

    // 1. Ensure hidden gems 'g' is an array
    if (!recovered.g || !Array.isArray(recovered.g)) {
      recovered.g = [];
    }

    // 2. Ensure tips 'tp' is an array
    if (!recovered.tp || !Array.isArray(recovered.tp)) {
      recovered.tp = [];
    }

    // 3. Fix days array if present
    if (Array.isArray(recovered.d)) {
      recovered.d = recovered.d.map((day: any) => {
        if (!day.a) day.a = [];
        if (!day.t) day.t = "Day Plan";
        return day;
      });
    }

    return recovered;
  }
}
