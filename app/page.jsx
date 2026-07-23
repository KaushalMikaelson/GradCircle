"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { label: "Home", target: "home" },
  { label: "The Program", target: "program" },
  { label: "Internships", target: "internships" },
  { label: "Team", target: "team" }
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

const categories = ["All Programs", "Psychology", "Finance", "Healthcare", "Law", "Brand Management"];

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

function Logo({ className = "logo-img" }) {
  return <img className={className} src="/apex-assets/Logo.webp" alt="GradCircle | ApexScholars" />;
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
              <span className="hc-brand-label">The GradCircle ApexScholars</span>
              <span className="hc-brand-dot" />
            </div>
            <h1
              className={`hc-main-title ${loaded ? "is-visible" : "scroll-reveal reveal-hero-title"}`}
              style={{ transitionDelay: "0.35s" }}
            >
              RESEARCH PROGRAM
            </h1>
            <p
              className={`hc-sub-line ${loaded ? "is-visible" : "scroll-reveal reveal-hero-sub"}`}
              style={{ transitionDelay: "0.45s" }}
            >
              Transform your curiosity into university-level research.
            </p>
            <p
              className={`hc-accent-line ${loaded ? "is-visible" : "scroll-reveal reveal-hero-accent"}`}
              style={{ transitionDelay: "0.55s" }}
            >
              Build the foundation for future innovation.
            </p>
            <div
              className={`hc-info-strip ${loaded ? "is-visible" : "scroll-reveal reveal-hero-strip"}`}
              style={{ transitionDelay: "0.65s" }}
            >
              <p className="hc-info-line">Personalized Virtual Research Program for Students (Grades 8–12)</p>
              <p className="hc-info-line hc-info-line--bold">Guided by PhD Mentors from IITs, IIMs, and IISc</p>
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
      <span className={classes.sub}>{sub}</span>
      <h2 className={classes.title}>{title}</h2>
      {desc ? <p className={classes.desc}>{desc}</p> : null}
    </div>
  );
}

