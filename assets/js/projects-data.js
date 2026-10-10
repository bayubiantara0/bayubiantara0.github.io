/* Single source of truth for project content.
   - index.html renders the project cards from this list.
   - project-details.html renders one project by ?project=<slug>.
   gallery[].kind: "desktop" (browser frame), "phone" (phone frame), "poster" (full composite image)
   layout: which stage composition to use for the screenshots. */
window.PROJECTS = [
  {
    slug: "qrion-for-teacher",
    title: "Qrion For Teacher",
    short: "Mobile app for teachers: digital attendance, class management, and learning activity monitoring.",
    tags: ["Flutter", "REST API", "Mobile"],
    accent: "#1d4ed8",
    layout: "poster",
    gallery: [{ src: "assets/img/projects/qrion-teacher.jpg", label: "App overview", kind: "poster" }],
    year: "2025",
    client: "Phoenix Software (Qrion)",
    role: "Mobile and Backend Developer",
    status: "Live",
    category: "Mobile App",
    url: "qrion.id",
    about: [
      "Qrion For Teacher is part of the Qrion school digitalisation ecosystem. The mobile app supports teachers in day-to-day classroom management: GPS-based digital attendance, class schedules, student data, assignments, and monitoring of learning activities.",
      "I built the app and the integration with the backend and student accounts so that attendance, schedules, and activity data stay connected across the ecosystem. The interface was designed to be responsive and fast on low-end Android devices, and the app is maintained continuously as new requirements come in from schools."
    ],
    features: [
      { t: "Digital Attendance", d: "Check in and out with time and location validation, per class session." },
      { t: "Class Schedule", d: "Daily and weekly timetable per teacher with quick access to each class." },
      { t: "Student Data", d: "Student lists and profiles per class, synced with the school's master data." },
      { t: "Assignments", d: "Create, distribute, and track assignments from the phone." },
      { t: "Activity Monitoring", d: "Recent learning activity and reports for teachers and staff roles." },
      { t: "Role Modes", d: "Separate modes for teachers, staff, and duty officers in one app." }
    ],
    stack: [
      { name: "Flutter", icon: "assets/img/icons/flutter.svg" },
      { name: "REST API", icon: "assets/img/icons/api.svg" },
      { name: "Laravel", icon: "assets/img/icons/laravel.svg" },
      { name: "MySQL", icon: "assets/img/icons/mysql.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "certificate-manager",
    title: "Certificate Manager",
    short: "End-to-end certificate management: templates, issuing, QR verification, and sharing to LinkedIn.",
    tags: ["Laravel", "Vue.js", "MySQL"],
    accent: "#0ea5e9",
    layout: "web-solo",
    gallery: [{ src: "assets/img/projects/certificate-dashboard.png", label: "Dashboard", kind: "desktop" }],
    year: "2026",
    client: "Catalyst Consulting Indonesia",
    role: "Full Stack Developer",
    status: "In production",
    category: "Web Application",
    url: "certificate.catalyst-consulting.id",
    about: [
      "Certificate Manager handles the full lifecycle of training certificates for a consulting company: design the template, register institutions, participants, and training events, then issue certificates in bulk and publish them with a unique verification code.",
      "Every certificate carries a QR code that anyone can scan to verify it, and participants can add their certificate straight to their LinkedIn profile. The system runs on a Laravel backend with a Vue.js front end, and already manages tens of thousands of certificates with role-based access, menu management, and a full audit log."
    ],
    features: [
      { t: "Template Designer", d: "Reusable certificate templates with dynamic fields per training." },
      { t: "Bulk Issuing", d: "Issue certificates per event from the participant list in one step." },
      { t: "QR Verification", d: "Public verification page via QR scan with scan statistics." },
      { t: "Share to LinkedIn", d: "Participants add the certificate to their LinkedIn profile in one click." },
      { t: "Training Data", d: "Institutions, participants, and training events in one place." },
      { t: "RBAC and Audit Log", d: "Roles, permissions, menu management, and a full activity trail." }
    ],
    stack: [
      { name: "Laravel", icon: "assets/img/icons/laravel.svg" },
      { name: "Vue.js", icon: "assets/img/icons/js.svg" },
      { name: "MySQL", icon: "assets/img/icons/mysql.svg" },
      { name: "Tailwind", icon: "assets/img/icons/tailwind.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "courier-app",
    title: "Logistic Courier Mobile App",
    short: "Courier app for pickup and delivery: cost estimation, tracking, and delivery status updates.",
    tags: ["Flutter", "REST API", "Mobile"],
    accent: "#1e3a8a",
    layout: "phone-duo",
    gallery: [
      { src: "assets/img/projects/courier-home.jpg", label: "Login", kind: "phone" },
      { src: "assets/img/projects/courier-ui.jpg", label: "App UI", kind: "phone" }
    ],
    year: "2025",
    client: "PCP Express",
    role: "Mobile and Backend Developer",
    status: "In production",
    category: "Mobile App",
    url: "PCP Transport",
    about: [
      "A mobile logistics application that supports courier operations throughout the pickup and delivery process. Couriers can estimate shipping cost, track shipments, update delivery status, and manage shipment data from the field.",
      "I developed the backend APIs that connect the app to the core logistics system, implemented authentication and transaction data management, and optimised the app's performance for reliable use on the road. The app is maintained and extended continuously as operations evolve."
    ],
    features: [
      { t: "Cost Estimation", d: "Shipping cost calculation by service, weight, and destination." },
      { t: "Shipment Tracking", d: "Real-time shipment status for couriers and operations." },
      { t: "Delivery Updates", d: "Pickup and delivery status updates with proof of delivery." },
      { t: "Shipment Data", d: "Create and manage shipment records from the app." },
      { t: "Secure Auth", d: "Token-based authentication tied to courier accounts." },
      { t: "Backend APIs", d: "Purpose-built endpoints for fast, low-bandwidth mobile use." }
    ],
    stack: [
      { name: "Flutter", icon: "assets/img/icons/flutter.svg" },
      { name: "Laravel", icon: "assets/img/icons/laravel.svg" },
      { name: "REST API", icon: "assets/img/icons/api.svg" },
      { name: "Docker", icon: "assets/img/icons/docker.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "tokopilot-mobile",
    title: "Tokopilot Mobile POS",
    short: "Flutter point-of-sale app for small cafes and shops: catalogue, cart, checkout, and sales history.",
    tags: ["Flutter", "REST API", "Mobile"],
    accent: "#4f46e5",
    layout: "phone-trio",
    gallery: [
      { src: "assets/img/projects/tokopilot-pos.jpg", label: "Point of sale", kind: "phone" },
      { src: "assets/img/projects/tokopilot-home.jpg", label: "Home dashboard", kind: "phone" },
      { src: "assets/img/projects/tokopilot-checkout.jpg", label: "Cart and checkout", kind: "phone" },
      { src: "assets/img/projects/tokopilot-history.jpg", label: "Transaction history", kind: "phone" },
      { src: "assets/img/projects/tokopilot-backoffice.jpg", label: "Back office", kind: "phone" }
    ],
    year: "2026",
    client: "Personal product (UMKM)",
    role: "Mobile Developer",
    status: "In development",
    category: "Mobile App",
    url: "Tokopilot POS",
    about: [
      "Tokopilot Mobile POS is the cashier app for the Tokopilot POS platform, built for Indonesian micro and small businesses such as cafes and warungs. Cashiers see today's sales at a glance, browse the menu by category, build a cart with a tap, and check out in seconds.",
      "The app is written in Flutter and talks to the Tokopilot REST API (Express + TypeScript) for products, categories, customers, cash register shifts, and transactions. The owner role unlocks a back-office section for managing products, categories, customers, and opening or closing the register, all from the phone."
    ],
    features: [
      { t: "Sales Dashboard", d: "Today's revenue, transaction count, and product count on the home screen." },
      { t: "Menu Catalogue", d: "Products grouped by category with search and a barcode scan entry point." },
      { t: "Tap-to-Cart", d: "Quantity badges on each product and a floating cart bar with the running total." },
      { t: "Checkout Sheet", d: "Review items and quantities, then pay in one tap." },
      { t: "Transaction History", d: "Every invoice with its total and status, synced with the backend." },
      { t: "Role-based Back Office", d: "Owner-only tools for products, categories, customers, and cash register shifts." }
    ],
    stack: [
      { name: "Flutter", icon: "assets/img/icons/flutter.svg" },
      { name: "Node.js", icon: "assets/img/icons/node.svg" },
      { name: "MySQL", icon: "assets/img/icons/mysql.svg" },
      { name: "REST API", icon: "assets/img/icons/api.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "school-billing",
    title: "School Billing & Payment System",
    short: "Web dashboard for student billing, payment history, and QRIS digital payments.",
    tags: ["React", "REST API", "QRIS"],
    accent: "#10b981",
    layout: "web-solo",
    gallery: [{ src: "assets/img/projects/school-billing.jpg", label: "Admin dashboard", kind: "desktop" }],
    year: "2025",
    client: "Phoenix Software (Qrion)",
    role: "Frontend Developer",
    status: "Live",
    category: "Web Application",
    url: "admin.ontuition.qrion.id",
    about: [
      "A web-based school payment application that supports student billing and payment transaction management for schools in the Qrion ecosystem. Administrators get a dashboard with total billing, paid, outstanding, and overdue amounts, monthly payment trends, and the latest transactions.",
      "I designed and implemented the responsive dashboard, billing information, payment history, and reporting pages, and integrated the frontend with the payment APIs, including QRIS, while working with the backend team to keep the whole flow smooth on desktop and mobile."
    ],
    features: [
      { t: "Billing Overview", d: "Total, paid, unpaid, and overdue amounts at a glance." },
      { t: "QRIS Payments", d: "Digital payment flow integrated with the payment API." },
      { t: "Payment History", d: "Per-student transaction history with status tracking." },
      { t: "Monthly Reports", d: "Payment trends per month and payment status breakdown." },
      { t: "Student Management", d: "Student and bill master data for the school." },
      { t: "Responsive UI", d: "Usable on desktop and mobile without losing features." }
    ],
    stack: [
      { name: "React", icon: "assets/img/icons/react.svg" },
      { name: "Tailwind", icon: "assets/img/icons/tailwind.svg" },
      { name: "REST API", icon: "assets/img/icons/api.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "logistics-dashboard",
    title: "Logistics Operational Dashboard",
    short: "Operations and sales dashboard processing millions of shipment records with automated ETL.",
    tags: ["Laravel", "PostgreSQL", "ETL", "Docker"],
    accent: "#ef4444",
    layout: "web-duo",
    gallery: [
      { src: "assets/img/projects/logistics-dashboard-2.jpg", label: "Sales dashboard", kind: "desktop" },
      { src: "assets/img/projects/logistics-dashboard-1.jpg", label: "Outbound volume by region", kind: "desktop" }
    ],
    year: "2025",
    client: "PCP Express",
    role: "Backend Developer",
    status: "In production",
    category: "Web Application",
    url: "dashboard.pcpexpress.com",
    about: [
      "An integrated logistics operations dashboard that summarises and monitors operational data based on cut-off schedules: outbound volume per service and region, sales against target, weight and shipment trends, and sales per industry.",
      "The hard part was the data. I built automated ETL and scheduling workflows to keep the data synchronised, restructured tables and tuned queries so the dashboard stays responsive on millions of operational records, and collaborated on the analytical features and visualisations the management team uses for decisions."
    ],
    features: [
      { t: "Cut-off Based Summaries", d: "Operational summaries aligned with the company's cut-off schedules." },
      { t: "Automated ETL", d: "Scheduled extraction and transformation keeps data consistent." },
      { t: "Query Optimisation", d: "Tuned queries and structures for millions of records." },
      { t: "Regional Map", d: "Outbound volume by origin city on an interactive map." },
      { t: "Sales vs Target", d: "Monthly actual versus target with per-industry breakdown." },
      { t: "Role-based Access", d: "Dashboards scoped by branch, region, and user role." }
    ],
    stack: [
      { name: "Laravel", icon: "assets/img/icons/laravel.svg" },
      { name: "PostgreSQL", icon: "assets/img/icons/postgresql.svg" },
      { name: "Docker", icon: "assets/img/icons/docker.svg" },
      { name: "REST API", icon: "assets/img/icons/api.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "erp-checkpoint",
    title: "Logistics ERP Checkpoint",
    short: "Order management module of a logistics ERP: bulk orders, single-order POS, and a client order API.",
    tags: ["React", "TypeScript", "Express", "PostgreSQL"],
    accent: "#dc2626",
    layout: "web-trio",
    gallery: [
      { src: "assets/img/projects/checkpoint-pos.png", label: "POS Domestic order form", kind: "desktop" },
      { src: "assets/img/projects/checkpoint-bulk.png", label: "Bulk order dashboard", kind: "desktop" },
      { src: "assets/img/projects/checkpoint-monitoring.png", label: "Order monitoring", kind: "desktop" }
    ],
    year: "2026",
    client: "PCP Express",
    role: "Full Stack Developer",
    status: "In development",
    category: "Web Application",
    url: "erp.pcpexpress.local",
    about: [
      "Checkpoint is the new ERP for the logistics company, built from scratch with Express and React in TypeScript. The first module is order management, and it covers the three ways an order enters the system: single orders through a POS screen, bulk orders uploaded as batches, and orders pushed by clients through an API.",
      "The POS handles every order type (credit, credit tier, cash, unit, project, house mail, return) with shipper and receiver details, pricing, and AWB generation. Bulk uploads are validated row by row, flagged for correction or server error, and can be reprinted or re-posted. A monitoring dashboard tracks every staged order from pending to success or failure."
    ],
    features: [
      { t: "POS Domestic", d: "Single-order entry for all order types with pricing, pieces, weight, and charges." },
      { t: "Bulk Orders", d: "Batch upload with per-row validation, correction queue, and AWB reprint." },
      { t: "Client Order API", d: "Authenticated API for clients to push orders directly into the system." },
      { t: "Order Monitoring", d: "Staging status, pending and failed counts, search by AWB, account, or reference." },
      { t: "Correction and Repost", d: "Fix failed orders and re-post them without re-entering data." },
      { t: "Typed End to End", d: "Shared TypeScript types between the Express API and the React front end." }
    ],
    stack: [
      { name: "React", icon: "assets/img/icons/react.svg" },
      { name: "Node.js", icon: "assets/img/icons/node.svg" },
      { name: "PostgreSQL", icon: "assets/img/icons/postgresql.svg" },
      { name: "Docker", icon: "assets/img/icons/docker.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "eppd-fund-request",
    title: "E-PPD Fund Request",
    short: "Fund request workflow from submission through layered approval to disbursement, fully traceable.",
    tags: ["Laravel", "Blade", "MySQL"],
    accent: "#1e3a8a",
    layout: "web-solo",
    gallery: [{ src: "assets/img/projects/eppd-dashboard.png", label: "Tracing dashboard", kind: "desktop" }],
    year: "2025",
    client: "PCP Transport",
    role: "Full Stack Developer",
    status: "In production",
    category: "Web Application",
    url: "eppd.pcptransport.local",
    about: [
      "E-PPD digitises the company's fund request process (Pengajuan Dana). A request is created with its line items and attachments, moves through a layered approval chain where every approver can adjust the amount or send it back with notes, and ends with the disbursement being recorded against the request.",
      "Every step is logged: who approved, when, what was corrected, and the amount before and after adjustment. Finance can trace any request by PPD number, FPB number, or voucher number, and the system integrates with the accounting API, vendor work orders (SPK), and object storage for supporting documents. Built with Laravel and Blade templates."
    ],
    features: [
      { t: "Request Submission", d: "Fund requests with line items, cost breakdown, and up to three attachments." },
      { t: "Layered Approval", d: "Multi-level approval with adjustments, correction notes, and full history." },
      { t: "Disbursement Record", d: "Disbursement is recorded and linked to the originating request." },
      { t: "End-to-end Tracing", d: "Search any request by PPD, FPB, or voucher number and see its full trail." },
      { t: "Accounting Integration", d: "Posts approved requests to the accounting system through its API." },
      { t: "Roles and Backdate Control", d: "Role-based access, login activity, and controlled backdating." }
    ],
    stack: [
      { name: "Laravel", icon: "assets/img/icons/laravel.svg" },
      { name: "MySQL", icon: "assets/img/icons/mysql.svg" },
      { name: "Bootstrap", icon: "assets/img/icons/bootstrap.svg" },
      { name: "Docker", icon: "assets/img/icons/docker.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "local-traveling",
    title: "Local Traveling System",
    short: "Business travel request and budgeting system with digital signatures and layered approval.",
    tags: ["Laravel", "MySQL", "Bootstrap"],
    accent: "#3b82f6",
    layout: "web-duo",
    gallery: [
      { src: "assets/img/projects/lts-dashboard.jpg", label: "Dashboard", kind: "desktop" },
      { src: "assets/img/projects/lts-form.jpg", label: "Request form", kind: "desktop" }
    ],
    year: "2023",
    client: "PT Uni-Charm Indonesia Tbk",
    role: "Full Stack Developer",
    status: "In production",
    category: "Web Application",
    url: "lts.unicharm.local",
    about: [
      "A web-based system that facilitates employee business travel requests across Indonesia. It replaces the manual, paper-based submission process with a digital flow: employees submit requests online, approvers sign digitally, and budget usage is tracked per period.",
      "By incorporating digital signatures the system supports the company's go-green initiative by cutting paper consumption, while the dashboard gives management a live view of total trips, budget usage, most visited destinations, and pending approvals."
    ],
    features: [
      { t: "Travel Requests", d: "Structured request form with destination, dates, and estimated cost." },
      { t: "Digital Signature", d: "Approvers sign requests digitally, no printing required." },
      { t: "Layered Approval", d: "Multi-level approval chain with full status history." },
      { t: "Budget Tracking", d: "Budget usage and remaining allocation per period." },
      { t: "Actual vs Plan", d: "Record actual travel cost and compare with the approved estimate." },
      { t: "Request History", d: "Searchable archive of every request and its approval trail." }
    ],
    stack: [
      { name: "Laravel", icon: "assets/img/icons/laravel.svg" },
      { name: "MySQL", icon: "assets/img/icons/mysql.svg" },
      { name: "Bootstrap", icon: "assets/img/icons/bootstrap.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "nestify",
    title: "Nestify",
    short: "All-in-one hospitality app for villas and homestays: booking, facility rental, retail POS, and QRIS payments.",
    tags: ["Flutter", "NestJS", "PostgreSQL", "QRIS"],
    accent: "#0f9d8a",
    layout: "phone-trio",
    gallery: [
      { src: "assets/img/projects/nestify-home.jpg", label: "Guest home", kind: "phone" },
      { src: "assets/img/projects/nestify-dashboard.jpg", label: "Owner dashboard", kind: "phone" },
      { src: "assets/img/projects/nestify-room.jpg", label: "Room detail", kind: "phone" }
    ],
    year: "2026",
    client: "Personal product",
    role: "Founder and Full Stack Engineer",
    status: "In development",
    category: "Mobile App",
    url: "Nestify",
    about: [
      "Nestify is an integrated hospitality platform I am building for small Indonesian properties such as villas, homestays, kost, and guest houses. It combines a booking engine, a rental marketplace for facilities like motorbikes and pool access, a small retail store for daily needs, and field operations in one mobile app.",
      "Guests browse rooms, book, rent, and buy with manual QRIS payment and upload proof, while the owner verifies payments, tracks occupancy, check-ins, housekeeping, and daily revenue from a PIN-protected owner mode. The backend is a NestJS REST API on PostgreSQL, and the app is built with Flutter using a feature-first Riverpod architecture."
    ],
    features: [
      { t: "Booking Engine", d: "Room catalogue, availability calendar, and checkout with daily to yearly rates." },
      { t: "Facility Rental", d: "Rent motorbikes, bikes, and other assets with per-day pricing." },
      { t: "Retail Store", d: "Snacks, water, and essentials sold in-app with a simple cart." },
      { t: "QRIS Payments", d: "Manual QRIS with proof upload and owner-side verification." },
      { t: "Owner Dashboard", d: "Daily revenue, occupancy, check-in and check-out, and low stock alerts." },
      { t: "Role Switcher", d: "Guest and staff modes in one app, unlocked with a PIN." }
    ],
    stack: [
      { name: "Flutter", icon: "assets/img/icons/flutter.svg" },
      { name: "NestJS", icon: "assets/img/icons/node.svg" },
      { name: "PostgreSQL", icon: "assets/img/icons/postgresql.svg" },
      { name: "Docker", icon: "assets/img/icons/docker.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "recruitment-system",
    title: "Recruitment System",
    short: "Recruitment platform for posting vacancies, online applications, and candidate tracking.",
    tags: ["CodeIgniter 4", "PHP", "MySQL", "Bootstrap"],
    accent: "#f59e0b",
    layout: "web-duo",
    gallery: [
      { src: "assets/img/projects/recruitment-home.jpg", label: "Home", kind: "desktop" },
      { src: "assets/img/projects/recruitment-vacancy.jpg", label: "Job vacancy", kind: "desktop" },
      { src: "assets/img/projects/recruitment-about.jpg", label: "About", kind: "desktop" }
    ],
    year: "2023",
    client: "PT Uni-Charm Indonesia Tbk",
    role: "Full Stack Developer",
    status: "Live",
    category: "Web Application",
    url: "ucirecruitment.unicharm.co.id",
    live: "https://ucirecruitment.unicharm.co.id/",
    about: [
      "A web-based recruitment platform built to streamline and simplify the company's hiring process. Recruiters post and manage job vacancies, candidates apply online, and the whole workflow, from job listings to application tracking and automated notifications, lives in one place.",
      "Built with PHP and CodeIgniter 4, the platform is lightweight, efficient, and easy for the HR team to maintain. It has been live since 2023 as the company's public career site."
    ],
    features: [
      { t: "Vacancy Management", d: "Recruiters publish, edit, and close vacancies per department." },
      { t: "Online Application", d: "Candidates apply with their profile and CV directly on the site." },
      { t: "Application Tracking", d: "Follow each candidate through the recruitment stages." },
      { t: "Automated Notifications", d: "Email notifications for new applications and status changes." },
      { t: "Talent Pool", d: "Keep interested candidates on file for future openings." },
      { t: "Company Profile", d: "About, MTI programme, and contact pages in one consistent design." }
    ],
    stack: [
      { name: "CodeIgniter", icon: "assets/img/icons/codeigniter.svg" },
      { name: "MySQL", icon: "assets/img/icons/mysql.svg" },
      { name: "Bootstrap", icon: "assets/img/icons/bootstrap.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  },
  {
    slug: "employee-gallery",
    title: "Employee Gallery",
    short: "Organisation directory showing employee profiles from directors to staff.",
    tags: ["Laravel", "MySQL", "Bootstrap"],
    accent: "#2563eb",
    layout: "web-solo",
    gallery: [{ src: "assets/img/projects/employee-gallery.png", label: "Board of Director", kind: "desktop" }],
    year: "2024",
    client: "PT Uni-Charm Indonesia Tbk",
    role: "Full Stack Developer",
    status: "In production",
    category: "Internal Tool",
    url: "gallery.unicharm.local",
    about: [
      "An internal directory that presents the organisation structure visually, from the board of directors down to each division. Every profile shows the employee ID, job title, location, and length of service.",
      "It replaced a static spreadsheet with a searchable, always-up-to-date view that HR maintains from a simple admin panel, integrated with the existing HR Information System database."
    ],
    features: [
      { t: "Division Browsing", d: "Navigate the structure by division and sub-division from the sidebar." },
      { t: "Employee Profiles", d: "Photo, ID, job title, location, and tenure on every card." },
      { t: "HRIS Integration", d: "Reads master data from the HR Information System to stay in sync." },
      { t: "Admin Panel", d: "HR can update photos and placements without touching the database." },
      { t: "Search and Filter", d: "Find a person quickly by name, division, or location." },
      { t: "Access Control", d: "Public view for employees, login required for editing." }
    ],
    stack: [
      { name: "Laravel", icon: "assets/img/icons/laravel.svg" },
      { name: "MySQL", icon: "assets/img/icons/mysql.svg" },
      { name: "Bootstrap", icon: "assets/img/icons/bootstrap.svg" },
      { name: "Git", icon: "assets/img/icons/git.svg" }
    ]
  }
];

/* Build the layered "stage" composition for a project's screenshots. */
window.renderStage = function (p, opts) {
  opts = opts || {};
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var frames = p.gallery.slice(0, 3).map(function (g, i) {
    var inner = "";
    if (g.kind === "desktop") {
      inner = '<span class="frame__bar" aria-hidden="true"><i></i><i></i><i></i><b>' + esc(p.url || "") + "</b></span>";
    } else if (g.kind === "phone") {
      inner = '<span class="frame__notch" aria-hidden="true"></span>';
    }
    var lb = opts.lightbox ? ' data-lightbox="' + esc(g.src) + '" data-lightbox-alt="' + esc(p.title + " — " + g.label) + '"' : "";
    return (
      '<figure class="frame frame--' + g.kind + " frame-" + (i + 1) + '"' + lb + ">" + inner +
      '<img src="' + esc(g.src) + '" alt="' + esc(p.title + " — " + g.label) + '" loading="' + (opts.eager ? "eager" : "lazy") + '" />' +
      "</figure>"
    );
  }).join("");
  return (
    '<div class="stage stage--' + esc(p.layout) + (opts.large ? " stage--lg" : "") + '" style="--accent:' + esc(p.accent) + '">' +
    '<span class="stage__glow" aria-hidden="true"></span>' +
    '<span class="stage__band" aria-hidden="true"></span>' +
    '<span class="stage__dots" aria-hidden="true"></span>' +
    frames +
    "</div>"
  );
};
