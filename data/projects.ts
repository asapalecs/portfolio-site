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
    tagline: "Python ETL, star schema and KPI views for a mobile operator, with DAX measures for Power BI.",
    domain: "Telecom",
    stack: ["Python", "pandas", "Faker", "SQLAlchemy", "SQL Server 2022", "SQLite", "T-SQL", "Power BI", "DAX", "Docker"],
    concepts: ["Star schema", "Surrogate keys", "SCD Type 2", "Columnstore indexes", "Semi-additive measures", "Data quality gates"],
    problem:
      "A mobile operator can bill its subscribers but has a hard time explaining why ARPU or churn moved. The operational data only keeps the current state of each customer. This project generates realistic source data with Faker, loads it with a Python ETL into a star schema (SQLite by default, SQL Server in Docker), keeps customer history with SCD Type 2 and exposes the KPIs through SQL views and DAX measures.",
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
      { step: "KPI views", detail: "V_MONTHLY_KPI · V_ARPU_BY_SEGMENT · V_CHURN_ANALYSIS · V_CUSTOMER_LIFETIME_VALUE · regional and channel views" },
      { step: "Power BI", detail: "DAX measures: revenue, ARPU, churn rate, complaint rate, CLV" },
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
    tagline: "Oracle OLTP database, data warehouse and Flask app for a network of dental clinics.",
    domain: "Healthcare",
    stack: ["Oracle 23ai", "PL/SQL", "Python", "Flask", "Docker Compose"],
    concepts: ["Star schema", "Range partitioning", "Bitmap indexes", "Materialized views", "Query rewrite", "DIMENSION hierarchies"],
    problem:
      "A multi-site dental clinic can answer operational questions (“who has an appointment on Thursday?”) but not analytical ones. The project has an Oracle OLTP schema for patients, appointments, services and invoices, a Python ETL that loads it into a star schema warehouse, and a small Flask app for managing patients and appointments, running the ETL and viewing six reports.",
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
      { step: "Optimisation", detail: "Materialized view with query rewrite, bitmap indexes, DIMENSION hierarchies" },
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
    tagline: "PySpark analysis and MLlib models on USDC daily prices, with the data leakage fixed.",
    domain: "Finance",
    stack: ["Apache Spark 3", "PySpark", "Spark SQL", "Spark MLlib", "Jupyter"],
    concepts: ["Distributed processing", "Window functions", "ML pipelines", "Target leakage", "Chronological validation", "Baseline comparison"],
    problem:
      "Analysis of 1,002 days of USDC price history in PySpark: data quality checks, monthly aggregations with the DataFrame API and Spark SQL, volume categories, a linear regression for the next day close and a logistic regression for volatile days. The repo keeps the original script next to a corrected one that removes the leakage. The dataset is small, but the same code would run on a cluster.",
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
    repo: "sgbd-gestiune-cheltuieli",
    published: true,
    category: "bi",
    title: "Manufacturing Cost Control",
    tagline: "Oracle database for a manufacturer's expenses per sector, with PL/SQL procedures, functions and triggers.",
    domain: "Manufacturing",
    stack: ["Oracle", "SQL", "PL/SQL"],
    concepts: ["Relational design", "Stored procedures", "Functions", "Cursors", "Exception handling", "DML triggers"],
    problem:
      "University project for the databases course. A manufacturer knows its total spending but not how much each sector costs. The schema has ten tables for sectors, suppliers, materials, auxiliary materials, tools, services, other costs, monthly expenses, budgets and financial reports. PL/SQL procedures and functions total the monthly costs of a sector, and triggers log changes to expenses and stamp the reports.",
    questions: [
      "How much did a sector spend in a given month?",
      "What does one sector cost to run, all inputs included?",
      "What are the total expenses across all sectors?",
    ],
    pipeline: [
      { step: "Reference", detail: "Suppliers · materials · auxiliary materials · tools · services · other costs" },
      { step: "Transactional", detail: "Monthly expenses by sector, yearly budgets" },
      { step: "PL/SQL", detail: "Procedures and functions that total costs per sector, with a cursor and custom errors" },
      { step: "Reporting", detail: "Financial reports per sector, stamped by a trigger" },
    ],
    stats: [
      { value: "10", label: "Tables (3NF)" },
      { value: "4", label: "Cost categories" },
    ],
    challenges: [
      { title: "Optional categories", body: "Not every expense line has a tool or an auxiliary material. LEFT JOIN plus COALESCE makes a missing category count as zero instead of dropping the line." },
      { title: "Invalid input", body: "A month outside 1-12 raises a custom error with RAISE_APPLICATION_ERROR instead of returning an empty result." },
    ],
    value: [
      { title: "Cost per sector in one call", body: "A function returns the monthly total for a sector, so the number does not have to be put together by hand." },
      { title: "Full cost, not just materials", body: "Materials, auxiliary materials, tools and other costs are added together." },
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
    stack: ["Oracle", "PL/SQL", "DBMS_CRYPTO", "DBMS_FGA"],
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
    tagline: "Airbnb-style booking platform in Spring Boot, built once as a monolith and once as microservices.",
    domain: "Marketplace",
    stack: ["Java 17", "Spring Boot 3.2", "Spring Cloud", "Spring Security", "JPA", "PostgreSQL", "Thymeleaf", "Resilience4j", "Redis", "Prometheus", "Grafana"],
    concepts: ["Layered architecture", "Service discovery", "API gateway", "Centralised config", "JWT", "Circuit breakers", "Observability"],
    problem:
      "Hosts list properties, guests search, book, pay and leave reviews. The monolith has Thymeleaf pages and a REST API over the same services. The microservices version splits users, properties, bookings and reviews behind an API gateway with Eureka, a config server, Redis, Prometheus and Grafana. Building both was a way to see what distribution actually costs.",
    questions: ["Does this belong in one deployable unit or several?", "What does distribution cost on day one?"],
    pipeline: [
      { step: "Controller", detail: "MVC pages and a JSON API over the same domain" },
      { step: "Service", detail: "Business logic, DTO mapping at every boundary" },
      { step: "Repository", detail: "Spring Data JPA → PostgreSQL (H2 in tests)" },
      { step: "Cloud", detail: "Gateway, discovery, config server, Prometheus + Grafana" },
    ],
    stats: [
      { value: "7", label: "Deployable services" },
      { value: "82", label: "Automated tests" },
    ],
    challenges: [
      { title: "Distributed transactions", body: "In the monolith a reservation and its payment are saved in one transaction. Split across services, the same thing would need a saga, which is a good argument for keeping some parts together." },
      { title: "A gateway that trusted any token", body: "It only checked that an Authorization header existed. It now verifies the JWT signature once, at the edge, and passes the user id downstream." },
      { title: "Back-to-back bookings blocked", body: "The overlap check used <= and >=, so checking in on someone else's check-out day was rejected. Strict comparison fixed it." },
    ],
    value: [{ title: "Evidence-based architecture", body: "The monolith-vs-microservices trade-off is discussed from having built both." }],
  },
  {
    slug: "android-financewatch",
    repo: "FinanceWatch",
    published: true,
    category: "engineering",
    title: "FinanceWatch",
    tagline: "Android news app for traders that keeps working offline.",
    domain: "Mobile",
    stack: ["Kotlin", "MVVM", "Room", "Retrofit", "Coroutines + Flow", "Firebase Auth", "Firestore"],
    concepts: ["Offline-first", "Repository pattern", "Background sync", "DiffUtil"],
    problem:
      "Kotlin app that pulls market news from NewsAPI and price charts from Yahoo Finance, filtered by the markets the user follows (gold, forex, crypto). News is cached in Room so it can be read offline, a background service syncs every 30 minutes, and saved articles go to Firestore under a Firebase Auth account. The free NewsAPI tier allows 100 requests a day, so the app has to be careful with calls.",
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
    repo: "crypto-portfolio-tracker",
    published: true,
    category: "engineering",
    title: "Crypto Portfolio Tracker",
    tagline: "Vue app for tracking crypto holdings, valued in EUR, USD or RON.",
    domain: "Frontend",
    stack: ["Vue 3", "Vuex 4", "Vue Router", "Vite", "Chart.js", "Vitest", "CoinGecko API"],
    concepts: ["State management", "API rate limits", "FX normalisation"],
    problem:
      "Someone holding crypto on several exchanges has no single view of what they own, in their own currency. The user creates a local account, adds coins and quantities and sees the total value from CoinGecko prices and Frankfurter exchange rates. Each coin has a page with a 30-day price chart and news from GDELT.",
    questions: ["What is my whole portfolio worth now, in RON?", "How has a coin moved over the last 30 days?"],
    pipeline: [
      { step: "APIs", detail: "CoinGecko prices · Frankfurter FX · GDELT news" },
      { step: "Vuex", detail: "portfolio and user modules, localStorage cache" },
      { step: "Views", detail: "Holdings, coin detail, history charts" },
    ],
    challenges: [
      { title: "Rate limits shape the architecture", body: "Refetching on every navigation uses up the free tier in minutes, so prices, rates and news are cached in localStorage with an expiry." },
      { title: "Consistent FX", body: "A single EUR base with derived rates removes a whole class of conversion mismatch." },
    ],
    value: [{ title: "Zero running cost", body: "Free API tiers and static hosting, on purpose." }],
  },
  {
    slug: "selenium-web-scraper",
    repo: "selenium-web-scraper",
    published: false,
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
