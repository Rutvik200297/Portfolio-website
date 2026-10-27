/* ==========================================================================
   SITE CONTENT — edit this file to update the whole website.
   --------------------------------------------------------------------------
   Every section on the page is rendered from the SITE object below.
   You never need to touch index.html or app.js to add content.

   Fields you can add to ANY experience, project or automation:
     details: ["paragraph or bullet", "another one"]   -> shown when expanded
     links:   [{ label: "GitHub", url: "https://..." }]
     image:   "assets/img/your-screenshot.png"         -> shown when expanded
                                                          (put files in assets/img/)
   Anything left out is simply not shown.
   ========================================================================== */

window.SITE = {
  person: {
    name: "Rutvik Natu",
    role: "AI & automation engineer",
    location: "Heidelberg, Germany",
    relocation: "Open to relocating within the EU",
    intro:
      "I build AI systems that do real work, automate the repetitive middle of a business, " +
      "measure whether any of it helped, and explain all of it to whoever needs to hear it: " +
      "engineers, management, field technicians or a client deciding in their own language.",
    contact: {
      email: "rutvik.natu@gmail.com",
      github: "https://github.com/Rutvik200297",
      linkedin: "", // TODO: paste your LinkedIn URL, e.g. https://www.linkedin.com/in/your-handle
      cv: "" // TODO: optional, e.g. "assets/Rutvik-CV.pdf"
    }
  },

  /* The animated workflow in the hero. Each step: [tool, what happens]. */
  heroFlow: {
    caption:
      "A simplified run of the outbound sales pipelines I build in n8n for clients in Germany and India.",
    steps: [
      ["Webhook", "New lead lands"],
      ["Clay + Apollo", "Company and contact enriched"],
      ["Claude", "Reads, scores, drafts first touch"]
    ],
    branch: [
      ["Voice agent", "Calls hot leads"],
      ["Brevo", "Nurtures the rest"]
    ],
    end: ["HubSpot", "Logged, owner notified"]
  },

  /* Before / after comparisons. "before" and "after" are relative bar lengths (0–100). */
  impact: [
    { label: "New-joiner access", before: "1–3 days", after: "Minutes", b: 100, a: 2,
      where: "Octopus Energy, 200+ employees" },
    { label: "Leaver access revoked", before: "A few hours", after: "Under 30 min", b: 100, a: 14,
      where: "Octopus Energy, with human approval" },
    { label: "First-week access tickets", before: "Baseline", after: "85% fewer", b: 100, a: 15,
      where: "Octopus Energy" },
    { label: "My code review time", before: "Baseline", after: "Roughly halved", b: 100, a: 50,
      where: "Claude Code in daily use" }
  ],

  /* The numbers ledger. */
  ledger: [
    { value: "~150", unit: "calls a day", text: "handled by the AI voice agent I built in 14 days for a 36-person sales team" },
    { value: "110", unit: "technicians", text: "scheduled across Germany at run time by the Autoscheduler I owned" },
    { value: "~10 h", unit: "a week saved", text: "by connecting the Kraken platform to Salesforce" },
    { value: "~150", unit: "requests a day", text: "flowing through the expense-claims " },
    { value: "~30%", unit: "of s", text: "now maintained by the departments I trained, not by me" },
    { value: "20", unit: "customer journeys", text: "optimised and reported weekly from a grid-communication dashboard" }
  ],

  /* ---------------- BUILD WITH AI ---------------- */
  aiBuilds: [
    {
      title: "AI voice agent for sales",
      context: "Octopus Energy Services Germany",
      summary:
        "Took inbound sales calls, answered, routed and logged them. Built in 14 days and rolled out to the whole 36-person sales team.",
      stack: ["Claude API", "Response caching", "Regression evals", "Failure logging"],
      metric: "~150 calls a day",
      details: [
        "Monitored with regression evals, failure logs and misrouted-call tracking so problems surfaced before customers noticed.",
        "Response caching kept latency and token cost down; the same pattern was reused for email analysis."
      ]
    },
    {
      title: "Agentic Grid Forecaster",
      context: "Personal flagship project",
      summary:
        "An agentic RAG dashboard that reads German grid signals and forecasts load, with a grid heatmap of Germany.",
      stack: ["Python", "RAG", "Agents", "Chart.js", "Streamlit"],
      metric: "My hero project",
      links: [{ label: "Code on GitHub", url: "https://github.com/Rutvik200297/agentic-grid-forecaster" }]
    },
    {
      title: "CS-RAG Intelligence",
      context: "Open-source project",
      summary:
        "Customer-service knowledge system: classifies incoming Gmail, answers from company knowledge, and learns from Slack conversations.",
      stack: ["LangChain", "ChromaDB", "Hybrid BM25 + vector", "Ragas", "Streamlit", "Vertex AI"],
      metric: "Deployed on Google Cloud",
      links: [{ label: "Code on GitHub", url: "https://github.com/Rutvik200297/cs-rag-intelligence" }]
    },
    {
      title: "OriginAgents",
      context: "My startup",
      summary:
        "A plug-and-play sales AI team: learns a company's industry, builds a personalised funnel and plugs into its CRM and outbound tools.",
      stack: ["n8n", "Docker Compose", "Postgres", "Redis", "Ollama", "HubSpot"],
      metric: "Started with German insurance agencies",
      links: [{ label: "Visit the site", url: "https://origin-agents.vercel.app/" }]
    },
    {
      title: "German-language voice sales system",
      context: "DACH market",
      summary:
        "Autonomous sales system that calls prospects in German. I compared voice stacks in a written evaluation before choosing.",
      stack: ["ElevenLabs v3", "Retell AI", "Famulor"],
      metric: "Stack chosen by written comparison"
    },
    {
      title: "Agentic infrastructure for an insurance broker",
      context: "DHS Versicherungsmakler, freelance",
      summary:
        "Agent workflows plus an outbound pipeline for a German insurance broker, including renewals work. The same pipeline now runs for Asset Constructions (Pune) and Entraco BKS (Nashik).",
      stack: ["n8n", "Claude API", "CRM integration"],
      metric: "One pipeline, three clients, two countries"
    },
    {
      title: "Heat-pump recommendation models",
      context: "Daulto GmbH",
      summary:
        "Forecasting models that recommend heat pumps from technical data and inventory, and an improved heat-loss calculation built on them.",
      stack: ["Python", "Forecasting models", "Inventory data"],
      metric: "Sharper heat-loss calculation"
    },
    {
      title: "Direct Cost Radar",
      context: "Portfolio project",
      summary:
        "An analytics pipeline that tracks direct costs in German electricity, built entirely on free tooling.",
      stack: ["dbt", "Airflow", "SQL"],
      metric: "Zero running cost"
    }
  ],

  /* ---------------- AUTOMATIONS ----------------
     platform must be one of the filter names below.
     flow: the steps drawn as a mini workflow (keep each step short). */
  platforms: ["n8n", "Zapier", "Salesforce", "Automation Anywhere"],
  automations: [
    {
      title: "Joiner and leaver access",
      platform: "n8n",
      where: "Octopus Energy",
      flow: ["Personio / HiBob event", "Match access profile", "Provision tools", "Human approval for leavers"],
      result: "Onboarding from days to minutes for 200+ people; leavers locked out in under 30 minutes.",
      details: ["Started on the Personio API, later moved to HiBob. API keys and access profiles managed centrally."]
    },
    {
      title: "Kraken to Salesforce sync",
      platform: "n8n",
      where: "Octopus Energy",
      flow: ["Kraken data", "Custom API endpoints", "Salesforce workflows", "Shared sync layer"],
      result: "Almost 10 hours a week saved. The sync became a product line other automations reuse.",
      details: ["Worked with the Kraken data team in the UK, reporting bugs with clear reproduction steps."]
    },
    {
      title: "Outbound sales pipeline, 35 nodes",
      platform: "n8n",
      where: "LawOps agency",
      flow: ["Apollo + Clay", "Public-data diagnostics", "Claude writes audit", "Instantly / Brevo send"],
      result: "Outreach that opens with a free diagnostic of the prospect, built from seven public-data checks."
    },
    {
      title: "Self-hosted n8n migration",
      platform: "n8n",
      where: "Daulto GmbH",
      flow: ["Zapier flows with personal data", "Docker + PostgreSQL", "Role-based access", "Audit logs"],
      result: "Personal data moved in-house under GDPR practices; complex logic now easier to maintain."
    },
    {
      title: "Expense claims",
      platform: "n8n",
      where: "Daulto GmbH",
      flow: ["Claim submitted", "Validate", "Approve", "Book"],
      result: "Around 150 requests a day handled without manual sorting."
    },
    {
      title: "Autoscheduler notifications",
      platform: "n8n",
      where: "Daulto GmbH",
      flow: ["Job scheduled", "Collect customer details", "Slack message to technician"],
      result: "110 technicians told where to go, with what they need, the moment they are booked."
    },
   
{
  title: "Smart-meter data into HubSpot",
  platform: "Zapier",
  where: "Octopus Energy",
  flow: ["Smart-meter API", "Transform", "HubSpot record"],
  result: "Sales and service see meter data on the customer record without a manual export."
},
{
  title: "HubSpot to Salesforce migration",
  platform: "Zapier",
  where: "Daulto GmbH",
  flow: ["HubSpot API", "Map fields", "Salesforce accounts"],
  result: "Around 400 accounts moved across CRMs."
},
{
  title: "Lead Aggregator",
  platform: "Zapier",
  where: "Lead operations",
  flow: ["5 lead sources", "Source-specific filtering", "Deduplicate and validate", "Create Salesforce leads"],
  result: "Automated lead supply of around 500 leads per day into Salesforce.",
  details: [
    "Collected leads from five different sources and applied separate filtering rules for each provider.",
    "Standardised, validated and routed qualified leads into Salesforce so sales teams received consistent, usable records."
  ]
},
{
  title: "Lead Reclamation Process",
  platform: "Zapier",
  where: "Lead operations",
  flow: ["Scheduled run", "Collect errored leads", "Provider-specific report", "Return recoverable leads"],
  result: "Recovered errored leads worth around EUR 700 per month.",
  details: [
    "Built a scheduled workflow that identified all failed or errored leads across providers.",
    "Generated a detailed report personalised to each lead provider’s conditions and requirements.",
    "Enabled providers to correct and resubmit recoverable leads instead of losing them permanently."
  ]
},
{
  title: "Octopus Customer Migration",
  platform: "Zapier",
  where: "Octopus Energy takeover",
  flow: ["HubSpot customers", "Kraken data matching", "Field transformation", "Salesforce import"],
  result: "Migrated existing customers to Salesforce and saved almost 60 hours of manual work.",
  details: [
    "Migrated existing customer records from HubSpot to Salesforce following the Octopus takeover.",
    "Matched and manipulated each data point to satisfy Salesforce field requirements and Kraken data structures.",
    "Reduced a highly manual migration process to a repeatable automated workflow."
  ]
},
{
  title: "Salesforce to Praxedo Work Orders",
  platform: "Zapier",
  where: "Field service operations",
  flow: ["Salesforce repair request", "Customer matching", "Praxedo API", "Work order created"],
  result: "Automatically created Praxedo work orders and saved around 30 hours per week.",
  details: [
    "Connected Salesforce and Praxedo through the Praxedo API.",
    "When a repair or maintenance job was created in Salesforce, the workflow found and matched the specific customer.",
    "Created a Praxedo work order automatically, carrying across all relevant customer and job information."
  ]
},
    {
      title: "Heat-load calculator",
      platform: "Salesforce",
      where: "Daulto GmbH",
      flow: ["Started in Zapier", "Rebuilt with Apex REST", "Native in Salesforce"],
      result: "Retired the Zapier version once internal tools could do it natively, cutting a dependency."
    },
    {
      title: "KfW subsidy agent",
      platform: "Automation Anywhere",
      where: "Daulto GmbH",
      flow: ["Customer portal", "Fill KfW application", "Bank portal", "Write status back"],
      result: "Subsidy applications for around 10 clients a day; I ran the Control Room for 8 months."
    }
  ],

  /* ---------------- TRACK ----------------
     The measurement loop. Each stage has a real example. */
  trackLoop: [
    { stage: "Ship", example: "The Autoscheduler is tested in a sandbox, then goes live for 110 technicians." },
    { stage: "Log", example: "Every failed or misrouted call from the voice agent is logged and reviewed." },
    { stage: "Evaluate", example: "Regression evals run before each change; Ragas scores the RAG answers." },
    { stage: "Report", example: "Weekly dashboard on 20 customer journeys; Power BI KPIs for management." },
    { stage: "Improve", example: "Token use cut, saving around €300 on AI licences and tooling." }
  ],

  /* ---------------- COMMUNICATE & TRANSLATE ---------------- */
  audiences: [
    { who: "Management", how: "Presented dashboards and AI pilot results to department heads." },
    { who: "Developers", how: "Led two developers as direct reports; wrote specs and integration guidelines." },
    { who: "Whole departments", how: "Ran an AI and automation training every two weeks, each person in their own sandbox." },
    { who: "Field and logistics", how: "Wrote the Autoscheduler guide and guardrails, and trained the Logistics team." },
    { who: "International teams", how: "Worked with the Kraken data team in the UK and distributed teams across tools." },
    { who: "Clients", how: "Advise Indian investors buying in Germany, walking them through the process in their own language." }
  ],

  /* Same fact, two audiences. Keep these to things you actually did. */
  translations: [
    {
      tech: "A Personio event triggers access provisioning through each tool's API, with an approval step on leavers.",
      plain: "New colleagues have their tools on day one, and people who leave lose access within half an hour."
    },
    {
      tech: "Regression evals and misrouted-call logging run against every change to the voice agent.",
      plain: "Before we change the phone assistant, we check it still sends callers to the right person."
    },
    {
      tech: "Kraken data is synced once and exposed to multiple automations, filtered by data type and access.",
      plain: "We fetch customer data once and reuse it safely, instead of every team building its own copy."
    }
  ],

  languages: [
    { name: "English", level: "C2", pct: 100 },
    { name: "German", level: "B1", pct: 55 },
    { name: "Indian languages", level: "Fluent", pct: 100 } // TODO: name them, e.g. "Hindi, Marathi"
  ],

  community: {
    title: "The Mad Hatters Club",
    text: "I started a meetup in Heidelberg, Mannheim and Walldorf where people swap books, hobbies and short talks twice a month. Two sessions so far, around 20 people."
  },

  /* ---------------- EXPERIENCE ---------------- */
  experience: [
    {
      role: "Freelance AI & Automation Engineer",
      org: "Self-employed",
      dates: "06/2024 – today",
      note: "Full-time since 06/2026",
      points: [
        "Agentic infrastructure and outbound automation for DHS Versicherungsmakler (02/2026 – 07/2026).",
        "Same pipeline adopted by Asset Constructions, Pune and Entraco BKS, Nashik.",
        "Scheduling app for a commercial laundry company in Mannheim, running since 06/2024."
      ]
    },
    {
      role: "Sales Consultant, international clients",
      org: "Heidelberger Grundwerte",
      dates: "03/2026 – today",
      points: [
        "Advise Indian expats investing in flats around Heidelberg and Mannheim, explaining the German process in their language.",
        "Hand signed deals over to operations; three investment clients handed over so far."
      ]
    },
    {
      role: "Software Solutions Manager",
      org: "Octopus Energy Services Germany",
      dates: "06/2025 – 05/2026",
      points: [
        "Led two software developers.",
        "Built the AI voice agent (~150 calls/day) and the joiner/leaver access automation for 200+ employees.",
        "Connected Kraken to Salesforce, saving almost 10 hours a week.",
        "Ran fortnightly AI trainings; about 30% of automations are now owned by the departments."
      ]
    },
    {
      role: "Automation Engineer",
      org: "Daulto GmbH (part of Octopus Energy)",
      dates: "08/2024 – 05/2025",
      points: [
        "Product owner of the Autoscheduler for 110 technicians.",
        "Ran Automation Anywhere agents for KfW subsidy applications.",
        "Moved sensitive workflows to self-hosted n8n under GDPR practices."
      ]
    },
    {
      role: "Business Analyst & Business Development",
      org: "Match Rider GmbH",
      dates: "04/2022 – 03/2023",
      points: ["Ran A/B tests; set up Google Tag Manager and Meta/LinkedIn pixel tracking."]
    },
    {
      role: "Data Analyst, later Senior Business Analyst",
      org: "HUDL, Pune",
      dates: "04/2019 – 03/2021",
      points: ["Video and audio data analysis."]
    }
  ],

  education: [
    { title: "M.A. International Management and Leadership", org: "SRH Hochschule Heidelberg", note: "Grade 2.1" },
    { title: "B.Eng. Computer Engineering", org: "Savitribai Phule Pune University" },
    { title: "AI Engineer certification", org: "Ed Donner", note: "LLM engineering, RAG, QLoRA, agents" },
    { title: "CAPM", org: "Project Management Institute" }
  ],

  stack: {
    "AI": ["Claude API", "LangChain", "RAG", "ChromaDB", "Multi-agent systems", "Ragas", "Claude Code", "Cursor"],
    "Automation": ["n8n", "Zapier", "Make", "Automation Anywhere", "Salesforce Apex", "HubSpot workflows"],
    "Data": ["Python", "SQL", "dbt", "Airflow", "BigQuery", "Snowflake", "Power BI"],
    "Platform": ["FastAPI", "Docker", "AWS Lambda / S3", "GCP Vertex AI", "GitHub Actions", "Kubernetes"],
    "Business tools": ["Salesforce", "HubSpot", "Personio", "HiBob", "Jira", "Notion", "Figma"]
  }
};
