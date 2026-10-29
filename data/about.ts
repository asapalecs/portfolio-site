// experienta si studii, de pe LinkedIn
export type Entry = {
  kind: "Experience" | "Education";
  title: string;
  org: string;
  period: string;
  place?: string;
  note?: string;
};

export const timeline: { year: string; entries: Entry[] }[] = [
  {
    year: "Now",
    entries: [
      { kind: "Experience", title: "Project Manager", org: "voestalpine Railway Systems", period: "Oct 2025 – present", place: "Buzău · Full-time" },
      { kind: "Experience", title: "Freelance Web Developer", org: "Self-employed", period: "Dec 2024 – present", place: "Remote" },
    ],
  },
  {
    year: "2024",
    entries: [
      { kind: "Education", title: "MSc, Databases and Software Technologies", org: "University of Bucharest", period: "2024 – Present", note: "Most projects on this site started here." },
    ],
  },
  {
    year: "2023",
    entries: [
      { kind: "Experience", title: "Mechanical Engineer", org: "Tehnomet S.A.", period: "Nov 2023 – Nov 2024", place: "Buzău · Full-time" },
    ],
  },
  {
    year: "2019",
    entries: [
      { kind: "Education", title: "BEng, Mechanical Engineering", org: "Transilvania University of Brașov", period: "2019 – 2023" },
      { kind: "Education", title: "Web Development with PHP & WordPress", org: "Digital Nation", period: "Sep – Dec 2022" },
    ],
  },
];
