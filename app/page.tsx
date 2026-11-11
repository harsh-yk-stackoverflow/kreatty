"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Instagram,
  Layers3,
  Menu,
  Network,
  Sparkles,
  X,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FlowingMesh } from "@/components/flowing-mesh";
import { Logo } from "@/components/logo";

const services = [
  {
    number: "01",
    title: "Creator discovery",
    description:
      "Find the voices your audience already trusts. We match on values, audience and creative instinct—not just numbers.",
    icon: Network,
  },
  {
    number: "02",
    title: "Brand partnerships",
    description:
      "Build collaborations that feel natural to the creator and unforgettable to the people watching.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Campaign management",
    description:
      "From first brief to final post, we handle the details so every partnership can do its best work.",
    icon: Layers3,
  },
];

const steps = [
  {
    number: "01",
    title: "We get to know you",
    description: "Your brand, your ambition, your version of success.",
  },
  {
    number: "02",
    title: "We find your people",
    description: "A thoughtful shortlist of creators who truly fit.",
  },
  {
    number: "03",
    title: "We make it happen",
    description: "A considered campaign, managed from start to finish.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [creatorMode, setCreatorMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const selectCreator = () => {
    setCreatorMode(true);
    setMenuOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" aria-label="Kreatty home" onClick={closeMenu}>
            <Logo />
          </a>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#services" onClick={closeMenu}>What we do</a>
            <a href="#how-it-works" onClick={closeMenu}>Our approach</a>
            <button type="button" className="nav-creator-link" onClick={selectCreator}>
              For creators
            </button>
            <a className="nav-cta" href="#contact" onClick={closeMenu}>
              Let&apos;s talk <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-mesh" aria-hidden="true"><FlowingMesh dark /></div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner page-shell">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.12 }}
          >
            <motion.div className="eyebrow eyebrow-on-dark" variants={fadeUp}>
              <span className="eyebrow-dot" /> A creator-first influencer agency
            </motion.div>
            <motion.h1 variants={fadeUp}>
              Connecting brands with <span>the right creators.</span>
            </motion.h1>
            <motion.p className="hero-description" variants={fadeUp}>
              The best partnerships don&apos;t feel like marketing. We bring brands and creators
              together to make the kind of work people actually remember.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="button button-primary" href="#contact">
                Work with us <ArrowRight size={17} />
              </a>
              <button className="button button-quiet" onClick={selectCreator} type="button">
                Join our creator network <ArrowUpRight size={16} />
              </button>
            </motion.div>
            <motion.div className="hero-footnote" variants={fadeUp}>
              <span className="tiny-orbit"><span /></span>
              Good people. Good stories. Better together.
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-art-caption"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span>01 — The power of the right connection</span>
            <span className="caption-line" />
          </motion.div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about">
          <span>Scroll to explore</span><ArrowDown size={16} />
        </a>
      </section>

      <section className="intro-section section-pad" id="about">
        <div className="page-shell intro-grid">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="section-kicker">A little about us</span>
            <span className="section-index">01 / 04</span>
          </motion.div>
          <motion.div
            className="intro-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.h2 variants={fadeUp}>
              People first.
              <br />
              <span>Partnerships that mean something.</span>
            </motion.h2>
            <motion.div className="intro-lower" variants={fadeUp}>
              <p>
                Kreatty is an influencer marketing and creator partnership agency for brands
                ready to show up with intention. We pair a sharp eye for talent with a hands-on,
                thoughtful approach—so the right story finds the right people.
              </p>
              <a className="text-link" href="#services">
                Get to know us <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>
          <div className="intro-art" aria-hidden="true">
            <FlowingMesh />
            <div className="intro-orb" />
            <span className="intro-art-note">Connection is the whole point.</span>
          </div>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="page-shell">
          <motion.div
            className="section-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div className="section-kicker" variants={fadeUp}>What we do</motion.div>
            <motion.div className="services-heading-row" variants={fadeUp}>
              <h2>Considered from the<br />first hello to the final post.</h2>
              <p>Every detail, looked after. Every relationship, built to last.</p>
            </motion.div>
          </motion.div>
          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article
                  className="service-card"
                  key={service.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <div className="service-card-top">
                    <span className="service-number">{service.number}</span>
                    <span className="service-icon"><Icon size={20} strokeWidth={1.6} /></span>
                  </div>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <span className="service-card-arrow"><ArrowUpRight size={17} /></span>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="approach-section section-pad" id="how-it-works">
        <div className="page-shell approach-grid">
          <div className="approach-intro">
            <motion.div
              className="section-kicker"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              A good thing, made simple
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
            >
              The right fit
              <br /> changes everything.
            </motion.h2>
            <p className="approach-note">
              No complicated process. Just good conversations, thoughtful matching, and care
              all the way through.
            </p>
            <div className="approach-decoration" aria-hidden="true"><FlowingMesh dark /></div>
          </div>
          <div className="steps-list">
            {steps.map((step, index) => (
              <motion.div
                className="step-row"
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ delay: index * 0.08 }}
              >
                <span className="step-number">{step.number}</span>
                <div className="step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <ArrowUpRight className="step-arrow" size={18} />
              </motion.div>
            ))}
            <a className="button button-dark" href="#contact">
              Start a conversation <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="page-shell contact-layout">
          <motion.div
            className="contact-aside"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.div className="section-kicker" variants={fadeUp}>Your next good thing</motion.div>
            <motion.h2 variants={fadeUp}>
              Let&apos;s make
              <br /><span>something matter.</span>
            </motion.h2>
            <motion.p className="contact-intro" variants={fadeUp}>
              Tell us what you&apos;re thinking. Whether you&apos;re building a brand or building
              your creator career, we&apos;d love to hear from you.
            </motion.p>
            <motion.a className="contact-email" href="mailto:hello.kreatty@gmail.com" variants={fadeUp}>
              hello.kreatty@gmail.com <ArrowUpRight size={17} />
            </motion.a>
            <motion.div className="contact-aside-art" aria-hidden="true" variants={fadeUp}>
              <FlowingMesh />
              <span className="contact-art-orb" />
            </motion.div>
            <motion.div className="contact-aside-bottom" variants={fadeUp}>
              <span>Have a creator question?</span>
              <button type="button" onClick={() => setCreatorMode(true)}>We&apos;re all ears <ArrowRight size={15} /></button>
            </motion.div>
          </motion.div>
          <ContactForm creatorMode={creatorMode} onModeChange={setCreatorMode} />
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#home" aria-label="Kreatty home"><Logo light /></a>
              <p>Good people. Good stories.<br />Better together.</p>
            </div>
            <div className="footer-nav-wrap">
              <span className="footer-heading">Explore</span>
              <nav className="footer-nav" aria-label="Footer navigation">
                <a href="#about">About</a>
                <a href="#services">What we do</a>
                <a href="#how-it-works">Our approach</a>
                <a href="#contact">Get in touch</a>
              </nav>
            </div>
            <div className="footer-social">
              <span className="footer-heading">Find your people</span>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                Instagram <Instagram size={15} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={15} />
              </a>
            </div>
            <a className="footer-cta" href="mailto:hello.kreatty@gmail.com">
              Have a good feeling?
              <span>Let&apos;s talk <ArrowUpRight size={17} /></span>
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Kreatty. All good things reserved.</span>
            <span>Made for meaningful connections <span className="footer-heart">✳</span></span>
          </div>
        </div>
      </footer>
    </main>
  );
}
