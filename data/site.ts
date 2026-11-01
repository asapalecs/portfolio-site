// date personale
export const site = {
  name: "Alex",
  role: "SQL Developer",
  location: "Bucharest",
  intro: "Engineer and MSc student in Bucharest. I work with SQL Server, Oracle, Python and Power BI.",
  email: "cristinescu.tech@gmail.com",
  github: "https://github.com/asapalecs",
  linkedin: "https://www.linkedin.com/in/alex-cristinescu/",
  // CV in /public/cv.pdf -> "/cv.pdf"
  cv: null as string | null,
};

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
).replace(/\/$/, "");
