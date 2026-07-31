"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { label: "Home", target: "home" },
  { label: "Program", target: "program" },
  { label: "Project Catalogue", target: "projects" },
  { label: "Pricing", target: "pricing" },
  { label: "Team", target: "team" },
  { label: "Testimonials", target: "testimonials" }
];

const programsData = [
  {
    id: "psychology",
    category: "Psychology",
    title: "Psychology & Behavioral Neuroscience",
    subtitle: "Conduct behavioral studies, cognitive analysis, mental health research, and psychological experiments.",
    image: "/pdf/Carousel - Psychology.svg",
    pdf: "/pdf/Internship Details - Psychology.pdf",
    tags: ["Cognitive Science", "Behavioral Analysis", "Experimental Design", "Neuropsychology"]
  },
  {
    id: "finance",
    category: "Finance",
    title: "Corporate Finance & Investment Banking",
    subtitle: "Analyze capital markets, financial statements, valuation methodologies, and investment portfolios.",
    image: "/pdf/Carousel - Finance.svg",
    pdf: "/pdf/Internship Details - Finance.pdf",
    tags: ["Financial Valuation", "Capital Markets", "Portfolio Analysis", "Risk Assessment"]
  },
  {
    id: "healthcare",
    category: "Healthcare",
    title: "Healthcare, Public Health & Medical Research",
    subtitle: "Investigate clinical research methodologies, epidemiology, public health policies, and medical innovation.",
    image: "/pdf/Carousel - Healthcare.svg",
    pdf: "/pdf/Internship Details - Healthcare.pdf",
    tags: ["Clinical Research", "Epidemiology", "Medical Ethics", "Healthcare Systems"]
  },
  {
    id: "law",
    category: "Law",
    title: "Corporate Law & International Policy",
    subtitle: "Examine legal frameworks, intellectual property, international human rights law, and jurisprudence.",
    image: "/pdf/Carousel - Law.svg",
    pdf: "/pdf/Internship Details - Law.pdf",
    tags: ["Constitutional Law", "IP & Corporate Law", "Legal Writing", "Case Analysis"]
  },
  {
    id: "business-strategy",
    category: "Business & Strategy",
    title: "Business Strategy & Management Consulting",
    subtitle: "Explore competitive analysis, corporate growth strategies, venture creation, and strategic planning.",
    image: "/pdf/Carousel - Business & Strategy.svg",
    pdf: "/pdf/Internship Details - Business and Strategy.pdf",
    tags: ["Corporate Strategy", "Venture Growth", "Market Research", "Financial Modeling"]
  },
  {
    id: "data-science",
    category: "Data Science & AI",
    title: "Data Science, Machine Learning & AI",
    subtitle: "Develop predictive models, perform big data analytics, and implement machine learning algorithms.",
    image: "/pdf/Carousel - Data Science & AI.svg",
    pdf: "/pdf/Internship Details - Data Science and AI.pdf",
    tags: ["Python & ML", "Neural Networks", "Data Visualization", "AI Ethics"]
  },
  {
    id: "brand-management",
    category: "Brand Management",
    title: "Brand Management & Strategic Marketing",
    subtitle: "Master brand architecture, positioning, digital campaign strategies, and consumer behavior analysis.",
    image: "/pdf/Carousel - Brand Management.svg",
    pdf: "/pdf/Internship Details - Brand Management.pdf",
    tags: ["Brand Positioning", "Digital Campaigns", "Consumer Behavior", "Market Analysis"]
  }
];

const categories = [
  "All Programs",
  "Psychology",
  "Finance",
  "Healthcare",
  "Law",
  "Brand Management",
  "Cognitive Science",
  "Financial Valuation",
  "Clinical Research",
  "AI Ethics",
  "Corporate Strategy",
  "Neuropsychology",
  "Digital Campaigns",
  "Legal Writing",
  "Portfolio Analysis",
  "Data Visualization"
];

const differenceCards = [
  ["Real Academic Rigor", "Overcome intellectual roadblocks, iterate on ideas, and respond effectively to constructive feedback.", "/apex-assets/academic-rigor.webp"],
  ["Ethical, Student-Led Work", "Adherence to global academic integrity and ethical standards.", "/apex-assets/student-led-work.webp"],
  ["Flexible 1-on-1 Mentorship", "Scheduling flexibility to accommodate busy high school routines.", "/apex-assets/1on1mentorship.webp"],
  ["Exclusive Publication Outcomes", "Opportunity to publish in the Bennett Journal.", "/apex-assets/publication-outcomes.webp"]
];

const areas = {
  STEM: ["Mathematics", "Data Science", "Biology, Chemistry & Physics", "Astrophysics", "Architecture & Design", "Computer Science & Engineering", "Neuroscience & Medicine", "Environmental Studies"],
  "Humanities & Social Sciences": ["Economics & Business", "Psychology & Sociology", "Philosophy & Gender Studies", "History, Law & International Relations", "Education, Linguistics & Classics"]
};

const deliverables = [
  ["A Complete Research Manuscript", "A polished, university-grade research paper."],
  ["Bennett Journal Publication", "The exclusive opportunity to publish your findings in the Bennett Journal."],
  ["Letter of Recommendation (LoR)", "A personalized LoR highlighting your research rigor and academic contributions."],
  ["Co-Certified Credential", "A verified certificate of completion awarded jointly by GradCircle and Bennett University."],
  ["Comprehensive Skills Report", "Detailed feedback on your critical thinking, methodology, and academic writing."]
];

const logistics = [
  ["PROGRAM FORMAT", "100% Virtual, 1-on-1 Mentorship Sessions"],
  ["DURATION", "10 Weeks (Flexible scheduling)"],
  ["ELIGIBILITY", "Ambitious High School Students (Grades 8–12)"],
  ["PROGRAM FEE", "INR 95,000 / USD $1,000", "Includes 18% GST"]
];

