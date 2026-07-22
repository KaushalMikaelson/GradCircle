"use client";

import { useEffect, useMemo, useState } from "react";

const navItems = [
  { label: "Home", target: "home" },
  { label: "The Program", target: "program" },
  { label: "Internships", target: "internships" },
  { label: "Team", target: "team" }
];

const whyCards = [
  ["01", "Cultivate Genuine Curiosity", "Step outside the standard curriculum to dive deeply into subjects you are truly passionate about."],
  ["02", "Build Advanced Critical Thinking", "Question assumptions, analyze complex data, and formulate evidence-based conclusions."],
  ["03", "Enhance Academic Communication", "Synthesize literature, structure formal arguments, and articulate findings clearly."],
  ["04", "Develop Academic Resilience", "Overcome intellectual roadblocks, iterate on ideas, and respond effectively to constructive feedback."],
  ["05", "Elevate College Admissions Profiles", "Create a completed research manuscript as a powerful differentiator for top-tier universities."]
];

const differenceCards = [
  ["Real Academic Rigor", "Overcome intellectual roadblocks, iterate on ideas, and respond effectively to constructive feedback.", "/apex-assets/academic-rigor.webp"],
  ["Ethical, Student-Led Work", "Adherence to global academic integrity and ethical standards.", "/apex-assets/student-led-work.webp"],
  ["Flexible 1-on-1 Mentorship", "Scheduling flexibility to accommodate busy high school routines.", "/apex-assets/1on1mentorship.webp"],
  ["Exclusive Publication Outcomes", "Opportunity to publish in the Bennett Journal.", "/apex-assets/publication-outcomes.webp"]
];

