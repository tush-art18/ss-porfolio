import { useState, useEffect } from 'react'
import './App.css'

/* ─────────────────────────────────────
   ICON COMPONENTS (inline SVGs)
───────────────────────────────────── */
const ArrowUpRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
)
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2-.2 4.5-1 4.5-4.5 0-1-.5-2-1-2.5.1-.5.5-1.5-.1-3 0 0-1 0-3 1.5-1.5-.4-3-.4-4.5 0C8.5 6 7.5 6 7.5 6c-.6 1.5-.2 2.5-.1 3-.5.5-1 1.5-1 2.5 0 3.5 2.5 4.3 4.5 4.5-.5.5-.5 1-.5 2V21" />
  </svg>
)
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 014 0v4M12 13v4" />
  </svg>
)
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)

/* ─────────────────────────────────────
   APP
───────────────────────────────────── */
export default function App() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [navHidden, setNavHidden]     = useState(false)
  const [lastY, setLastY]             = useState(0)
  const [heroVisible, setHeroVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /* NAV SCROLL BEHAVIOUR */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setNavScrolled(y > 50)
      setNavHidden(y > lastY && y > 200)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  /* TRIGGER HERO ANIMATION ON MOUNT */
  useEffect(() => {
    setHeroVisible(true)
  }, [])

  /* SCROLL REVEAL */
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })

    // Safety timeout to ensure React DOM is parsed before querySelector
    const timer = setTimeout(() => {
      const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale')
      targets.forEach(el => io.observe(el))
    }, 150)

    return () => {
      clearTimeout(timer)
      io.disconnect()
    }
  }, [])

  return (
    <>
      {/* ──────────────── NAV ──────────────── */}
      <div className="nav-pill-container">
        <header className={`nav-pillbar ${navScrolled ? 'scrolled' : ''} ${navHidden ? 'hidden' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
          <div className="nav-group-left desktop-only">
            <a href="#about" className="nav-link-item">About Us</a>
            <a href="#services" className="nav-link-item">Services</a>
          </div>
          <div className="nav-logo-center">
            <span className="logo-spark-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="#b4ff39" />
              </svg>
            </span>
            <span className="logo-text">Shifa</span>
          </div>
          <div className="nav-group-right desktop-only">
            <a href="#work" className="nav-link-item">Projects</a>
            <a href="#contact" className="nav-link-item">Contact</a>
          </div>
          <button 
            className="nav-hamburger mobile-only" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
        </header>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="nav-drawer-content">
          <nav className="nav-drawer-links">
            <a href="#about" className="nav-drawer-link" onClick={() => setMobileMenuOpen(false)}>About Us</a>
            <a href="#services" className="nav-drawer-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#work" className="nav-drawer-link" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#contact" className="nav-drawer-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>
          
          <div className="nav-drawer-footer">
            <span className="flt-avail-badge">
              <span className="flt-avail-dot" />
              Open to work
            </span>
            <div className="nav-drawer-socials">
              <a href="mailto:shifashikalgar111213@gmail.com" className="nav-drawer-social"><MailIcon /></a>
              <a href="https://github.com/shifa1112" target="_blank" className="nav-drawer-social"><GithubIcon /></a>
              <a href="https://www.linkedin.com/in/shifa-shikalgar-49b116349" target="_blank" className="nav-drawer-social"><LinkedinIcon /></a>
            </div>
          </div>
        </div>
      </div>

      <main>
        {/* ──────────────── HERO ──────────────── */}
        <section className="hero" id="hero">
          <div className="hero-white-card">
            {/* Spark shape behind */}
            <svg className="hero-bg-shape" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="currentColor" />
            </svg>

            <h1 className={`hero-creative-headline reveal ${heroVisible ? 'show' : ''}`} style={{ '--delay': 0 }}>
              Full-Stack Developer Creating Digital Impact
            </h1>

            <div className="hero-grid-row">
              {/* LEFT COLUMN */}
              <div className={`hero-left-col reveal ${heroVisible ? 'show' : ''}`} style={{ '--delay': 80 }}>
                <div className="hero-spark-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="#b4ff39" />
                  </svg>
                </div>
                 <p className="hero-left-text">
                  I am an aspiring full-stack developer seeking my first professional IT job. Ready to apply my skills in building robust software solutions and intuitive web applications.
                </p>
                <div className="hero-button-group">
                  <button
                    className="hero-black-btn"
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View My Work
                    <ArrowUpRight size={14} />
                  </button>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-outline-btn"
                  >
                    View Resume
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* CENTER COLUMN (Avatar) */}
              <div className={`hero-center-col reveal-scale ${heroVisible ? 'show' : ''}`} style={{ '--delay': 160 }}>
                {/* Handdrawn swirl left */}
                <svg className="hero-avatar-swirl-left" viewBox="0 0 100 100">
                  <path d="M50 50 C 40 40, 20 60, 40 80 C 60 100, 90 70, 70 40 C 50 10, 10 30, 30 70 C 40 90, 80 80, 80 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                {/* Arch frame */}
                <div className="hero-avatar-frame">
                  <img
                    className="hero-avatar-image"
                    src="/shifa.png"
                    alt="Shifa Shikalgar Portrait"
                  />
                </div>

                {/* Handdrawn swirl right */}
                <svg className="hero-avatar-swirl-right" viewBox="0 0 100 100">
                  <path d="M20 20 Q 80 10 50 50 T 80 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                {/* Overlaid pill buttons */}
                <div className="hero-avatar-overlay-pills">
                  <button
                    className="hero-overlay-btn green"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Hire Me
                  </button>
                  <button
                    className="hero-overlay-btn outline"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Let's Connect
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className={`hero-right-col reveal ${heroVisible ? 'show' : ''}`} style={{ '--delay': 240 }}>
                <div className="hero-green-stars">★★★★★</div>
                <div className="hero-right-title">BCS Graduate</div>
                <div className="hero-right-subtitle">RCS Shahu College</div>
                <div style={{ width: '40px', height: '1.5px', background: '#e4e4e7', margin: '14px 0' }} />
                <div className="hero-right-title" style={{ fontSize: '1.25rem' }}>MCA Candidate</div>
                <div className="hero-right-subtitle">Vivekanand College</div>
              </div>
            </div>
          </div>

          {/* STATS STRIP BELOW */}
          <div className="hero-stats-strip">
            <div className="container">
              <div className={`hero-stats-grid reveal ${heroVisible ? 'show' : ''}`} style={{ '--delay': 320 }}>
                {[
                  { num: '3+', label: 'Projects Shipped' },
                  { num: '9+', label: 'Technologies' },
                  { num: '12', label: 'Services Offered' },
                  { num: '1st', label: 'Class Distinction' },
                ].map((item) => (
                  <div key={item.label} className="hero-stat-item">
                    <div className="hero-stat-num">{item.num}</div>
                    <div className="hero-stat-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── MARQUEE IDENTITY STRIP ──────────────── */}
        <div className="identity-strip">
          <div className="identity-track">
            {['Full-Stack Engineer', '✦', 'MEAN Stack', '✦', 'UI/UX Design', '✦', 'Problem Solver', '✦', 'CS Graduate', '✦', 'Kolhapur, India', '✦', 'Open to Work', '✦'].concat(
              ['Full-Stack Engineer', '✦', 'MEAN Stack', '✦', 'UI/UX Design', '✦', 'Problem Solver', '✦', 'CS Graduate', '✦', 'Kolhapur, India', '✦', 'Open to Work', '✦']
            ).map((item, i) => (
              <span key={i} className={item === '✦' ? 'identity-spark' : 'identity-word'}>{item}</span>
            ))}
          </div>
        </div>

        {/* ──────────────── ABOUT — HUMAN SECTION ──────────────── */}
        <section className="about-human-section" id="about">
          <div className="container">
            <div className="about-human-grid">

              {/* Image column */}
              <div className="ah-image-col reveal">
                <div className="ah-photo-stack">
                  <div className="ah-photo-bg-card" />
                  <div className="ah-photo-frame">
                    <img src="/shifa.png" alt="Shifa Shikalgar" className="ah-photo" />
                  </div>
                  {/* Floating fact chip */}
                  <div className="ah-chip ah-chip-1">
                    <span className="ah-chip-icon">🎓</span>
                    <span>BCS Graduate &amp; MCA Candidate</span>
                  </div>
                  <div className="ah-chip ah-chip-2">
                    <span className="ah-chip-icon">📍</span>
                    <span>Kolhapur, MH</span>
                  </div>
                </div>
              </div>

              {/* Text column */}
              <div className="ah-text-col">
                <p className="ah-eyebrow reveal">— who I am</p>
                <h2 className="ah-heading reveal" style={{ '--delay': 60 }}>
                  I turn ideas into<br />
                  <em>real software</em>.
                </h2>

                <blockquote className="ah-quote reveal" style={{ '--delay': 120 }}>
                  "My goal is to secure my first professional IT job and bring value to a development team."
                </blockquote>

                <p className="ah-body reveal" style={{ '--delay': 160 }}>
                  I'm Shifa — a BCS graduate from Rajarshi Chhatrapati Shahu College, Kolhapur (completed with first class distinction) and currently pursuing my MCA at Vivekanand College, Kolhapur. Specialize in MEAN Stack development and seeking my first professional IT job to turn raw logic into exceptional production code.
                </p>

                <div className="ah-facts-row reveal" style={{ '--delay': 220 }}>
                  <div className="ah-fact">
                    <span className="ah-fact-num">3+</span>
                    <span className="ah-fact-label">Projects shipped</span>
                  </div>
                  <div className="ah-fact-divider" />
                  <div className="ah-fact">
                    <span className="ah-fact-num">9+</span>
                    <span className="ah-fact-label">Technologies used</span>
                  </div>
                  <div className="ah-fact-divider" />
                  <div className="ah-fact">
                    <span className="ah-fact-num">∞</span>
                    <span className="ah-fact-label">Problems solved</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <a href="" className="ah-cta-link reveal" style={{ '--delay': 280 }}>
                    Hire Me <ArrowUpRight size={14} />
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ah-cta-link reveal"
                    style={{ '--delay': 320 }}
                  >
                    View Resume <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── SERVICES — NUMBERED LIST ──────────────── */}
        <section className="services-numbered-section" id="services">
          <div className="container">
            <div className="sn-header">
              <p className="sn-eyebrow reveal">— what I offer</p>
              <h2 className="sn-heading reveal" style={{ '--delay': 60 }}>
                Here's how I can<br /><em>help you build</em>.
              </h2>
            </div>

            <div className="sn-list">
              {[
                { n: '01', title: 'Full-Stack Web Apps', sub: 'MongoDB · Express · Angular · Node.js end-to-end' },
                { n: '02', title: 'Responsive Interfaces', sub: 'HTML5 · CSS3 · JavaScript · Mobile-first layouts' },
                { n: '03', title: 'Design to Code', sub: 'Figma prototypes translated into pixel-perfect frontends' },
                { n: '04', title: 'Database Architecture', sub: 'Schema design, query optimization, data modeling' },
                { n: '05', title: 'UI/UX & Mockups', sub: 'Figma · Photoshop · Blender · Design systems' },
                { n: '06', title: 'Deployment & Setup', sub: 'Hosting config, domain setup, launch-ready delivery' },
              ].map((svc, i) => (
                <div key={svc.n} className="sn-item reveal" style={{ '--delay': i * 50 }}>
                  <span className="sn-num">{svc.n}</span>
                  <div className="sn-body">
                    <span className="sn-title">{svc.title}</span>
                    <span className="sn-sub">{svc.sub}</span>
                  </div>
                  <span className="sn-arrow"><ArrowUpRight size={18} /></span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── PROJECTS — EDITORIAL CARDS ──────────────── */}
        <section className="projects-editorial-section" id="work">
          <div className="container">
            <div className="pe-header">
              <p className="pe-eyebrow reveal">— selected work</p>
              <h2 className="pe-heading reveal" style={{ '--delay': 60 }}>
                Things I've built<br /><em>from scratch</em>.
              </h2>
            </div>

            <div className="pe-grid">
              {/* Card 1 — Portfolio */}
              <div className="pe-card pe-card-wide reveal-scale" style={{ '--delay': 0 }}>
                <div className="pe-card-color" style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}>
                  <span className="pe-card-num">01</span>
                  <div className="pe-card-tags-tl">
                    <span>HTML5</span><span>CSS3</span><span>JavaScript</span>
                  </div>
                </div>
                <div className="pe-card-info">
                  <h3 className="pe-card-title">Portfolio Website</h3>
                  <p className="pe-card-desc">Personal brand site built entirely from scratch — layout, identity, animations. This one.</p>
                  <span className="pe-card-link">View project <ArrowUpRight size={13} /></span>
                </div>
              </div>

              {/* Card 2 — Salon */}
              <div className="pe-card reveal-scale" style={{ '--delay': 80 }}>
                <div className="pe-card-color" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' }}>
                  <span className="pe-card-num">02</span>
                  <div className="pe-card-tags-tl">
                    <span>Java</span><span>JSP</span><span>MySQL</span>
                  </div>
                </div>
                <div className="pe-card-info">
                  <h3 className="pe-card-title">Salon Management</h3>
                  <p className="pe-card-desc">Full booking system — client tracking, appointments, real-time staff scheduling.</p>
                  <span className="pe-card-link">View project <ArrowUpRight size={13} /></span>
                </div>
              </div>

              {/* Card 3 — Employee */}
              <div className="pe-card reveal-scale" style={{ '--delay': 160 }}>
                <div className="pe-card-color" style={{ background: 'linear-gradient(135deg, #0d0d0d, #1a1a1a, #2d2d2d)' }}>
                  <span className="pe-card-num">03</span>
                  <div className="pe-card-tags-tl">
                    <span>Angular</span><span>Node.js</span><span>MongoDB</span>
                  </div>
                </div>
                <div className="pe-card-info">
                  <h3 className="pe-card-title">Employee System</h3>
                  <p className="pe-card-desc">Role-based access control, employee record management — complete MEAN stack implementation.</p>
                  <span className="pe-card-link">View project <ArrowUpRight size={13} /></span>
                </div>
              </div>

              {/* Card 4 — Design */}
              <div className="pe-card pe-card-wide reveal-scale" style={{ '--delay': 240 }}>
                <div className="pe-card-color" style={{ background: 'linear-gradient(135deg, #1a0a00, #3d1a00, #7a3b00)' }}>
                  <span className="pe-card-num">04</span>
                  <div className="pe-card-tags-tl">
                    <span>Figma</span><span>Photoshop</span><span>Blender</span>
                  </div>
                </div>
                <div className="pe-card-info">
                  <h3 className="pe-card-title">UI/UX & Web Mockups</h3>
                  <p className="pe-card-desc">High-fidelity design systems, 3D assets, and component libraries delivered for client projects.</p>
                  <span className="pe-card-link">View project <ArrowUpRight size={13} /></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── SKILLS — WORD CLOUD ──────────────── */}
        <section className="skills-cloud-section" id="skills">
          <div className="container">
            <div className="sc-inner">
              <div className="sc-left reveal">
                <p className="sc-eyebrow">— the toolkit</p>
                <h2 className="sc-heading">
                  Tech I work<br /><em>with daily</em>.
                </h2>
                <p className="sc-note">
                  I believe in knowing your tools deeply, not just knowing their names. Every item here is something I've shipped code with.
                </p>
              </div>

              <div className="sc-right reveal" style={{ '--delay': 100 }}>
                <div className="sc-group">
                  <span className="sc-group-label">Frontend</span>
                  <div className="sc-tags">
                    {['HTML5', 'CSS3', 'JavaScript', 'Angular', 'React', 'Bootstrap'].map(t => (
                      <span key={t} className="sc-tag sc-tag-frontend">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="sc-group">
                  <span className="sc-group-label">Backend</span>
                  <div className="sc-tags">
                    {['Node.js', 'Express.js', 'Java', 'JSP', 'REST APIs', 'Python'].map(t => (
                      <span key={t} className="sc-tag sc-tag-backend">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="sc-group">
                  <span className="sc-group-label">Database & Tools</span>
                  <div className="sc-tags">
                    {['MongoDB', 'MySQL', 'Postman', 'Git', 'VS Code', 'Figma', 'Photoshop', 'Blender'].map(t => (
                      <span key={t} className="sc-tag sc-tag-tools">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── CTA — PERSONAL ──────────────── */}
        <section className="cta-personal-section" id="contact">
          <div className="container">
            <div className="cta-personal-inner">
              <div className="cta-p-photo-wrap reveal">
                <img src="/shifa.png" alt="Shifa" className="cta-p-photo" />
                <div className="cta-p-badge">
                  <span className="cta-p-dot" />
                  Available now
                </div>
              </div>
              <div className="cta-p-copy reveal" style={{ '--delay': 80 }}>
                <h2 className="cta-p-heading">
                  Got a project?<br />Let's make it <em>happen</em>.
                </h2>
                <p className="cta-p-sub">
                  Whether you need a full-stack build, a design-to-code conversion, or just want to talk shop — I'm all ears.
                </p>
                <div className="cta-p-actions">
                  <a href="mailto:shifashikalgar111213@gmail.com" className="cta-p-btn-primary">
                    <MailIcon /> Write to me
                  </a>
                  <a href="#work" className="cta-p-btn-ghost">
                    See my work
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ──────────────── FOOTER ──────────────── */}
      <footer className="footer-large-type">
        {/* Top area — availability badge */}
        <div className="container">
          <div className="flt-top-row">
            <span className="flt-avail-badge">
              <span className="flt-avail-dot" />
              Open to work
            </span>
            <span className="flt-location">📍 Kolhapur, Maharashtra, India</span>
          </div>
        </div>

        {/* Giant display name */}
        <div className="flt-display-wrap">
          <div className="flt-display-name">
            <span className="flt-name-shifa">Shifa</span>
            <span className="flt-name-separator"> · </span>
            <span className="flt-name-shikalgar">Shikalgar</span>
          </div>
          <div className="flt-display-role">Full-Stack Engineer &amp; Designer</div>
          
          {/* Spotlight contacts links */}
          <div className="flt-contacts-spotlight">
            <a href="mailto:shifashikalgar111213@gmail.com" className="flt-spotlight-btn mail">
              <MailIcon /> shifashikalgar111213@gmail.com
            </a>
            <a href="https://github.com/shifa1112" target="_blank" className="flt-spotlight-btn github">
              <GithubIcon /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/shifa-shikalgar-49b116349" target="_blank" className="flt-spotlight-btn linkedin">
              <LinkedinIcon /> LinkedIn
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="flt-divider" />

        {/* Bottom bar */}
        <div className="container">
          <div className="flt-bottom-bar">
            <span className="flt-copy">© 2026 Shifa Shikalgar — All rights reserved.</span>

            <button
              className="flt-scroll-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
            >
              ↑ Top
            </button>
          </div>
        </div>
      </footer>
    </>
  )
}