const schoolsLeft = [
  ["AMBE & JAI AMBE Vidhyalaya", "/school/AMBE & JAI AMBE Vidhyalaya.webp"],
  ["BVM Global", "/school/BVM Global.webp"],
  ["CMS", "/school/CMS.webp"],
  ["Chougala Education Society Hubli", "/school/Chougala Education Society Hubli.webp"],
  ["DPS Bangalore East", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FDPS%20Bangalore%20East.jpg&w=384&q=75"],
  ["DPS RK Puram", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FDPS%20RK%20Puram.jpg&w=384&q=75"],
  ["Dhirubhai Ambani Int School", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FDhirubhai%20Ambani%20Int%20School.jpg&w=384&q=75"],
  ["GAURS Int School", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FGAURS%20Int%20School.jpg&w=384&q=75"],
  ["Goldenbee Global", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FGoldenbee%20Global.jpg&w=384&q=75"],
  ["Green wood high", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FGreen%20wood%20high.jpg&w=384&q=75"],
  ["Heritage Xperiential Learning School", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FHeritage%20Xperiential%20Learning%20School.jpg&w=384&q=75"],
  ["Indus Int School Bangalore", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FIndus%20Int%20School%20Bangalore.jpg&w=384&q=75"]
];

const schoolsRight = [
  ["Jaipuria School", "/school/Jaipuria School.webp"],
  ["Jammu Sanskriti", "/school/Jammu Sanskriti.webp"],
  ["Jayshree Periwal", "/school/Jayshree Periwal.webp"],
  ["Kunskapsskolan int School", "/school/Kunskapsskolan int School.webp"],
  ["La Martiniere Girls College Lucknow", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FLa%20Martiniere%20Girls%20College%20Lucknow.jpg&w=384&q=75"],
  ["Mount Carmel School", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FMount%20Carmel%20School.jpg&w=384&q=75"],
  ["NPS Bangalore", "/school/NPS Bangalore.webp"],
  ["Oakridge Int School", "/school/Oakridge Int School.webp"],
  ["Oberoi Int School", "/school/Oberoi Int School.webp"],
  ["Orchids Int School", "/school/Orchids Int School.webp"],
  ["PM Shri", "/school/PM Shri.webp"],
  ["S", "/school/S.webp"],
  ["Shiv Nadar School", "/school/Shiv Nadar School.webp"],
  ["Shree Ram world School", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FShree%20Ram%20world%20School.jpg&w=384&q=75"],
  ["Sreenidhi International", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FSreenidhi%20International.jpg&w=384&q=75"],
  ["Sri Chaitanya", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FSri%20Chaitanya.jpg&w=384&q=75"],
  ["Suncity School", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FSuncity%20School.jpg&w=384&q=75"],
  ["TCIS", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FTCIS.jpg&w=384&q=75"],
  ["The Choice School", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FThe%20Choice%20School.jpg&w=384&q=75"],
  ["The Knowledge Habitat", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FThe%20Knowledge%20Habitat.jpg&w=384&q=75"],
  ["Velammal Vidyalaya", "https://apex-scholars.mygradcircle.com/_next/image?url=%2Fschool%2FVelammal%20Vidyalaya.jpg&w=384&q=75"]
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo({ className = "logo-img", style }) {
  return <img className={className} src="/apex-assets/GC_Logo.webp" alt="GradCircle" style={{ height: "25px", width: "auto", objectFit: "contain", ...style }} />;
}

function NavBar({ scrolled, active, onMenu, loaded }) {
  return (
    <header
      className={`navbar-header ${scrolled ? "scrolled-fixed" : ""} ${loaded ? "is-visible" : "scroll-reveal reveal-hero-header"}`}
      style={{ transitionDelay: "0.05s" }}
    >
      <div className="navbar-logo" onClick={() => scrollToId("home")}>
        <Logo />
      </div>
      <div className="navbar-right-group desktop-only">
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li
              key={item.target}
              className={`nav-item ${active === item.target ? "active" : ""}`}
              onClick={() => scrollToId(item.target)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <button className="btn-primary-pill" onClick={() => scrollToId("enquire")}>Apply Now</button>
      </div>
      <button className="navbar-hamburger mobile-only" aria-label="Open Navigation Menu" onClick={onMenu}>
        <span style={{ fontSize: 24, lineHeight: 1 }}>☰</span>
      </button>
    </header>
  );
}

function MobileDrawer({ open, close }) {
  return (
    <>
      <div className={`mobile-drawer-backdrop ${open ? "active" : ""}`} onClick={close} />
      <aside className={`mobile-drawer ${open ? "active" : ""}`}>
        <div className="mobile-drawer-header">
          <Logo />
          <button className="mobile-drawer-close" onClick={close}>✕</button>
        </div>
        <nav className="mobile-drawer-nav">
          <ul className="mobile-drawer-links">
            {navItems.map((item, idx) => (
              <li
                key={item.target}
                className="mobile-nav-item"
                style={{ animation: open ? `drawerItemSlide 0.35s ease-out ${idx * 0.06}s both` : "none" }}
                onClick={() => {
                  close();
                  scrollToId(item.target);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div className="mobile-drawer-cta">
            <button className="btn-primary-pill w-full" onClick={() => { close(); scrollToId("enquire"); }}>Apply Now</button>
          </div>
        </nav>
      </aside>
    </>
  );
}

function IncubatedBanner({ loaded }) {
  return (
    <div className={`incubated-banner-wrapper ${loaded ? "is-visible" : "scroll-reveal reveal-hero-card"}`} style={{ transitionDelay: "0.2s" }}>
      <div className="incubated-banner-card">
        <p className="incubated-header-text">
          4-week, mentor-led virtual internship with Industry-Inspired projects and practical career insights
        </p>
        <div className="incubated-yellow-box">
          <h3 className="incubated-box-title">An MIT Incubated Company</h3>
          <p className="incubated-box-sub">Founded by Alumni from:</p>
          <div className="incubated-logos-badge">
            <div className="uni-logo-item">
              <img className="uni-logo-img uni-logo-mit" src="/pdf/mit.jpg" alt="MIT Management Sloan School" />
            </div>
            <div className="uni-logo-divider" />
            <div className="uni-logo-item">
              <img className="uni-logo-img uni-logo-yale" src="/pdf/yale.png" alt="Yale University" />
              <span className="yale-text">Yale</span>
            </div>
            <div className="uni-logo-divider" />
            <div className="uni-logo-item uni-logo-item-col">
              <img className="uni-logo-img uni-logo-iit" src="/pdf/iit.jpg" alt="IIT Delhi" />
              <span className="iitd-text">IIT Delhi</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mentors-pathways-strip">
        <span className="strip-highlight">100+ Mentors</span>
        <span className="strip-sep">|</span>
        <span className="strip-highlight">20+ Career Pathways</span>
      </div>
    </div>
  );
}

function Hero({ scrolled, active, openMenu, drawerOpen, closeDrawer, loaded }) {
  return (
    <section id="home" className="hero-wrapper">
      <div className="hero-content">
        <NavBar scrolled={scrolled} active={active} onMenu={openMenu} loaded={loaded} />
        <MobileDrawer open={drawerOpen} close={closeDrawer} />
        <div className={`navbar-spacer ${scrolled ? "navbar-spacer--active" : ""}`} />
        <div
          className={`hero-card-wrapper ${loaded ? "is-visible" : "scroll-reveal reveal-hero-card"}`}
          style={{ transitionDelay: "0.15s" }}
        >
          <div className="hero-card-coded">
            <div
              className={`hc-brand-pill ${loaded ? "is-visible" : "scroll-reveal reveal-hero-pill"}`}
              style={{ transitionDelay: "0.25s" }}
            >
              <span className="hc-brand-dot" />
              <span className="hc-brand-label">Simulated Industry Internships (Grades 8–12)</span>
              <span className="hc-brand-dot" />
            </div>
            <h1
              className={`hc-main-title ${loaded ? "is-visible" : "scroll-reveal reveal-hero-title"}`}
              style={{ transitionDelay: "0.35s" }}
            >
              SIMULATED INDUSTRY INTERNSHIPS
            </h1>
            <p
              className={`hc-sub-line ${loaded ? "is-visible" : "scroll-reveal reveal-hero-sub"}`}
              style={{ transitionDelay: "0.45s" }}
            >
              Test-drive your career before college.
            </p>
            <p
              className={`hc-accent-line ${loaded ? "is-visible" : "scroll-reveal reveal-hero-accent"}`}
              style={{ transitionDelay: "0.55s" }}
            >
              Turn high school curiosity into professional proof with real-world, simulated industry projects.
            </p>
            <div
              className={`hc-info-strip ${loaded ? "is-visible" : "scroll-reveal reveal-hero-strip"}`}
              style={{ transitionDelay: "0.65s" }}
            >
              <p className="hc-info-line">Personalized Virtual Internship Program for Students (Grades 8–12)</p>
              <p className="hc-info-line hc-info-line--bold">Guided by Industry Mentors & PhD Experts from IITs, IIMs, and IISc</p>
            </div>
          </div>
        </div>
        <div
          className={`hero-cta-group ${loaded ? "is-visible" : "scroll-reveal reveal-hero-cta"}`}
          style={{ transitionDelay: "0.75s" }}
        >
          <button className="btn-primary-pill" onClick={() => scrollToId("enquire")}>Apply Now</button>
          <button className="btn-secondary-pill">Download Brochure</button>
        </div>
        <IncubatedBanner loaded={loaded} />
        <div className="sponsors-row">
          <div
            className={`sponsor-block ${loaded ? "is-visible" : "scroll-reveal reveal-sponsor"}`}
            style={{ transitionDelay: "0.85s" }}
          >
            <img className="sponsor-img" src="/apex-assets/sponsor-1.webp" alt="Knowledge Partner: Bennett University – The Times Group" />
          </div>
          <div className="sponsor-divider" />
          <div
            className={`sponsor-block ${loaded ? "is-visible" : "scroll-reveal reveal-sponsor"}`}
            style={{ transitionDelay: "0.95s" }}
          >
            <img className="sponsor-img" src="/apex-assets/sponsor-2.webp" alt="Program Co-certified by GradCircle & Bennett University" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ sub, title, desc, classes }) {
  return (
    <div className={`${classes.header} scroll-reveal reveal-header`}>
      {sub ? <span className={classes.sub}>{sub}</span> : null}
      {title ? <h2 className={classes.title}>{title}</h2> : null}
      {desc ? <p className={classes.desc}>{desc}</p> : null}
    </div>
  );
}

const overviewFeatures = [
  {
    id: "launchpad",
    text: "Launchpad for college applications and career readiness",
    stepClass: "stair-step-4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="overview-svg-icon">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        <path d="M3.8 12.3v4.2c0 2.2 3.7 4 8.2 4s8.2-1.8 8.2-4v-4.2l-8.2 4.5-8.2-4.5z" />
        <polygon points="19.5,8 21.5,8 20.5,12" />
      </svg>
    ),
  },
  {
    id: "portfolio",
    text: "Develop a professional portfolio of real-world experiences",
    stepClass: "stair-step-3",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="overview-svg-icon">
        <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm6.5 9.5l-4.5 4.5L9.5 16l1.4-1.4 1.1 1.1 3.1-3.1 1.4 1.4z" />
      </svg>
    ),
  },
  {
    id: "certificate-lor",
    text: "Certificate & Letter of Recommendation from industry mentors",
    stepClass: "stair-step-2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="overview-svg-icon">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm2 0h16v14H4V5z" />
        <rect x="5.5" y="6.5" width="8" height="1.8" rx="0.9" />
        <rect x="5.5" y="10" width="7" height="1.5" rx="0.75" />
        <rect x="5.5" y="13" width="7" height="1.5" rx="0.75" />
        <circle cx="16.5" cy="11" r="3" />
        <path d="M15 13.5L14 18l2.5-1.2L19 18l-1-4.5" />
      </svg>
    ),
  },
  {
    id: "mentor-engagement",
    text: "Live engagement with mentors from Fortune-500 companies",
    stepClass: "stair-step-1",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="overview-svg-icon">
        <circle cx="16" cy="6" r="2.8" />
        <path d="M13.8 11.2c.6-.8 1.4-1.2 2.2-1.2.8 0 1.6.4 2.2 1.2 1.2.7 1.8 1.8 1.8 3v4.8h-7.5v-4.8c0-1.2.5-2.3 1.3-3z" opacity="0.8" />
        <circle cx="8.5" cy="5.5" r="3.2" />
        <path d="M14 13c0-2.8-2.5-5-5.5-5S3 10.2 3 13v6h11v-6zm-5.5 4.5l-1.3-3.2h2.6L8.5 17.5z" />
      </svg>
    ),
  },
  {
    id: "simulated-projects",
    text: "Real-world simulated projects to build your skills profile",
    stepClass: "stair-step-0",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="overview-svg-icon">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-9h2v9zm4 0h-2v-4h2v4z" />
      </svg>
    ),
  },
];

function OverviewFeatureCard({ icon, text, id, delay = 0, stepClass = "" }) {
  return (
    <div
      className={`overview-stair-card scroll-reveal reveal-deliverable-card ${stepClass}`}
      id={id}
      style={{ transitionDelay: `${delay}s` }}
      onPointerEnter={(e) => e.currentTarget.classList.add("is-hovered")}
      onPointerLeave={(e) => e.currentTarget.classList.remove("is-hovered")}
      onTouchStart={(e) => e.currentTarget.classList.add("is-hovered")}
      onTouchEnd={(e) => e.currentTarget.classList.remove("is-hovered")}
    >
      <div className="stair-icon-circle">
        {icon}
      </div>
      <span className="stair-card-text">{text}</span>
    </div>
  );
}

function ProgramOverview() {
  return (
    <section id="program" className="overview-section">
      <div className="overview-container overview-container-stair">
        <div className="overview-stair-layout">
          
          {/* Left Column: Title & Description */}
          <div className="overview-stair-left">
            <div className="overview-header-group scroll-reveal reveal-header">
              <h2 className="overview-title-solid">Program</h2>
              <h2 className="overview-title-hollow">Overview</h2>
            </div>

            <p className="overview-left-desc scroll-reveal reveal-hero-sub">
              Students from Class 8–12 work with{" "}
              <span className="overview-bold-text">"active industry professionals"</span> on simulated industry-focused projects.
            </p>
          </div>

          {/* Right Column: Staircase Pill Cards */}
          <div className="overview-stair-right">
            {overviewFeatures.map((feature, i) => (
              <OverviewFeatureCard
                key={feature.id}
                id={feature.id}
                icon={feature.icon}
                text={feature.text}
                delay={0.08 * i}
                stepClass={feature.stepClass}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

const deliverableItems = [
  {
    text: "8-10 hours of virtual live sessions",
    icon: (
      <svg className="deliv-svg-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="22" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 24h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 20v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="14" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 10v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    text: "8-10 hours of teamwork and assignments",
    icon: (
      <svg className="deliv-svg-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18c2-3 4-4 7-4s4 2 7 2 4-1 6-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 14l-3 3 2 2 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    text: "Simulated project-based internship",
    icon: (
      <svg className="deliv-svg-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 8V6a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 14h20" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="12" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    text: "Project evaluation & comprehensive Skills Report",
    icon: (
      <svg className="deliv-svg-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 8h6M9 11h4M9 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M23.5 23.5l2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    text: "Internship Certificate signed by the mentor",
    icon: (
      <svg className="deliv-svg-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="22" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8h12M8 11h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="14" cy="21" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 24l-1 3 3-1.5L17 27l-1-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    text: "Merit-based Letter of Recommendation",
    icon: (
      <svg className="deliv-svg-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="3" width="18" height="22" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 8h10M9 11h7M9 14h10M9 17h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="19" cy="20" r="2.5" fill="currentColor" opacity="0.3" />
        <path d="M17.5 19l1.2 1.2 2.3-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function DeliverableGridItem({ icon, text }) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`deliv-grid-card ${active ? "is-active" : ""}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    >
      <div className="deliv-icon-circle">
        {icon}
      </div>
      <span className="deliv-card-text">{text}</span>
    </div>
  );
}

function ProgramDeliverables() {
  return (
    <section className="overview-section deliv-section">
      <div className="overview-container">
        <div className="overview-card scroll-reveal reveal-apex-card">
          <div className="overview-header-group scroll-reveal reveal-header">
            <h2 className="overview-title-solid">Program</h2>
            <h2 className="overview-title-hollow">Deliverables</h2>
          </div>

          <div className="deliv-grid">
            {deliverableItems.map((item, i) => (
              <DeliverableGridItem key={i} icon={item.icon} text={item.text} delay={0.06 * i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramExplorer() {
  const [activeCategory, setActiveCategory] = useState("All Programs");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef(null);
  const pillsRowRef = useRef(null);

  const checkScroll = useCallback(() => {
    if (pillsRowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = pillsRowRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const el = pillsRowRef.current;
    if (el) {
      checkScroll();
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll]);

  const categoryList = useMemo(() => categories.filter((c) => c !== "All Programs"), []);
  const duplicatedCategories = useMemo(() => [...categoryList, ...categoryList, ...categoryList], [categoryList]);

  // True Infinite Auto-Scroll Ticker (Seamless Infinite Loop, Pauses on Hover)
  useEffect(() => {
    let animId;
    const step = () => {
      if (pillsRowRef.current && !isHovered) {
        const el = pillsRowRef.current;
        if (el.scrollWidth > el.clientWidth) {
          el.scrollLeft += 0.6;
          const singleSetWidth = el.scrollWidth / 3;
          if (el.scrollLeft >= singleSetWidth * 2) {
            el.scrollLeft -= singleSetWidth;
          }
          checkScroll();
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, checkScroll]);

  const scrollPills = (direction) => {
    if (pillsRowRef.current) {
      const amount = direction === "left" ? -300 : 300;
      pillsRowRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const filteredPrograms = useMemo(() => {
    return programsData.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const cat = activeCategory.toLowerCase();
      const matchesCategory =
        activeCategory === "All Programs" ||
        p.category.toLowerCase() === cat ||
        p.category.toLowerCase().includes(cat) ||
        p.title.toLowerCase().includes(cat) ||
        p.subtitle.toLowerCase().includes(cat) ||
        p.tags.some((t) => t.toLowerCase().includes(cat));

      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="program-explorer-section">
      <div className="program-explorer-container">
        <SectionHeader
          sub="Explore Our Offerings"
          title="Internship Project Catalogue"
          desc="Filter by discipline or search across our specialized research tracks guided by PhD mentors."
          classes={{ header: "program-header", sub: "program-subheading", title: "program-title", desc: "program-description" }}
        />

        {/* Dark Filter & Search Bar - Search Box & Pills Row with Desktop Scroll Arrows */}
        <div className="program-filter-bar scroll-reveal reveal-header">
          <div className="program-top-row">
            <div className="all-programs-dropdown-wrapper" ref={dropdownRef}>
              <button
                className={`filter-pill dropdown-trigger-pill ${activeCategory === "All Programs" ? "active" : ""}`}
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <span>{activeCategory}</span>
                <span className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`}>▾</span>
              </button>
              {dropdownOpen && (
                <div className="program-dropdown-menu">
                  <div className="dropdown-menu-header">All Programs & Tracks ({categories.length - 1})</div>
                  <div className="dropdown-menu-list">
                    {categories.map((item) => (
                      <div
                        key={item}
                        className={`dropdown-item ${activeCategory === item ? "active" : ""}`}
                        onClick={() => {
                          setActiveCategory(item);
                          setDropdownOpen(false);
                        }}
                      >
                        <span className="dropdown-item-text">{item}</span>
                        {activeCategory === item && <span className="dropdown-item-check">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="program-search-box">
              <input
                type="text"
                className="program-search-input"
                placeholder="Search industries, projects, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  type="button"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div
            className="program-pills-row"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            <button
              className={`pills-scroll-arrow pills-scroll-arrow-left ${!canScrollLeft ? "disabled" : ""}`}
              onClick={() => scrollPills("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              type="button"
            >
              ‹
            </button>

            <div className={`program-filter-pills-wrapper ${canScrollLeft ? "has-fade-left" : ""} ${canScrollRight ? "has-fade-right" : ""}`}>
              <div className="program-filter-pills" ref={pillsRowRef}>
                {duplicatedCategories.map((cat, idx) => (
                  <button
                    key={`${cat}-${idx}`}
                    className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={`pills-scroll-arrow pills-scroll-arrow-right ${!canScrollRight ? "disabled" : ""}`}
              onClick={() => scrollPills("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              type="button"
            >
              ›
            </button>
          </div>
        </div>

        {/* Program Cards Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="program-cards-grid">
            {filteredPrograms.map((prog, i) => (
              <div
                className="program-card-item is-visible"
                key={prog.id}
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
              >
                <div className="program-card-banner">
                  <img className="program-card-img" src={prog.image} alt={prog.title} />
                </div>
                <div className="program-card-body">
                  <span className="program-card-category">{prog.category}</span>
                  <h3 className="program-card-title">{prog.title}</h3>

                  <div className="program-card-dates-v2">
                    <div className="dates-header">
                      <svg className="dates-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>Program Date:</span>
                    </div>
                    <div className="cohort-pills-grid">
                      <div className="cohort-chip">
                        <span className="cohort-date">09 July</span>
                        <span className="cohort-name">July Cohort</span>
                      </div>
                      <div className="cohort-chip">
                        <span className="cohort-date">15 Aug</span>
                        <span className="cohort-name">August Cohort</span>
                      </div>
                    </div>
                  </div>

                  <div className="program-card-actions">
                    <a
                      className="btn-card-outline"
                      href={prog.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Details
                    </a>
                    <button className="btn-card-primary" onClick={() => scrollToId("enquire")}>
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-programs-found">
            <h3 className="no-programs-title">No Programs Found</h3>
            <p className="no-programs-desc">No research tracks match &quot;{searchQuery}&quot;. Try resetting filters or searching with another keyword.</p>
            <button
              className="btn-primary-pill"
              onClick={() => {
                setActiveCategory("All Programs");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

const studentTestimonials = [
  {
    title: "Learning by Doing",
    quote: "It gave me hands-on experience in consulting – from research to pitching – something we don't get to do in a classroom.",
    name: "Devansh",
    school: "Overseas Family School, Singapore",
  },
  {
    title: "Future-Ready Skillset",
    quote: "I improved critical skills – research, teamwork, and professional presentations – that apply to any career.",
    name: "Diya",
    school: "Indus International School, Pune",
  },
  {
    title: "Prepared for the Real World",
    quote: "This internship gave me life skills I can use beyond school – a lot of which can be implemented in real life.",
    name: "Jaskirat",
    school: "The British Co-Ed High School, Patiala",
  },
  {
    title: "Career Exploration & Clarity",
    quote: "GradCircle helped me clear my doubts about career options. You think something isn't for you, but after trying it, you realize it is.",
    name: "Avni",
    school: "St Constantine's International School, Tanzania",
  },
  {
    title: "Real Industry Exposure",
    quote: "Corporate and international law now excite me far more than I imagined before starting this program.",
    name: "Aviraj",
    school: "Mahindra United World College, Pune",
  },
  {
    title: "Bridging Classroom & Career Choices",
    quote: "My interest in finance peaked here. It felt more real than just studying in class – school only teaches theory, but this showed me what the career actually involves.",
    name: "Alisha",
    school: "Calcutta International School, Kolkata",
  },
];

const QuoteMarkSvg = ({ flip = false }) => (
  <svg
    width="48"
    height="38"
    viewBox="0 0 48 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="st-quote-svg"
    style={flip ? { transform: "rotate(180deg)" } : undefined}
  >
    <path
      d="M0 24C0 10.5 8.5 1.8 20.5 0V8.5C14 9.8 10.5 13.8 10.5 19.5H21V38H0V24ZM27 24C27 10.5 35.5 1.8 47.5 0V8.5C41 9.8 37.5 13.8 37.5 19.5H48V38H27V24Z"
      fill="#ea580c"
    />
  </svg>
);

function StudentTestimonials() {
  return (
    <section className="student-testimonials-section">
      <div className="student-testimonials-container">
        <h2 className="student-testimonials-heading">
          Real Stories <span className="st-divider">|</span> Real Skills <span className="st-divider">|</span> Real Impact
        </h2>
        <div className="student-testimonials-list">
          {studentTestimonials.map((t, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div className={`st-card ${isLeft ? "st-card-left" : "st-card-right"}`} key={i}>
                <div className="st-card-header">
                  {isLeft && <QuoteMarkSvg />}
                  <h3 className="st-card-title">{t.title}</h3>
                  <div className="st-header-line" />
                  {!isLeft && <QuoteMarkSvg flip />}
                </div>
                <div className="st-card-body">
                  <p className="st-card-quote">{t.quote}</p>
                  <p className="st-card-attribution">
                    &ndash; {t.name}, {t.school}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ApexDifference() {
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="program" ref={sectionRef} className="apex-difference-section">
      <SectionHeader
        sub="The GradCircle Difference"
        title={<>Why Parents & Students<br />Choose GradCircle</>}
        classes={{ header: "apex-diff-header", sub: "apex-diff-subheading", title: "apex-diff-title" }}
      />
      <div className="apex-diff-list">
        {differenceCards.map(([title, text, img], i) => (
          <div
            className={`apex-diff-card ${isVisible ? "is-visible" : ""} ${active === i ? "active" : ""}`}
            key={title}
            style={{ transitionDelay: `${i * 0.15}s` }}
            onMouseEnter={() => setActive(i)}
          >
            <div className={`apex-diff-icon-badge ${active === i ? "active-badge" : ""}`}>
              <img className="apex-diff-icon" src={img} alt={title} />
            </div>
            <div className="apex-diff-content">
              <h3 className="apex-diff-card-title">{title}</h3>
              <p className="apex-diff-card-desc">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Areas() {
  return (
    <section className="research-areas-section">
      <SectionHeader
        sub="Explore Your Field"
        title="Available Areas for Research"
        desc="Customize your project based on your unique passions. Work with experts across diverse disciplines."
        classes={{ header: "areas-header", sub: "areas-subheading", title: "areas-title", desc: "areas-description" }}
      />
      <div className="areas-grid">
        {Object.entries(areas).map(([title, items], gridIdx) => {
          const humanities = title.startsWith("Humanities");
          return (
            <div
              className={`area-card scroll-reveal ${humanities ? "reveal-humanities-card" : "reveal-stem-card"}`}
              key={title}
              style={{ transitionDelay: `${gridIdx * 0.12}s` }}
            >
              <div className={`area-card-banner ${humanities ? "humanities-banner" : "stem-banner"}`}>
                <h3>{title}</h3>
              </div>
              <ul className="area-list">
                {items.map((item, i) => (
                  <li
                    className={`area-item scroll-reveal ${humanities ? "reveal-humanities-item" : "reveal-stem-item"}`}
                    key={item}
                    style={{ transitionDelay: `${(i + 1) * 0.05}s` }}
                  >
                    <span className={`bullet ${humanities ? "humanities-bullet" : "stem-bullet"}`} />
                    <span className="area-name">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Deliverables() {
  return (
    <section id="internships" className="deliverables-section">
      <SectionHeader
        sub="The GradCircle Advantage"
        title="Program Deliverables"
        desc="By the end of this 10-week journey, you will walk away with:"
        classes={{ header: "deliverables-header", sub: "deliverables-subheading", title: "deliverables-title", desc: "deliverables-description" }}
      />
      <div className="deliverables-grid-container">
        <div className="deliverables-row deliverables-row-top">
          {deliverables.slice(0, 3).map(([title, text], i) => (
            <DeliverableCard key={title} title={title} text={text} delay={i * 0.08} />
          ))}
        </div>
        <div className="deliverables-row deliverables-row-bottom">
          {deliverables.slice(3).map(([title, text], i) => (
            <DeliverableCard key={title} title={title} text={text} delay={(i + 3) * 0.08} />
          ))}
        </div>
      </div>
      <div className="certificate-subsection">
        <span className="certificate-subheading">Sample Certificate</span>
        <div className="certificate-card scroll-reveal reveal-certificate">
          <img className="certificate-img" src="/apex-assets/certificate-sample.webp" alt="Sample Certificate of Completion - GradCircle & Bennett University" />
        </div>
      </div>
    </section>
  );
}

function DeliverableCard({ title, text, delay }) {
  return (
    <div className="deliverable-card scroll-reveal reveal-deliverable-card" style={{ transitionDelay: `${delay}s` }}>
      <span className="deliverable-accent-bar reveal-deliverable-bar" />
      <div className="scroll-reveal reveal-deliverable-content">
        <h3 className="deliverable-card-title">{title}</h3>
        <p className="deliverable-card-desc">{text}</p>
      </div>
    </div>
  );
}

function Logistics() {
  return (
    <section id="pricing" className="logistics-section">
      <div className="logistics-container">
        <h2 className="logistics-title scroll-reveal reveal-header">
          Program Logistics &amp; Investment
        </h2>
        <div className="logistics-card scroll-reveal reveal-logistics-card">
          <div className="logistics-row scroll-reveal reveal-logistics-row">
            <div className="logistics-label-col">
              <span className="logistics-label">PROGRAM FORMAT</span>
            </div>
            <div className="logistics-value-col">
              <span className="logistics-value">100% Virtual, 1-on-1 Mentorship Sessions</span>
            </div>
          </div>
          <div className="logistics-row scroll-reveal reveal-logistics-row" style={{ transitionDelay: "0.08s" }}>
            <div className="logistics-label-col">
              <span className="logistics-label">DURATION</span>
            </div>
            <div className="logistics-value-col">
              <span className="logistics-value">4-5 Weekends (2 hours per weekend)</span>
            </div>
          </div>
          <div className="logistics-row scroll-reveal reveal-logistics-row" style={{ transitionDelay: "0.16s" }}>
            <div className="logistics-label-col">
              <span className="logistics-label">ELIGIBILITY</span>
            </div>
            <div className="logistics-value-col">
              <span className="logistics-value">Ambitious High School Students (Grades 8–12)</span>
            </div>
          </div>
          <div className="logistics-row scroll-reveal reveal-logistics-row" style={{ transitionDelay: "0.24s" }}>
            <div className="logistics-label-col">
              <span className="logistics-label">PROGRAM FEE</span>
            </div>
            <div className="logistics-value-col">
              <span className="logistics-value fee-value">INR 17,500 + 18% GST</span>
            </div>
          </div>
        </div>

        <div className="logistics-cta-block scroll-reveal reveal-logistics-cta">
          <h3 className="logistics-ready-title">Ready to Enrol?</h3>
          <div className="logistics-cta-buttons">
            <button className="btn-primary-pill" onClick={() => scrollToId("enquire")}>
              Apply Now
            </button>
            <button className="btn-pay-now-white" onClick={() => scrollToId("enquire")}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Founders() {
  return (
    <section id="team" className="founders-section">
      <SectionHeader
        sub="Founding Team"
        classes={{ header: "founders-header", sub: "founders-subheading", title: "founders-title" }}
      />
      <div className="founders-container">
        <div className="founders-cards-grid">
          {[
            ["/apex-assets/founder-prashant.webp", "Prashant Tibrewal – MIT Alum & Experience Career Coach"],
            ["/apex-assets/founder-aditi.webp", "Aditi Arya Kotak – Yale University Alum & Miss India 2015"],
            ["/apex-assets/founder-neelabh.webp", "Neelabh Prabhat – IIT Delhi Alum & Ex-Citybank"]
          ].map(([src, alt], i) => (
            <div
              className="founder-card-item scroll-reveal reveal-founder-card"
              key={src}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <img className="founder-card-img" src={src} alt={alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleCertificate() {
  return (
    <section className="sample-cert-section">
      <div className="sample-cert-outer-card scroll-reveal reveal-certificate">
        <span className="sample-cert-header-title">Sample Certificate</span>

        <div className="sample-cert-dots-side sample-cert-dots-left" aria-hidden="true">
          {Array.from({ length: 15 }).map((_, i) => (
            <span
              key={i}
              className={`sample-cert-dot-node ${
                (Math.floor(i / 3) + (i % 3)) % 2 === 0 ? "hollow" : "solid"
              }`}
            />
          ))}
        </div>

        <div className="sample-cert-dots-side sample-cert-dots-right" aria-hidden="true">
          {Array.from({ length: 15 }).map((_, i) => (
            <span
              key={i}
              className={`sample-cert-dot-node ${
                (Math.floor(i / 3) + (i % 3)) % 2 === 1 ? "hollow" : "solid"
              }`}
            />
          ))}
        </div>

        <div className="sample-cert-frame">
          <img
            className="certificate-img"
            src="/pdf/Sample Certificate.png"
            alt="Sample Certificate - GradCircle"
          />
        </div>

        <div className="sample-cert-blue-bar" />
      </div>
    </section>
  );
}

function SchoolLogo({ school }) {
  return (
    <div className="school-logo-card">
      <img className="school-logo-img" src={school[1]} alt={school[0]} />
    </div>
  );
}

function TrustedSchools() {
  const left = useMemo(() => [...schoolsLeft, ...schoolsLeft], []);
  const right = useMemo(() => [...schoolsRight, ...schoolsRight], []);
  return (
    <section id="testimonials" className="trusted-schools-section">
      <div className="schools-header scroll-reveal reveal-header">
        <span className="schools-subheading">GradCircle Programs Trusted</span>
        <h2 className="schools-title">by Students from 300+ Schools</h2>
      </div>
      <div className="marquee-wrapper scroll-reveal reveal-marquee">
        <div className="marquee-track marquee-track-left">{left.map((school, i) => <SchoolLogo key={`${school[0]}-${i}`} school={school} />)}</div>
        <div className="marquee-track marquee-track-right">{right.map((school, i) => <SchoolLogo key={`${school[0]}-${i}`} school={school} />)}</div>
      </div>
      <div className="ready-cta-subsection scroll-reveal reveal-header">
        <h2 className="ready-cta-title">Ready to build your first internship project?</h2>
        <p className="ready-cta-subtitle">Spots fill up quickly on a rolling basis.</p>
        <div className="ready-cta-buttons">
          <button className="btn-primary-pill" onClick={() => scrollToId("enquire")}>Apply Now</button>
          <button className="btn-navy-pill">Download Brochure</button>
        </div>
      </div>
    </section>
  );
}

function Enquire() {
  return (
    <section id="enquire" className="enquire-section">

      <div className="enquire-form-card scroll-reveal reveal-form-card">
        <FormGroup label="Full Name" />
        <div className="form-row">
          <FormGroup label="Contact" flex />
          <FormGroup label="Email" flex />
        </div>
        <div className="form-row">
          <FormGroup label="City" flex />
          <div className="form-group flex-1">
            <label className="form-label">Student&apos;s Current Grade <span className="required-star">*</span></label>
            <select className="form-select" defaultValue="">
              <option value="" disabled>Select grade</option>
              <option>Grade 8</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <FormGroup label="Name of the School" />
        <div className="form-submit-container">
          <button className="btn-primary-pill btn-submit" type="submit">Submit Enquiry</button>
        </div>
      </div>
    </section>
  );
}

function FormGroup({ label, flex = false }) {
  return (
    <div className={`form-group${flex ? " flex-1" : ""}`}>
      <label className="form-label">{label} <span className="required-star">*</span></label>
      <input className="form-input" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-branding-block">
          <div className="footer-main-logo">
            <img src="/apex-assets/GC_Logo_footer.webp" alt="GradCircle Logo" style={{ width: 384, maxWidth: "100%", height: "auto" }} />
          </div>

        </div>
        <div className="footer-columns-grid">
          <div className="footer-col">
            <p className="contact-text" style={{ marginBottom: 16 }}>OneLeap Educonnect Pvt. Ltd.<br />Workafella Business Centre, 1,<br />Infantry Rd, opp. Commissioner<br />Office, Vasanth Nagar,<br />Bengaluru, Karnataka 560001</p>
            <a className="contact-link" href="mailto:info@mygradcircle.com" style={{ display: 'block', marginBottom: 8 }}>info@mygradcircle.com</a>
            <a className="contact-link" href="tel:+919066090251" style={{ display: 'block' }}>+91 90660 90251</a>
          </div>
          <FooterMenu title="HOME" items={["Project Catalogue", "Program Details", "Pricing", "Team"]} />
          <FooterMenu title="PAGES" items={["Home", "High-school Research Projects", "Past Workshops"]} />
          <div className="footer-col">
            <h3 className="footer-col-title">SOCIAL</h3>
            <div className="footer-social-icons">
              <a className="social-box" href="https://www.linkedin.com/company/mygradcircle" aria-label="LinkedIn">
                <svg className="social-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 10v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 7v.01" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M12 19v-5.2c0-2.4 1.4-3.8 3.5-3.8 2 0 3.5 1.4 3.5 3.8V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
              <a className="social-box" href="https://www.instagram.com/mygradcircle" aria-label="Instagram">
                <svg className="social-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2" />
                  <path d="M16.5 7.5h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom-bar">
          <p className="footer-bottom-left">
            © 2025 Gradcircle. All Rights Reserved. &nbsp;|&nbsp; <a className="footer-sublink" href="https://mygradcircle.com/privacy-policy">Privacy Policy</a> &nbsp;|&nbsp; <a className="footer-sublink" href="https://mygradcircle.com/terms-and-conditions">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterMenu({ title, items }) {
  const hrefs = {
    "Career Labs": "https://tisb-bangalore.mygradcircle.com/",
    "Campus Life": "https://tisb-bangalore.mygradcircle.com/",
    "AI Summer Residency": "https://mygradcircle.com/ai-summer-residency",
    "Entrepreneurship Residency": "https://malaysia-residency.mygradcircle.com/",
    "Career Labs Residency": "https://tisb-bangalore.mygradcircle.com/"
  };
  return (
    <div className="footer-col">
      <h3 className="footer-col-title">{title}</h3>
      <ul className="footer-menu">
        {items.map((item) => (
          <li key={item}>{hrefs[item] ? <a href={hrefs[item]}>{item}</a> : item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    const onScroll = () => {
      setScrolled(window.scrollY > 90);
      const visible = navItems
        .map((item) => [item.target, document.getElementById(item.target)?.getBoundingClientRect().top ?? 9999])
        .filter(([, top]) => top < 220)
        .pop();
      if (visible) setActive(visible[0]);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const revealItems = document.querySelectorAll(".scroll-reveal");
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      // Immediately reveal items currently visible in the hero / upper fold
      if (rect.top < window.innerHeight - 30) {
        item.classList.add("is-visible");
      }
      observer.observe(item);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Hero
        scrolled={scrolled}
        active={active}
        openMenu={() => setDrawerOpen(true)}
        drawerOpen={drawerOpen}
        closeDrawer={() => setDrawerOpen(false)}
        loaded={loaded}
      />
      <ProgramOverview />
      <ProgramDeliverables />
      <ProgramExplorer />
      <StudentTestimonials />
      <Logistics />
      <Founders />
      <SampleCertificate />
      <TrustedSchools />
      <Enquire />
      <Footer />
    </>
  );
}