const sprintPhases = [
  ["01", "Phase 1 • Weeks 1-2", "Research Question & Direction", "Define your research topic, formulate core hypotheses, and establish project scope with your PhD mentor."],
  ["02", "Phase 2 • Weeks 3-4", "Research Design & Methodology"],
  ["03", "Phase 3 • Weeks 5-6", "Research, Analysis & Writing"],
  ["04", "Phase 4 • Weeks 7-8", "Manuscript Development & Review"],
  ["05", "Phase 5 • Weeks 9-10", "Publication Submission & Presentation"]
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

function NavBar({ scrolled, active, onMenu }) {
  return (
    <header className={`navbar-header ${scrolled ? "scrolled-fixed" : ""}`}>
      <div className="navbar-logo">
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
            {navItems.map((item) => (
              <li
                key={item.target}
                className="mobile-nav-item"
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

function Hero({ scrolled, active, openMenu, drawerOpen, closeDrawer }) {
  return (
    <section id="home" className="hero-wrapper">
      <div className="hero-content">
        <NavBar scrolled={scrolled} active={active} onMenu={openMenu} />
        <MobileDrawer open={drawerOpen} close={closeDrawer} />
        <div className={`navbar-spacer ${scrolled ? "navbar-spacer--active" : ""}`} />
        <div className="hero-card-wrapper scroll-reveal">
          <div className="hero-card-coded">
            <div className="hc-brand-pill">
              <span className="hc-brand-dot" />
              <span className="hc-brand-label">The GradCircle ApexScholars</span>
              <span className="hc-brand-dot" />
            </div>
            <h1 className="hc-main-title">RESEARCH PROGRAM</h1>
            <p className="hc-sub-line">Transform your curiosity into university-level research.</p>
            <p className="hc-accent-line">Build the foundation for future innovation.</p>
            <div className="hc-info-strip">
              <p className="hc-info-line">Personalized Virtual Research Program for Students (Grades 8–12)</p>
              <p className="hc-info-line hc-info-line--bold">Guided by PhD Mentors from IITs, IIMs, and IISc</p>
            </div>
          </div>
        </div>
        <div className="hero-cta-group scroll-reveal">
          <button className="btn-primary-pill" onClick={() => scrollToId("enquire")}>Apply Now</button>
          <button className="btn-secondary-pill">Download Brochure</button>
        </div>
        <div className="sponsors-row scroll-reveal">
          <div className="sponsor-block">
            <img className="sponsor-img" src="/apex-assets/sponsor-1.webp" alt="Knowledge Partner: Bennett University – The Times Group" />
          </div>
          <div className="sponsor-divider" />
          <div className="sponsor-block">
            <img className="sponsor-img" src="/apex-assets/sponsor-2.webp" alt="Program Co-certified by GradCircle & Bennett University" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ sub, title, desc, classes }) {
  return (
    <div className={`${classes.header} scroll-reveal`}>
      <span className={classes.sub}>{sub}</span>
      <h2 className={classes.title}>{title}</h2>
      {desc ? <p className={classes.desc}>{desc}</p> : null}
    </div>
  );
}

function WhyResearch() {
  return (
    <section id="program" className="why-research-section">
      <SectionHeader
        sub="Beyond Grades"
        title="Why Research Matters"
        desc="Independent research takes you beyond classroom learning, fostering the enquiry mindset and holistic growth."
        classes={{ header: "why-header", sub: "why-subheading", title: "why-title", desc: "why-description" }}
      />
      <div className="why-cards-container">
        <div className="why-row why-row-top">
          {whyCards.slice(0, 3).map(([num, title, text], i) => (
            <div className={`why-card scroll-reveal ${i === 0 ? "active" : ""}`} key={title}>
              <div className={`why-card-number ${i === 0 ? "active-number" : ""}`}>{num}</div>
              <h3 className="why-card-title">{title}</h3>
              <p className="why-card-text">{text}</p>
            </div>
          ))}
        </div>
        <div className="why-row why-row-bottom">
          {whyCards.slice(3).map(([num, title, text]) => (
            <div className="why-card scroll-reveal" key={title}>
              <div className="why-card-number">{num}</div>
              <h3 className="why-card-title">{title}</h3>
              <p className="why-card-text">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApexDifference() {
  const [active, setActive] = useState(0);
  return (
    <section className="apex-difference-section">
      <SectionHeader
        sub="The Apex Difference"
        title={<>Why Parents & Students<br />Choose Apex Scholars</>}
        classes={{ header: "apex-diff-header", sub: "apex-diff-subheading", title: "apex-diff-title" }}
      />
      <div className="apex-diff-list">
        {differenceCards.map(([title, text, img], i) => (
          <div
            className={`apex-diff-card scroll-reveal ${active === i ? "active" : ""}`}
            key={title}
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

function Sprint() {
  const [active, setActive] = useState(0);
  return (
    <section className="sprint-section">
      <SectionHeader
        sub="How It Works"
        title="The 10-Week Research Sprint"
        desc="Click or hover over a phase to track your progress through the sprint."
        classes={{ header: "sprint-header", sub: "sprint-subheading", title: "sprint-title", desc: "sprint-instruction" }}
      />
      <div className="sprint-timeline-container">
        <div className="sprint-timeline-line" />
        <div className="sprint-phases-list">
          {sprintPhases.map(([num, label, title, details], i) => (
            <div className="sprint-phase-row scroll-reveal" key={title} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}>
              <div className={`sprint-node ${active === i ? "active-node" : ""}`}>
                <span className="sprint-node-number">{num}</span>
              </div>
              <div className={`sprint-card ${active === i ? "active-card" : ""}`}>
                <span className="sprint-phase-label">{label}</span>
                <h3 className="sprint-phase-title">{title}</h3>
                {active === i && details ? <p className="sprint-phase-details">{details}</p> : null}
              </div>
            </div>
          ))}
        </div>
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
        {Object.entries(areas).map(([title, items]) => {
          const humanities = title.startsWith("Humanities");
          return (
            <div className="area-card scroll-reveal" key={title}>
              <div className={`area-card-banner ${humanities ? "humanities-banner" : "stem-banner"}`}>
                <h3>{title}</h3>
              </div>
              <ul className="area-list">
                {items.map((item) => (
                  <li className="area-item" key={item}>
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
          {deliverables.slice(0, 3).map(([title, text]) => <DeliverableCard key={title} title={title} text={text} />)}
        </div>
        <div className="deliverables-row deliverables-row-bottom">
          {deliverables.slice(3).map(([title, text]) => <DeliverableCard key={title} title={title} text={text} />)}
        </div>
      </div>
      <div className="certificate-subsection scroll-reveal">
        <span className="certificate-subheading">Sample Certificate</span>
        <div className="certificate-card">
          <img className="certificate-img" src="/apex-assets/certificate-sample.webp" alt="Sample Certificate of Completion - GradCircle & Bennett University" />
        </div>
      </div>
    </section>
  );
}

function DeliverableCard({ title, text }) {
  return (
    <div className="deliverable-card scroll-reveal">
      <span className="deliverable-accent-bar" />
      <h3 className="deliverable-card-title">{title}</h3>
      <p className="deliverable-card-desc">{text}</p>
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
        <div className="logistics-card scroll-reveal">
          {logistics.map(([label, value, sub]) => (
            <div className="logistics-row" key={label}>
              <div className="logistics-label-col"><span className="logistics-label">{label}</span></div>
              <div className="logistics-value-col">
                <span className={`logistics-value ${label === "PROGRAM FEE" ? "fee-value" : ""}`}>{value}</span>
                {sub ? <span className="logistics-subvalue">{sub}</span> : null}
              </div>
            </div>
          ))}
        </div>
        <div className="logistics-cta">
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
        <div className="gradcircle-info-card scroll-reveal">
          <div className="gradcircle-logo-col">
            <img src="/apex-assets/GC_Logo.webp" alt="GradCircle Logo" style={{ width: 256, maxWidth: "100%", height: "auto" }} />
          </div>
          <div className="gradcircle-divider" />
          <p className="gradcircle-info-text">Founded by alumni from MIT (USA), Yale, and IIT Delhi, GradCircle is a premier educational organization dedicated to experiential learning and future-readiness.</p>
        </div>
        <div className="founders-cards-grid">
          <div className="founder-card-item scroll-reveal"><img className="founder-card-img" src="/apex-assets/founder-prashant.webp" alt="Prashant Tibrewal – MIT Alum & Experience Career Coach" /></div>
          <div className="founder-card-item scroll-reveal"><img className="founder-card-img" src="/apex-assets/founder-aditi.webp" alt="Aditi Arya Kotak – Yale University Alum & Miss India 2015" /></div>
          <div className="founder-card-item scroll-reveal"><img className="founder-card-img" src="/apex-assets/founder-neelabh.webp" alt="Neelabh Prabhat – IIT Delhi Alum & Ex-Citybank" /></div>
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
      <div className="schools-header scroll-reveal">
        <span className="schools-subheading">GradCircle Programs Trusted</span>
        <h2 className="schools-title">by Students from 300+ Schools</h2>
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track marquee-track-left">{left.map((school, i) => <SchoolLogo key={`${school[0]}-${i}`} school={school} />)}</div>
        <div className="marquee-track marquee-track-right">{right.map((school, i) => <SchoolLogo key={`${school[0]}-${i}`} school={school} />)}</div>
      </div>
      <div className="ready-cta-subsection scroll-reveal">
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
        ].map(([num, title, desc]) => (
          <div className="enquire-step-card scroll-reveal" key={title}>
            <span className="step-badge">{num}</span>
            <div className="step-content">
              <h3 className="step-title">{title}</h3>
              <p className="step-desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="enquire-form-card scroll-reveal">
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

  useEffect(() => {
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

    const revealItems = Array.from(document.querySelectorAll(".scroll-reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));

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
      />
      <WhyResearch />
      <ApexDifference />
      <Sprint />
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
