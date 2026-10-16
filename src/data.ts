// Fictional data. Copy this object to analyze the same signals in Claude.
export const productMetrics = {
  period: 'Últimos 7 dias',
  comparison: 'vs. período anterior',
  conversionChangePercent: -18,
  androidErrorsChangePercent: 42,
  averageTaskTimeSeconds: 130,
  platforms: {
    ios: { activationPercent: 34, connectionErrorsPercent: 2.1 },
    android: { activationPercent: 21, connectionErrorsPercent: 7.8 },
  },
  // Illustrative normalized conversion series; start of the period = 100.
  conversionIndex: [100, 101, 99, 100, 96, 98, 95, 96, 94, 95, 90, 91, 87, 88, 84, 85, 82],
} as const;
