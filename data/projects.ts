// datele pt proiecte
// published = true doar daca repo-ul e pe github

export type Category = "bi" | "engineering";

export interface Stat {
  value: string;
  label: string;
}

export interface Point {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  repo: string;
  published: boolean;
  category: Category;
  featured?: boolean;
  title: string;
  tagline: string;
  domain: string;
  stack: string[];
  concepts: string[];
  problem: string;
  questions: string[];
  pipeline: { step: string; detail: string }[];
  stats?: Stat[];
  challenges: Point[];
  value: Point[];
}

export const GITHUB_USER = "asapalecs";
export const repoUrl = (p: Project) => `https://github.com/${GITHUB_USER}/${p.repo}`;

export const projects: Project[] = [
  // BI / date
  {
    slug: "telecom-bi-datawarehouse",
    repo: "telecom-bi-datawarehouse",
    published: true,
    category: "bi",
    featured: true,
    title: "Telecom BI Data Warehouse",
    tagline: "Data warehouse and Power BI model for a mobile operator.",
    domain: "Telecom",
    stack: ["Python", "pandas", "Faker", "SQLAlchemy", "SQL Server 2022", "T-SQL", "Power BI", "DAX", "Docker"],
    concepts: ["Star schema", "Surrogate keys", "SCD Type 2", "Columnstore indexes", "Semi-additive measures", "Data quality gates"],
    problem:
      "A mobile operator can bill its subscribers. What it usually cannot do is explain why the numbers moved. The operational database is normalised for writes, holds only the current state of each customer, and analytical queries against it compete with the transactions that keep the business running.",
    questions: [
      "Is ARPU falling while the customer base grows?",
      "Which segments are churning, and are they the valuable ones?",
      "Does churn come from price, service quality, or expiring contracts?",
      "What is a subscriber worth over their lifetime, and does that justify acquisition cost?",
    ],
    pipeline: [
      { step: "Source CSV", detail: "customers · plans · subscriptions · complaints · customer_changes" },
      { step: "Python ETL", detail: "extract → transform → load, with a row-count reconciliation quality gate" },
      { step: "Star schema", detail: "5 dimensions incl. DIM_CUSTOMER (SCD2) + FACT_SUBSCRIPTION_MONTHLY" },
      { step: "KPI views", detail: "V_MONTHLY_KPI · V_ARPU_BY_SEGMENT · V_CHURN_ANALYSIS · V_CUSTOMER_LIFETIME_VALUE" },
      { step: "Power BI", detail: "DAX semantic model: ARPU, Churn Rate, Complaint Rate, CLV" },
    ],
    stats: [
      { value: "25.43 RON", label: "ARPU / month" },
      { value: "1.14%", label: "Monthly churn" },
      { value: "95,890", label: "Fact rows" },
      { value: "16.6 s", label: "Full pipeline run" },
    ],
    challenges: [
      {
        title: "The as-of join that silently dropped 5% of revenue",
        body: "Comparing a month-grain fact against a day-grain validity window discarded every customer's first month (775 rows) while the pipeline reported success. Fixed with interval overlap and a row-count reconciliation that makes this class of loss impossible to miss.",
      },
      {
        title: "Calibrating synthetic data to the real market",
        body: "The first generator produced 61 RON ARPU, roughly double the Romanian market. Tuning usage and overage distributions landed ARPU at 25 RON and churn at 1.1%/month, so the KPIs mean something to anyone who knows telecom.",
      },
      {
        title: "Semi-additive measures",
        body: "Summing is_active across twelve months counts one customer as twelve. Active customers use DISTINCTCOUNT on customer_id, carried as a degenerate dimension because customer_key is not stable across SCD versions.",
      },
      {
        title: "One KPI definition",
        body: "The view layer plus the DAX measures exist so that “churn rate” cannot mean two different things on two dashboards.",
      },
    ],
    value: [
      { title: "Two churn spikes, two interventions", body: "Churn by tenure is U-shaped: 2.17% in the first months, 0.82% at 12–23 months, 1.72% after 24. Onboarding fixes the first spike; retention offers fix the second. A blended number hides both." },
      { title: "Acquisition spend becomes rational", body: "CLV by segment (SME leads at 1,484 RON) sets the ceiling on what each customer is worth acquiring." },
      { title: "History is preserved", body: "SCD Type 2 means revenue is attributed to the plan and segment a customer had at the time, not the one they have today." },
    ],
  },
  {
    slug: "oracle-dw-dental-clinic",
    repo: "oracle-dw-dental-clinic",
    published: true,
    category: "bi",
    title: "Dental Clinic Data Warehouse",
    tagline: "Oracle warehouse for a network of dental clinics.",
    domain: "Healthcare",
    stack: ["Oracle 23ai", "PL/SQL", "Python", "Flask", "Docker Compose"],
    concepts: ["Star schema", "Range partitioning", "Bitmap indexes", "Materialized views", "Query rewrite", "DIMENSION hierarchies"],
    problem:
      "A multi-site dental clinic could answer operational questions (“who has an appointment on Thursday?”) but not analytical ones. The data lived in a normalised schema built for inserts, and reporting queries competed with the front desk.",
    questions: [
      "Which service categories generate the most revenue, by quarter?",
      "Which dentists are most productive, and does it vary by specialisation?",
      "Which locations underperform relative to patient volume?",
      "What share of invoiced revenue is actually collected?",
    ],
    pipeline: [
      { step: "OLTP schema", detail: "11 normalised tables (3NF) + triggers" },
      { step: "Python ETL", detail: "extract · transform · load · validate" },
      { step: "DW schema", detail: "7 dimensions + 1 partitioned fact table" },
      { step: "Optimisation", detail: "Materialized views with query rewrite, bitmap indexes" },
      { step: "Flask app", detail: "CRUD, ETL panel and 6 JSON reports" },
    ],
    stats: [
      { value: "11", label: "OLTP tables" },
      { value: "7 + 1", label: "Dimensions + fact" },
      { value: "6", label: "Reports" },
    ],
    challenges: [
      { title: "Weekday convention mismatch", body: "Python's weekday() starts Monday at 0; Oracle's D format starts Sunday at 1. A naive load mislabels every weekend while reporting success. Fixed with an explicit, documented conversion." },
      { title: "Partition key in the primary key", body: "Oracle rejects a partitioned table whose PK omits the partition column, so the fact PK is composite (ID_FAPT, TIMP_ID): a physical constraint driving a logical decision." },
      { title: "Load order vs referential integrity", body: "DEFERRABLE constraints allow an efficient load order with validation at commit: full integrity without the sequencing tax." },
      { title: "Hardcoded credentials", body: "Passwords embedded in five files were moved to a single config with environment overrides and a git-ignored .env." },
    ],
    value: [
      { title: "Reporting stops slowing the front desk", body: "Analytical load runs against its own schema, not the booking system." },
      { title: "Collection rate becomes measurable", body: "Paid vs invoiced amount exposes the working-capital gap directly." },
      { title: "Analyst-ready", body: "A five-join request routed through IT becomes one join or one row from a materialized view." },
    ],
  },
  {
    slug: "pyspark-crypto-analytics",
    repo: "pyspark-crypto-analytics",
    published: true,
    category: "bi",
    title: "PySpark Crypto Analytics",
    tagline: "Spark analytics and ML on USDC price history, with the leakage fixed.",
    domain: "Finance",
    stack: ["Apache Spark 3", "PySpark", "Spark SQL", "Spark MLlib", "Jupyter"],
    concepts: ["Distributed processing", "Window functions", "ML pipelines", "Target leakage", "Chronological validation", "Baseline comparison"],
    problem:
      "Exchanges generate millions of price ticks a day, more than one machine handles comfortably. The questions are ordinary BI questions on an awkward volume. The dataset here is small; the point is that identical code runs on 1,000 rows or a billion.",
    questions: [
      "How do price and volume behave month over month?",
      "Can tomorrow's close be predicted from history?",
      "Can tomorrow's volatility be anticipated for risk management?",
      "How should volume be segmented for reporting?",
    ],
    pipeline: [
      { step: "Ingestion", detail: "Explicit schema, no inferSchema" },
      { step: "Quality gate", detail: "Null counts, OHLC invariants, duplicate dates" },
      { step: "Aggregation", detail: "DataFrame API and Spark SQL side by side" },
      { step: "Features", detail: "Window functions with leakage-safe bounds" },
      { step: "Evaluation", detail: "Out-of-sample metrics vs a naive baseline" },
    ],
    stats: [
      { value: "1,002", label: "Daily records" },
      { value: "4", label: "Methodology defects found" },
      { value: "2×", label: "Model error vs naive baseline" },
    ],
    challenges: [
      { title: "Leakage is invisible from the output", body: "All four defects produced models that ran cleanly and scored well. They were only findable by asking, for each feature: when would this value actually be known?" },
      { title: "Rolling windows leak by default", body: "rowsBetween(-7, 0) reads like a 7-day average and silently includes the target's own row. The correct upper bound is -1." },
      { title: "Time series break standard validation", body: "randomSplit and k-fold both train on the future. Hyperparameters are tuned on the last slice of the training period instead." },
      { title: "Reporting a negative result", body: "The corrected model loses to “tomorrow equals today”. That is the right finding, and it is reported as such." },
    ],
    value: [
      { title: "Scales without a rewrite", body: "The same code runs locally and across a cluster." },
      { title: "Bad data stops at the gate", body: "OHLC invariant checks fail loudly on a corrupt feed instead of producing plausible nonsense." },
      { title: "Rejecting a model has value", body: "The leaky version would have been deployed and failed with real money behind it." },
    ],
  },
  {
    slug: "oracle-plsql-manufacturing-costs",
    repo: "oracle-plsql-manufacturing-costs",
    published: true,
    category: "bi",
    title: "Manufacturing Cost Control",
    tagline: "Tracks production costs per sector, in Oracle PL/SQL.",
    domain: "Manufacturing",
    stack: ["Oracle 19c", "SQL", "PL/SQL"],
    concepts: ["Relational design", "Stored procedures", "Cursors", "Exception handling", "DML triggers", "Index design"],
    problem:
      "A manufacturer could see total spending but not attribute it. Finance knew the monthly bill for steel; they did not know which sector consumed it, so overruns surfaced at quarter end, when nothing could be done.",
    questions: [
      "Which sector is over budget this month, and by how much?",
      "What does one sector actually cost to run, all inputs included?",
      "Which cost category is growing fastest?",
      "Is a sector's spending justified by its output?",
    ],
    pipeline: [
      { step: "Reference", detail: "Suppliers · materials · consumables · tooling · services · overheads" },
      { step: "Transactional", detail: "Monthly expense lines by sector, against budgets" },
      { step: "PL/SQL", detail: "Procedures and functions aggregating five cost categories" },
      { step: "Reporting", detail: "Financial report table populated automatically" },
    ],
    stats: [
      { value: "10", label: "Tables (3NF)" },
      { value: "5", label: "Cost categories" },
    ],
    challenges: [
      { title: "A bug that produced plausible output", body: "Cost was computed as price × a foreign key value. Totals looked reasonable and were arbitrary. Found only by reading the expression and asking what the column actually is." },
      { title: "Exception handlers that hide failures", body: "WHEN OTHERS THEN RETURN 0 turns a detectable failure into an undetectable wrong number. Changed to log and re-raise." },
      { title: "Optional categories", body: "Inner joins silently dropped expense lines without tooling. LEFT JOIN plus COALESCE makes a missing category contribute zero." },
      { title: "Documented assumptions", body: "Historical quantities were never recorded, so the backfill states its assumption explicitly instead of guessing silently." },
    ],
    value: [
      { title: "Overruns become actionable", body: "A sector trending over budget is visible in month one, not at quarter end." },
      { title: "Full cost, not just materials", body: "Five categories give the true cost of running a sector." },
      { title: "The reported figures were wrong", body: "Fixing the defect changed every historical total. A trusted wrong number is worse than none." },
    ],
  },
  {
    slug: "oracle-database-security",
    repo: "oracle-database-security",
    published: true,
    category: "bi",
    title: "Oracle Database Security",
    tagline: "Encryption, auditing and access control inside the database.",
    domain: "Sports / GDPR",
    stack: ["Oracle 19c / 23ai", "PL/SQL", "DBMS_CRYPTO", "DBMS_FGA"],
    concepts: ["Column-level encryption", "Fine-grained auditing", "Least privilege", "Definer's rights", "Data masking", "Bind variables"],
    problem:
      "A club's database holds public fixtures, GDPR personal data, commercially critical salaries and special-category medical notes. One application account with SELECT on everything means anyone with the connection string reads salaries — and nobody knows who did.",
    questions: [
      "Can a bypassed application or curious DBA still reach sensitive columns?",
      "Who read a player's medical record, and when?",
      "Can a doctor read one player's notes without exporting the squad's?",
    ],
    pipeline: [
      { step: "Encryption", detail: "AES on identity, phone, medical and salary columns" },
      { step: "Auditing", detail: "Unified audit policies plus fine-grained auditing on sensitive columns" },
      { step: "Access control", detail: "Roles per function, definer's-rights procedures" },
      { step: "Masking", detail: "Masked views for non-privileged roles" },
      { step: "Injection", detail: "Bind variables and validated dynamic SQL" },
    ],
    stats: [
      { value: "5", label: "Security layers" },
      { value: "9", label: "SQL scripts" },
    ],
    challenges: [
      { title: "Encryption granularity", body: "Tablespace TDE is transparent and useless against an over-privileged insider. Column encryption costs indexability; that cost was accepted for the real threat model." },
      { title: "ECB leaks structure", body: "Identical salaries produced identical ciphertext. “It is encrypted” is not a security property. The mode of operation matters as much as the algorithm." },
      { title: "Key management", body: "Moving the key from code to a table helps, but a DBA can still read it. The target state is an external key manager, documented rather than pretended solved." },
    ],
    value: [
      { title: "GDPR compliance is demonstrable", body: "An auditor can be shown exactly who accessed special-category data and when." },
      { title: "Application compromise ≠ database compromise", body: "A stolen web server yields only its own account's privileges, not salaries." },
    ],
  },

  // engineering
  {
    slug: "spring-boot-booking-platform",
    repo: "spring-boot-booking-platform",
    published: true,
    category: "engineering",
    title: "Booking Platform",
    tagline: "A rental marketplace, built as a monolith and as microservices.",
    domain: "Marketplace",
    stack: ["Java 17", "Spring Boot 3.2", "Spring Cloud", "Spring Security", "JPA", "Resilience4j", "Redis", "Prometheus", "Grafana"],
    concepts: ["Layered architecture", "Service discovery", "API gateway", "Centralised config", "JWT", "Circuit breakers", "Observability"],
    problem:
      "A property marketplace for hosts and guests. The functional requirements are ordinary; the architectural question is not: when does the operational cost of distribution start paying for itself?",
    questions: ["Does this belong in one deployable unit or several?", "What does distribution cost on day one?"],
    pipeline: [
      { step: "Controller", detail: "MVC pages and a JSON API over the same domain" },
      { step: "Service", detail: "Business logic, DTO mapping at every boundary" },
      { step: "Repository", detail: "Spring Data JPA → PostgreSQL" },
      { step: "Cloud", detail: "Gateway, discovery, config server, Prometheus + Grafana" },
    ],
    stats: [
      { value: "7", label: "Deployable services" },
      { value: "82", label: "Automated tests" },
    ],
    challenges: [
      { title: "Distributed transactions", body: "Reservation and payment are one transaction in the monolith and a saga across services. That is often the strongest argument for keeping a context together." },
      { title: "A gateway that trusted any token", body: "It only checked that an Authorization header existed. It now verifies the JWT signature once, at the edge, and passes the user id downstream." },
      { title: "Back-to-back bookings blocked", body: "The overlap check used <= and >=, so checking in on someone else's check-out day was rejected. Strict comparison fixed it." },
    ],
    value: [{ title: "Evidence-based architecture", body: "The monolith-vs-microservices trade-off is discussed from having built both." }],
  },
  {
    slug: "android-financewatch",
    repo: "android-financewatch",
    published: true,
    category: "engineering",
    title: "FinanceWatch",
    tagline: "Android app for market news that works offline.",
    domain: "Mobile",
    stack: ["Kotlin", "MVVM", "Room", "Retrofit", "Coroutines + Flow", "Firebase"],
    concepts: ["Offline-first", "Repository pattern", "Background sync", "DiffUtil"],
    problem:
      "Traders follow several markets and read news in transit. Connectivity is unreliable, the free API tier allows 100 requests a day, and a gold trader does not want crypto headlines.",
    questions: ["How does the app stay useful offline?", "How do you live inside a hard API quota?"],
    pipeline: [
      { step: "UI", detail: "Observes state, holds none of its own" },
      { step: "ViewModel", detail: "Survives rotation, exposes UI state" },
      { step: "Repository", detail: "Single source of truth: Room cache, network writes into it" },
    ],
    challenges: [
      { title: "Offline-first inverted", body: "The UI reads only from Room; the network's job is to write into it. Every screen behaves the same regardless of connectivity." },
      { title: "Engineering against a quota", body: "24-hour cache expiry and 30-minute background sync keep usage inside the free tier, so it costs nothing to run." },
    ],
    value: [{ title: "Works exactly when it's wanted", body: "News is read on a train; a spinner without connectivity fails at that moment." }],
  },
  {
    slug: "vue-crypto-portfolio",
    repo: "vue-crypto-portfolio",
    published: true,
    category: "engineering",
    title: "Crypto Portfolio Tracker",
    tagline: "Crypto holdings valued live in EUR, USD or RON.",
    domain: "Frontend",
    stack: ["Vue 3", "Vuex 4", "Vue Router", "Vite", "Chart.js", "CoinGecko API"],
    concepts: ["State management", "API rate limits", "FX normalisation"],
    problem:
      "Someone holding crypto on several exchanges has no single view of what they own, in their own currency.",
    questions: ["What is my whole portfolio worth now, in RON?", "Which holdings are up against what I paid?"],
    pipeline: [
      { step: "APIs", detail: "CoinGecko prices · Frankfurter FX" },
      { step: "Vuex", detail: "portfolio and user modules, cached polling" },
      { step: "Views", detail: "Holdings, coin detail, history charts" },
    ],
    challenges: [
      { title: "Rate limits shape the architecture", body: "Refetch-on-navigation exhausts the free tier in minutes; caching and interval polling are load-bearing." },
      { title: "Consistent FX", body: "A single EUR base with derived rates removes a whole class of conversion mismatch." },
    ],
    value: [{ title: "Zero running cost", body: "Free API tiers and static hosting, on purpose." }],
  },
  {
    slug: "selenium-web-scraper",
    repo: "selenium-web-scraper",
    published: true,
    category: "engineering",
    title: "Selenium Web Scraper",
    tagline: "Scraper for JavaScript-heavy directories, built with GDPR in mind.",
    domain: "Data acquisition",
    stack: ["Python 3", "Selenium 4", "webdriver-manager"],
    concepts: ["Explicit waits", "Incremental persistence", "Fault isolation", "Rate limiting", "GDPR"],
    problem:
      "Directories render members client-side behind infinite scroll, with two DOM layouts for the same fields. requests + BeautifulSoup sees an empty shell; manual collection takes a day.",
    questions: ["How do you know infinite scroll has finished?", "How do you avoid silently dropping half the records?"],
    pipeline: [
      { step: "Load", detail: "Scroll until scrollHeight stops growing (bounded)" },
      { step: "Detect", detail: "Per-page layout detection" },
      { step: "Extract", detail: "Optional fields treated as normal, not exceptional" },
      { step: "Persist", detail: "Flush per record, so interrupted runs are recoverable" },
    ],
    challenges: [
      { title: "Deciding what not to publish", body: "703 real people's contact details stay out of the repository; only 25 synthetic records demonstrate the schema." },
    ],
    value: [{ title: "Runs unattended", body: "Headless mode and fault isolation turn a one-off script into a data source." }],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const biProjects = projects.filter((p) => p.category === "bi");
export const engineeringProjects = projects.filter((p) => p.category === "engineering");