function ProgramExplorer() {
  const [activeCategory, setActiveCategory] = useState("All Programs");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrograms = useMemo(() => {
    return programsData.filter((p) => {
      const matchesCategory = activeCategory === "All Programs" || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
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
    <section id="program" className="program-explorer-section">
      <div className="program-explorer-container">
        <SectionHeader
          sub="Explore Our Offerings"
          title="Featured Programs & Internships"
          desc="Filter by discipline or search across our specialized research tracks guided by PhD mentors."
          classes={{ header: "program-header", sub: "program-subheading", title: "program-title", desc: "program-description" }}
        />

        {/* Dark Filter & Search Bar - Matching Image */}
        <div className="program-filter-bar scroll-reveal reveal-header">
          <div className="program-search-box">
            <input
              type="text"
              className="program-search-input"
              placeholder="Search industries, projects, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="program-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Program Cards Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="program-cards-grid">
            {filteredPrograms.map((prog, i) => (
              <div
                className="program-card-item scroll-reveal reveal-why-card"
                key={prog.id}
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
              >
                <div className="program-card-banner">
                  <img className="program-card-img" src={prog.image} alt={prog.title} />
                </div>
                <div className="program-card-body">
                  <span className="program-card-category">{prog.category}</span>
                  <h3 className="program-card-title">{prog.title}</h3>
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
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="apex-difference-section">
      <SectionHeader
        sub="The Apex Difference"
        title={<>Why Parents & Students<br />Choose Apex Scholars</>}
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
        sub="The Apex Advantage"
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
    <section className="logistics-section">
      <div className="logistics-container">
        <SectionHeader
          sub="Investment"
          title="Program Logistics & Investment"
          classes={{ header: "logistics-header", sub: "logistics-subheading", title: "logistics-title" }}
        />
        <div className="logistics-card scroll-reveal reveal-logistics-card">
          {logistics.map(([label, value, sub], i) => (
            <div
              className="logistics-row scroll-reveal reveal-logistics-row"
              key={label}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="logistics-label-col"><span className="logistics-label">{label}</span></div>
              <div className="logistics-value-col">
                <span className={`logistics-value ${label === "PROGRAM FEE" ? "fee-value" : ""}`}>{value}</span>
                {sub ? <span className="logistics-subvalue">{sub}</span> : null}
              </div>
            </div>
          ))}
        </div>
        <div className="logistics-cta scroll-reveal reveal-logistics-cta">
          <button className="btn-primary-pill" onClick={() => scrollToId("enquire")}>Apply Now</button>
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
        title="The Pillars Behind Apex Scholars"
        classes={{ header: "founders-header", sub: "founders-subheading", title: "founders-title" }}
      />
      <div className="founders-container">
        <div className="gradcircle-info-card scroll-reveal reveal-gradcircle-info">
          <div className="gradcircle-logo-col">
            <img src="/apex-assets/GC_Logo.webp" alt="GradCircle Logo" style={{ width: 256, maxWidth: "100%", height: "auto" }} />
          </div>
          <div className="gradcircle-divider" />
          <p className="gradcircle-info-text">Founded by alumni from MIT (USA), Yale, and IIT Delhi, GradCircle is a premier educational organization dedicated to experiential learning and future-readiness.</p>
        </div>
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
    <section className="trusted-schools-section">
      <div className="schools-header scroll-reveal reveal-header">
        <span className="schools-subheading">GradCircle Programs Trusted</span>
        <h2 className="schools-title">by Students from 300+ Schools</h2>
      </div>
      <div className="marquee-wrapper scroll-reveal reveal-marquee">
        <div className="marquee-track marquee-track-left">{left.map((school, i) => <SchoolLogo key={`${school[0]}-${i}`} school={school} />)}</div>
        <div className="marquee-track marquee-track-right">{right.map((school, i) => <SchoolLogo key={`${school[0]}-${i}`} school={school} />)}</div>
      </div>
      <div className="ready-cta-subsection scroll-reveal reveal-header">
        <h2 className="ready-cta-title">Ready to start your research journey?</h2>
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
      <SectionHeader
        sub="Enquire Now"
        title="Secure Your Spot Today"
        classes={{ header: "enquire-header", sub: "enquire-subheading", title: "enquire-title" }}
      />
      <div className="enquire-steps-container">
        {[
          ["01", "Submit Your Profile", "Fill out our brief online application detailing your academic interests."],
          ["02", "Mentor Matching", "Our academic board will match you with a specialized mentor based on your proposed research area."],
          ["03", "Acceptance & Onboarding", "Receive your official acceptance, complete your registration, and begin your research journey!"]
        ].map(([num, title, desc], i) => (
          <div
            className="enquire-step-card scroll-reveal reveal-step-card"
            key={title}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <span className="step-badge">{num}</span>
            <div className="step-content">
              <h3 className="step-title">{title}</h3>
              <p className="step-desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>
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
          <div className="footer-sponsors-row">
            <div className="footer-sponsor-badge"><img className="footer-sponsor-img-1" src="/apex-assets/footer-sponsor-1.webp" alt="GradCircle ApexScholars" /></div>
            <div className="footer-sponsor-badge"><img className="footer-sponsor-img-2" src="/apex-assets/footer-sponsor-2.webp" alt="Bennett University NAAC Grade A+ Accredited University" /></div>
            <div className="footer-sponsor-badge"><img className="footer-sponsor-img-3" src="/apex-assets/footer-sponsor-3.webp" alt="The Times Group" /></div>
          </div>
        </div>
        <div className="footer-columns-grid">
          <div className="footer-col">
            <p className="contact-text">OneLeap Educonnect Pvt. Ltd.<br />Workafella Business Centre, 1,<br />Infantry Rd, opp. Commissioner<br />Office, Vasanth Nagar,<br />Bengaluru, Karnataka 560001</p>
            <a className="contact-link" href="mailto:info@mygradcircle.com">info@mygradcircle.com</a>
            <a className="contact-link" href="tel:+919066090251">+91 90660 90251</a>
          </div>
          <FooterMenu title="HOME" items={["Career Labs", "Mentors", "Campus Life", "Dates & Fees"]} />
          <FooterMenu title="PAGES" items={["Home", "AI Summer Residency", "Entrepreneurship Residency", "Career Labs Residency"]} />
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
      <ProgramExplorer />
      <ApexDifference />
      <Areas />
      <Deliverables />
      <Logistics />
      <Founders />
      <TrustedSchools />
      <Enquire />
      <Footer />
    </>
  );
}
