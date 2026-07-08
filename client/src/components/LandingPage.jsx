import React, { useEffect, useRef } from "react";

export default function LandingPage({ onEnter }) {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="logo">
          Alpha Invest <span>AI</span>
        </div>
      </nav>

      <main className="hero">
        <div className="starfield-container">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
        <h1>
          Uncover the truth.
          <br />
          <span className="glow-red">Without the noise.</span>
        </h1>
        <p>
          AI-driven investment analysis. We scrape the financials, read the
          news, and evaluate the competitors. You get an auditable, rubric-based
          verdict in seconds.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={onEnter}>
            Start Free Trial
          </button>
        </div>
      </main>

      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="cards-container">
          <div
            className="glass-card scroll-fade"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <span className="step-num">Step 1</span>
            <h3>Research</h3>
            <p>
              Our autonomous agent gathers real-time financials, scrapes latest
              news, and identifies key competitors simultaneously.
            </p>
          </div>
          <div
            className="glass-card scroll-fade"
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <span className="step-num">Step 2</span>
            <h3>Synthesize</h3>
            <p>
              We process unstructured data to map out growth potential,
              valuation metrics, risk factors, and economic moats.
            </p>
          </div>
          <div
            className="glass-card scroll-fade"
            ref={(el) => (cardsRef.current[2] = el)}
          >
            <span className="step-num">Step 3</span>
            <h3>Decide</h3>
            <p>
              A deterministic scoring rubric provides a clear INVEST or PASS
              verdict, fully explained and fully auditable.
            </p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        &copy; {new Date().getFullYear()} Alpha Invest AI. All rights reserved.
      </footer>
    </div>
  );
}
