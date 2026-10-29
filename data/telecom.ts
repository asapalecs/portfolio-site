// rezultate din DW-ul telecom
export const churnByTenure = [
  { band: "0–2 mo", months: 2345, churn: 2.17 },
  { band: "3–5 mo", months: 2192, churn: 1.28 },
  { band: "6–11 mo", months: 3990, churn: 0.98 },
  { band: "12–23 mo", months: 5486, churn: 0.82 },
  { band: "24+ mo", months: 1455, churn: 1.72 },
];

export const clvBySegment = [
  { segment: "SME", customers: 97, clv: 1484, arpu: 28.4, churn: 1.0 },
  { segment: "Corporate", customers: 61, clv: 1225, arpu: 22.88, churn: 0.58 },
  { segment: "Family", customers: 177, clv: 1219, arpu: 23.57, churn: 1.28 },
  { segment: "Youth", customers: 150, clv: 1178, arpu: 23.11, churn: 1.05 },
  { segment: "Consumer", customers: 315, clv: 1166, arpu: 23.73, churn: 1.42 },
];

export const kpis = [
  { name: "ARPU", formula: "Revenue ÷ active subscribers", meaning: "Monetisation per customer. Falling ARPU with flat revenue means growth on cheaper plans — a margin problem wearing a growth costume." },
  { name: "Churn Rate", formula: "Churned ÷ active subscribers", meaning: "The most watched telecom metric. Acquisition costs several times retention." },
  { name: "Active Customers", formula: "Distinct subscribers with a live line", meaning: "The denominator for nearly everything else." },
  { name: "Complaint Rate", formula: "Complaints ÷ subscriber-months", meaning: "Service quality — and a leading indicator of churn." },
  { name: "Average Usage", formula: "Mean data / voice / SMS per subscriber", meaning: "Capacity planning and upsell targeting." },
  { name: "CLV", formula: "ARPU × margin × expected lifetime", meaning: "Makes acquisition spend rational." },
];

// KPI lunare din V_MONTHLY_KPI (2023-2025), venit in RON
export const monthly = [
  { m: "2023-01", active: 42, revenue: 960, arpu: 22.87, churn: 0.0, complaints: 7.14 },
  { m: "2023-02", active: 143, revenue: 3256, arpu: 22.77, churn: 1.4, complaints: 5.59 },
  { m: "2023-03", active: 263, revenue: 6330, arpu: 24.07, churn: 1.14, complaints: 4.56 },
  { m: "2023-04", active: 409, revenue: 9806, arpu: 23.98, churn: 2.93, complaints: 3.91 },
  { m: "2023-05", active: 580, revenue: 13294, arpu: 22.92, churn: 1.9, complaints: 5.52 },
  { m: "2023-06", active: 776, revenue: 16789, arpu: 21.64, churn: 1.16, complaints: 4.38 },
  { m: "2023-07", active: 966, revenue: 23050, arpu: 23.86, churn: 1.35, complaints: 5.38 },
  { m: "2023-08", active: 1178, revenue: 27663, arpu: 23.48, churn: 1.78, complaints: 3.14 },
  { m: "2023-09", active: 1360, revenue: 31892, arpu: 23.45, churn: 1.32, complaints: 5.07 },
  { m: "2023-10", active: 1580, revenue: 38070, arpu: 24.09, churn: 1.08, complaints: 3.86 },
  { m: "2023-11", active: 1812, revenue: 43321, arpu: 23.91, churn: 1.21, complaints: 3.59 },
  { m: "2023-12", active: 2002, revenue: 47112, arpu: 23.53, churn: 1.55, complaints: 3.4 },
  { m: "2024-01", active: 2179, revenue: 51896, arpu: 23.82, churn: 1.24, complaints: 4.08 },
  { m: "2024-02", active: 2377, revenue: 57106, arpu: 24.02, churn: 1.26, complaints: 3.53 },
  { m: "2024-03", active: 2551, revenue: 64982, arpu: 25.47, churn: 1.49, complaints: 3.8 },
  { m: "2024-04", active: 2703, revenue: 66032, arpu: 24.43, churn: 1.55, complaints: 4.07 },
  { m: "2024-05", active: 2864, revenue: 70022, arpu: 24.45, churn: 1.4, complaints: 3.98 },
  { m: "2024-06", active: 3025, revenue: 76558, arpu: 25.31, churn: 0.83, complaints: 3.8 },
  { m: "2024-07", active: 3200, revenue: 81454, arpu: 25.45, churn: 1.31, complaints: 3.81 },
  { m: "2024-08", active: 3338, revenue: 84402, arpu: 25.29, churn: 1.44, complaints: 4.13 },
  { m: "2024-09", active: 3462, revenue: 87415, arpu: 25.25, churn: 1.3, complaints: 3.64 },
  { m: "2024-10", active: 3597, revenue: 90755, arpu: 25.23, churn: 1.06, complaints: 4.14 },
  { m: "2024-11", active: 3694, revenue: 90482, arpu: 24.49, churn: 1.38, complaints: 4.47 },
  { m: "2024-12", active: 3764, revenue: 97746, arpu: 25.97, churn: 0.82, complaints: 4.12 },
  { m: "2025-01", active: 3856, revenue: 97102, arpu: 25.18, churn: 0.93, complaints: 3.86 },
  { m: "2025-02", active: 3917, revenue: 102436, arpu: 26.15, churn: 0.92, complaints: 3.73 },
  { m: "2025-03", active: 3977, revenue: 104072, arpu: 26.17, churn: 1.16, complaints: 3.97 },
  { m: "2025-04", active: 4030, revenue: 104758, arpu: 25.99, churn: 0.92, complaints: 4.04 },
  { m: "2025-05", active: 4052, revenue: 106414, arpu: 26.26, churn: 1.18, complaints: 3.95 },
  { m: "2025-06", active: 4062, revenue: 107032, arpu: 26.35, churn: 0.71, complaints: 4.04 },
  { m: "2025-07", active: 4071, revenue: 107943, arpu: 26.52, churn: 0.91, complaints: 4.35 },
  { m: "2025-08", active: 4066, revenue: 105569, arpu: 25.96, churn: 0.93, complaints: 4.5 },
  { m: "2025-09", active: 4050, revenue: 107116, arpu: 26.45, churn: 1.14, complaints: 3.51 },
  { m: "2025-10", active: 4021, revenue: 104449, arpu: 25.98, churn: 1.22, complaints: 3.56 },
  { m: "2025-11", active: 3978, revenue: 105431, arpu: 26.5, churn: 0.93, complaints: 3.57 },
  { m: "2025-12", active: 3945, revenue: 106027, arpu: 26.88, churn: 1.06, complaints: 3.83 },
];
